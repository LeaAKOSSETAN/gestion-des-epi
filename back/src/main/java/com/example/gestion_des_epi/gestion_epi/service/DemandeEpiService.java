package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.dto.ValidationDto;
import com.example.gestion_des_epi.gestion_epi.enume.StatutLivraison;
import com.example.gestion_des_epi.gestion_epi.enume.StatutValidition;
import com.example.gestion_des_epi.gestion_epi.model.*;
import com.example.gestion_des_epi.gestion_epi.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DemandeEpiService {

    private final DemandeEpiRepository demandeEpiRepository;
    private final EpiRepository epiRepository;
    private final UtilisateurRepository utilisateurRepository;

    @Transactional
    public DemandeEpi createDemande(DemandeEpiDto demandeEpiDto, String username) {
        Utilisateur demandeur = utilisateurRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Utilisateur non connecté"
                ));

        Epi epi = epiRepository.findById(demandeEpiDto.epiId().longValue())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "EPI non trouvé avec l'ID: " + demandeEpiDto.epiId()
                ));

        DemandeEpi demande = new DemandeEpi();
        demande.setDateDemande(LocalDateTime.now());
        demande.setQuantite(demandeEpiDto.quantite());
        demande.setJustification(demandeEpiDto.justification());
        demande.setStatutValidation(StatutValidition.EN_ATTENTE);
        demande.setEpi(epi);
        demande.setDemandeur(demandeur);

        return demandeEpiRepository.save(demande);
    }

    @Transactional
    public DemandeEpi traiterDemande(Integer demandeId, ValidationDto validationDto) {
        DemandeEpi demande = demandeEpiRepository.findById(Long.valueOf(demandeId))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Demande non trouvée avec l'ID: " + demandeId));

        Utilisateur validateur = utilisateurRepository.findById(validationDto.getValidateurId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Validateur non trouvé avec l'ID: " + validationDto.getValidateurId()));

        if (validationDto.getEstValide()) {
            demande.setStatutValidation(StatutValidition.VALIDEE);
        } else {
            demande.setStatutValidation(StatutValidition.REFUSEE);
        }

        demande.setValidateur(validateur);
        demande.setCommentaireValidation(validationDto.getCommentaire());
        demande.setDateValidation(LocalDateTime.now());

        return demandeEpiRepository.save(demande);
    }

    @Transactional
    public DemandeEpi marquerCommeLivree(Integer demandeId) {
        DemandeEpi demande = demandeEpiRepository.findById(Long.valueOf(demandeId))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Demande non trouvée avec l'ID: " + demandeId));

        if (demande.getStatutValidation() != StatutValidition.VALIDEE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Seules les demandes validées peuvent être livrées");
        }

        demande.setStatutLivraison(StatutLivraison.LIVREE);
        demande.setDateLivraison(LocalDateTime.now());

        return demandeEpiRepository.save(demande);
    }

    public List<DemandeEpi> getDemandesByUtilisateur(String username) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Utilisateur non trouvé avec l'email: " + username
                ));

        // CORRECTION : Utilisation de findByDemandeur
        return demandeEpiRepository.findByDemandeur(utilisateur);
    }

    public List<DemandeEpi> getDemandesEnAttente() {
        // CORRECTION : Suppression de la double parenthèse
        return demandeEpiRepository.findByStatutValidation(StatutValidition.EN_ATTENTE);
    }

    public DemandeEpi getDemandeById(Integer id) {
        return demandeEpiRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Demande non trouvée avec l'ID: " + id));
    }
}