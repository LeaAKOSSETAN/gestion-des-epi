package com.example.gestion_des_epi.gestion_epi.service;


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
}