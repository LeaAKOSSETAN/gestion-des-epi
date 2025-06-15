package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.BesoinRequestDto;
import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.dto.ValidationDto;
import com.example.gestion_des_epi.gestion_epi.enume.StatutValidation;
import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Besoin;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.BesoinRepository;
import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.text.Normalizer;
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

        if (demandeEpiDto.getJustification() == null || demandeEpiDto.getJustification().trim().isEmpty()) {
            log.error("Aucune justification fournie dans la demande");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Une justification est requise pour la demande");
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
        demande.setStatut(StatutValidation.valueOf("EN_ATTENTE"));
        demande.setDemandeur(demandeur);
        demande.setJustification(demandeEpiDto.getJustification()); // Ajout de la justification

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
        log.debug("Début de la mise à jour de la demande avec ID: {}", id);

        DemandeEpi demandeExistante = demandeEpiRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Demande non trouvée avec ID: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Demande non trouvée avec ID: " + id);
                });

        // Vérifier que la demande est toujours en attente de validation DQHSE
        if (demandeExistante.getValidationDQHSE() != StatutValidation.EN_ATTENTE) {
            log.error("La demande avec ID: {} ne peut pas être modifiée car elle a déjà été traitée par le DQHSE", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La demande ne peut pas être modifiée car elle a déjà été traitée par le DQHSE");
        }

        // Mise à jour de la justification si fournie
        if (demandeEpiDto.getJustification() != null && !demandeEpiDto.getJustification().isEmpty()) {
            demandeExistante.setJustification(demandeEpiDto.getJustification());
            log.debug("Justification mise à jour pour la demande ID: {}", id);
        }

        // Sauvegarder et retourner la demande mise à jour
        DemandeEpi updatedDemande = demandeEpiRepository.save(demandeExistante);
        log.info("Demande EPI mise à jour avec succès - ID: {}", updatedDemande.getId());
        return updatedDemande;
    }

    // Méthode pour supprimer une demande
    public void deleteDemande(Long id) {
        log.debug("Début de la suppression de la demande avec ID: {}", id);

        DemandeEpi demande = demandeEpiRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Demande non trouvée avec ID: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Demande non trouvée avec ID: " + id);
                });

        // Vérifier si la demande est toujours en attente de validation DQHSE
        if (demande.getValidationDQHSE() != StatutValidation.EN_ATTENTE) {
            log.error("La demande avec ID: {} ne peut pas être supprimée car elle a déjà été traitée par le DQHSE", id);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La demande ne peut pas être supprimée car elle a déjà été traitée par le DQHSE");
        }

        // Suppression de la demande
        demandeEpiRepository.delete(demande);
        log.info("Demande EPI supprimée avec succès - ID: {}", id);
    }

    @Transactional
    public DemandeEpi validerDemandeDQHSE(Long demandeId, ValidationDto validationDto, String username) {
        log.info("Tentative de validation DQHSE pour la demande ID: {} par l'utilisateur: {}", demandeId, username);

        // Vérification de l'utilisateur
        Utilisateur validateur = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("Utilisateur non trouvé: {}", username);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé");
                });

        // Vérification du rôle DQHSE
        if (validateur.getTypeCompte() != TypeCompte.DQHSE) {
            log.error("Accès refusé - Utilisateur: {}, Rôle: {}", username, validateur.getTypeCompte());
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Seul un DQHSE peut valider les demandes");
        }

        // Récupération de la demande
        DemandeEpi demande = demandeEpiRepository.findById(demandeId)
                .orElseThrow(() -> {
                    log.error("Demande non trouvée - ID: {}", demandeId);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Demande non trouvée");
                });

        // Vérification du statut actuel
        if (demande.getValidationDQHSE() != StatutValidation.EN_ATTENTE) {
            log.error("Demande déjà traitée - ID: {}, Statut: {}", demandeId, demande.getValidationDQHSE());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La demande a déjà été traitée");
        }

        // Validation basée sur le DTO
        if (validationDto.getEstValide() != null) {
            // Mode manuel : décision explicite du DQHSE
            if (validationDto.getEstValide()) {
                demande.setValidationDQHSE(StatutValidation.VALIDEE);
                demande.setStatut(StatutValidation.VALIDEE);
                log.info("Validation manuelle - Demande ID: {} approuvée par DQHSE", demandeId);
            } else {
                demande.setValidationDQHSE(StatutValidation.REFUSEE);
                demande.setStatut(StatutValidation.REFUSEE);
                log.info("Validation manuelle - Demande ID: {} refusée par DQHSE", demandeId);
            }
        } else {
            // Mode automatique : validation basée sur la justification
            boolean justificationValide = verifierJustification(demande.getJustification());
            log.info("Validation automatique - ID: {}, Résultat: {}", demandeId, justificationValide ? "VALIDE" : "INVALIDE");

            if (justificationValide) {
                demande.setValidationDQHSE(StatutValidation.VALIDEE);
                demande.setStatut(StatutValidation.VALIDEE);
                log.info("Demande validée automatiquement - ID: {}", demandeId);
            } else {
                demande.setValidationDQHSE(StatutValidation.REFUSEE);
                demande.setStatut(StatutValidation.REFUSEE);
                log.info("Demande refusée automatiquement - ID: {}", demandeId);
            }
        }

        return demandeEpiRepository.save(demande);
    }

    private boolean verifierJustification(String justification) {
        if (justification == null || justification.isBlank()) {
            return false;
        }

        String cleanText = justification.toLowerCase()
                .replaceAll("[éèêë]", "e")
                .replaceAll("[àâä]", "a")
                .replaceAll("[îï]", "i")
                .replaceAll("[ôö]", "o")
                .replaceAll("[ùûü]", "u");

        // Vérification de la longueur
        if (cleanText.length() < 20 || cleanText.length() > 1000) {
            return false;
        }

        // Compter les mots-clés
        int count = 0;
        String[] keywords = {"securite", "protection", "risque", "norme", "epi", "danger"};
        for (String keyword : keywords) {
            if (cleanText.contains(keyword)) {
                count++;
            }
        }

        return count >= 2;
    }
}