package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.dto.ValidationDto;
import com.example.gestion_des_epi.gestion_epi.enume.StatutValidition;
import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DemandeEpiService {
    private static final Logger logger = LoggerFactory.getLogger(DemandeEpiService.class);

    private final DemandeEpiRepository demandeEpiRepository;
    private final EpiRepository epiRepository;
    private final UtilisateurRepository utilisateurRepository;

    @Transactional
    public DemandeEpi creerDemande(DemandeEpiDto dto, String emailDemandeur) {
        logger.info("Création demande par: {}", emailDemandeur);

        Utilisateur demandeur = utilisateurRepository.findByUsername(emailDemandeur)
                .orElseThrow(() -> {
                    logger.error("Utilisateur non trouvé: {}", emailDemandeur);
                    return new RuntimeException("Utilisateur non trouvé");
                });

        Epi epi = epiRepository.findById(Long.valueOf(dto.epiId()))
                .orElseThrow(() -> {
                    logger.error("EPI non trouvé ID: {}", dto.epiId());
                    return new RuntimeException("EPI non trouvé");
                });

        DemandeEpi demande = new DemandeEpi();
        demande.setDateDemande(LocalDateTime.now());
        demande.setQuantite(dto.quantite());
        demande.setJustification(dto.justification());
        demande.setStatutValidation(StatutValidition.EN_ATTENTE);
        demande.setEpi(epi);
        demande.setDemandeur(demandeur);

        DemandeEpi savedDemande = demandeEpiRepository.save(demande);
        logger.info("Demande créée ID: {}", savedDemande.getId());
        return savedDemande;
    }

    public List<DemandeEpi> getDemandesByUtilisateurConnecte(String email) {
        logger.info("Récupération des demandes pour: {}", email);

        Utilisateur utilisateur = utilisateurRepository.findByUsername(email)
               .orElseThrow(() -> {
                    logger.error("Utilisateur non trouvé: {}", email);
                    return new RuntimeException("Utilisateur non trouvé");
                });

        List<DemandeEpi> demandes = demandeEpiRepository.findByDemandeur(utilisateur);
        logger.info("{} demandes trouvées pour {}", demandes.size(), email);
        return demandes;
    }

    public List<DemandeEpi> getDemandesEnAttentePourValidation() {
        logger.info("Récupération des demandes en attente de validation");
        List<DemandeEpi> demandes = demandeEpiRepository.findByStatutValidation(StatutValidition.EN_ATTENTE);
        logger.info("{} demandes en attente trouvées", demandes.size());
        return demandes;
    }

    @Transactional
    public DemandeEpi traiterDemande(Long demandeId, ValidationDto dto, String emailValidateur) {
        logger.info("Traitement demande ID: {} par: {}", demandeId, emailValidateur);

        DemandeEpi demande = demandeEpiRepository.findById(demandeId)
                .orElseThrow(() -> {
                    logger.error("Demande non trouvée ID: {}", demandeId);
                    return new RuntimeException("Demande non trouvée");
                });

        Utilisateur validateur = utilisateurRepository.findByUsername(emailValidateur)
                .orElseThrow(() -> {
                    logger.error("Validateur non trouvé: {}", emailValidateur);
                    return new RuntimeException("Validateur non trouvé");
                });

        // Vérification critique du rôle DQHSE
        if (validateur.getTypeCompte() != TypeCompte.DQHSE && validateur.getTypeCompte() != TypeCompte.ADMIN ) {
            logger.error("Accès refusé: {} n'est pas DQHSE", emailValidateur);
            throw new SecurityException("Accès refusé: rôle DQHSE requis");
        }

        if (dto.getEstValide()) {
            demande.valider(validateur, dto.getCommentaire());
            logger.info("Demande ID: {} validée", demandeId);
        } else {
            demande.rejeter(validateur, dto.getCommentaire());
            logger.info("Demande ID: {} rejetée", demandeId);
        }

        return demandeEpiRepository.save(demande);
    }

    @Transactional
    public DemandeEpi modifierDemande(Long demandeId, DemandeEpiDto dto, String emailUtilisateur) {
        logger.info("Modification demande ID: {} par: {}", demandeId, emailUtilisateur);

        DemandeEpi demande = demandeEpiRepository.findById(demandeId)
                .orElseThrow(() -> {
                    logger.error("Demande non trouvée ID: {}", demandeId);
                    return new RuntimeException("Demande non trouvée");
                });

        Utilisateur utilisateur = utilisateurRepository.findByUsername(emailUtilisateur)
                .orElseThrow(() -> {
                    logger.error("Utilisateur non trouvé: {}", emailUtilisateur);
                    return new RuntimeException("Utilisateur non trouvé");
                });

        // Vérification que l'utilisateur est bien le demandeur
        if (!demande.getDemandeur().getEmail().equals(utilisateur.getEmail())) {
            logger.error("Tentative modification non autorisée par: {}", emailUtilisateur);
            throw new SecurityException("Vous ne pouvez modifier que vos propres demandes");
        }

        demande.setQuantite(dto.quantite());
        demande.setJustification(dto.justification());

        logger.info("Demande ID: {} modifiée", demandeId);
        return demandeEpiRepository.save(demande);
    }
}