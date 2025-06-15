package com.example.gestion_des_epi.gestion_epi.service;


import com.example.gestion_des_epi.gestion_epi.dto.BesoinRequestDto;
import com.example.gestion_des_epi.gestion_epi.enume.StatutValidation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;

import jakarta.transaction.Transactional;

import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.model.*;
import com.example.gestion_des_epi.gestion_epi.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DemandeEpiService {

    private final DemandeEpiRepository demandeEpiRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final EpiRepository epiRepository;
    private final BesoinRepository besoinRepository;
    private static final Logger logger = LoggerFactory.getLogger(BesoinService.class);


    @Transactional
    public DemandeEpi createDemande(DemandeEpiDto demandeEpiDto, String username) {
        log.info("Début de la création d'une demande EPI pour l'utilisateur: {}", username);

        // 1. Validation des données d'entrée
        if (demandeEpiDto == null) {
            log.error("L'objet demandeEpiDto est null");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Les données de la demande sont requises");
        }

        if (demandeEpiDto.getBesoins() == null || demandeEpiDto.getBesoins().isEmpty()) {
            log.error("Aucun besoin fourni dans la demande");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Au moins un besoin EPI est requis");
        }

        // 2. Récupération de l'utilisateur
        Utilisateur demandeur = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("Utilisateur non trouvé avec le username: {}", username);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé");
                });
        log.debug("Utilisateur trouvé - ID: {}, Nom: {}", demandeur.getId(), demandeur.getNom());

        // 3. Création de la demande EPI
        DemandeEpi demande = new DemandeEpi();
        demande.setDateDemande(LocalDateTime.now());
        demande.setStatut("EN_ATTENTE");
        demande.setDemandeur(demandeur);

        // Génération de la référence
        demande.onCreate();
        log.debug("Demande EPI créée - Référence: {}", demande.getReference());

        // 4. Sauvegarde initiale de la demande
        DemandeEpi savedDemande = demandeEpiRepository.save(demande);
        log.info("Demande EPI enregistrée avec succès - ID: {}", savedDemande.getId());

        // 5. Traitement des besoins
        List<Besoin> besoinsCrees = new ArrayList<>();
        demandeEpiDto.getBesoins().forEach(besoinDto -> {
            try {
                log.debug("Traitement du besoin pour l'EPI: {}", besoinDto.getEpiNom());

                // Validation de la quantité
                if (besoinDto.getQuantite() <= 0) {
                    log.error("Quantité invalide pour l'EPI {}: {}", besoinDto.getEpiNom(), besoinDto.getQuantite());
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "La quantité doit être positive pour l'EPI: " + besoinDto.getEpiNom());
                }

                // Recherche de l'EPI
                Epi epi = epiRepository.findByNom(besoinDto.getEpiNom())
                        .orElseThrow(() -> {
                            log.error("EPI non trouvé: {}", besoinDto.getEpiNom());
                            return new ResponseStatusException(HttpStatus.NOT_FOUND,
                                    "EPI non trouvé: " + besoinDto.getEpiNom());
                        });

                // Création du besoin
                Besoin besoin = new Besoin();
                besoin.setQuantite(besoinDto.getQuantite());
                besoin.setEpi(epi);
                besoin.setDemandeEPI(savedDemande);

                // Sauvegarde du besoin
                Besoin besoinEnregistre = besoinRepository.save(besoin);
                besoinsCrees.add(besoinEnregistre);

                // Ajout à la demande (relation bidirectionnelle)
                savedDemande.getBesoins().add(besoinEnregistre);

                log.debug("Besoin créé avec succès - ID: {}, EPI: {}, Quantité: {}",
                        besoinEnregistre.getId(), besoinDto.getEpiNom(), besoinDto.getQuantite());
            } catch (Exception e) {
                log.error("Erreur lors de la création du besoin pour l'EPI {}: {}",
                        besoinDto.getEpiNom(), e.getMessage());
                throw e;
            }
        });

        // 6. Mise à jour finale de la demande avec les besoins
        DemandeEpi demandeFinale = demandeEpiRepository.save(savedDemande);
        log.info("Demande EPI finalisée avec {} besoins - ID: {}", besoinsCrees.size(), demandeFinale.getId());

        return demandeFinale;
    }

    public DemandeEpi findById(Long id) {
        log.debug("Recherche de la demande EPI par ID: {}", id);

        return demandeEpiRepository.findById(id)
                .map(demande -> {
                    // Force le chargement des besoins si nécessaire
                    if (demande.getBesoins() == null) {
                        log.warn("Aucun besoin trouvé pour la demande ID: {}", id);
                        demande.setBesoins(new ArrayList<>());
                    } else {
                        log.debug("{} besoins trouvés pour la demande ID: {}", demande.getBesoins().size(), id);
                    }
                    return demande;
                })
                .orElseThrow(() -> {
                    log.error("Demande EPI non trouvée avec l'ID: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Demande non trouvée avec ID: " + id);
                });
    }

    // Méthode pour mettre à jour une demande
    public DemandeEpi updateDemande(Long id, DemandeEpiDto demandeEpiDto, String username) {
        logger.debug("Début de la mise à jour de la demande avec ID: {}", id);

        DemandeEpi demandeExistante = demandeEpiRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Demande non trouvée avec ID: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Demande non trouvée avec ID: " + id);
                });

        // Vérifiez que la demande est toujours en attente
        if (!StatutValidation.EN_ATTENTE.equals(demandeExistante.getStatut())) {
            logger.error("La demande avec ID: {} ne peut pas être modifiée car elle n'est pas en attente.", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La demande ne peut pas être modifiée car elle n'est pas en attente.");
        }

        // Mise à jour des champs de la demande selon les données fournies dans le DTO
        // Exemple: mise à jour du titre et de la description (ajustez selon vos champs)
        // demandeExistante.setTitre(demandeEpiDto.getTitre());
        // demandeExistante.setDescription(demandeEpiDto.getDescription());



        // Sauvegardez et retournez la demande mise à jour
        DemandeEpi updatedDemande = demandeEpiRepository.save(demandeExistante);
        logger.info("Demande EPI mise à jour avec succès - ID: {}", updatedDemande.getId());
        return updatedDemande;
    }

    // Méthode pour supprimer une demande
    public void deleteDemande(Long id) {
        logger.debug("Début de la suppression de la demande avec ID: {}", id);

        DemandeEpi demande = demandeEpiRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Demande non trouvée avec ID: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Demande non trouvée avec ID: " + id);
                });

        // Vérifiez si la demande est toujours en attente
        if (!StatutValidation.EN_ATTENTE.equals(demande.getStatut())) {
            logger.error("La demande avec ID: {} ne peut pas être supprimée car elle n'est pas en attente.", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La demande ne peut pas être supprimée car elle n'est pas en attente.");
        }

        // Suppression de la demande
        demandeEpiRepository.delete(demande);
        logger.info("Demande EPI supprimée avec succès - ID: {}", id);
    }

}