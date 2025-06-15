package com.example.gestion_des_epi.gestion_epi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.service.DemandeEpiService;


import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/demandes")
public class DemandeEpiController {

    private final DemandeEpiService demandeEpiService;

    public DemandeEpiController(DemandeEpiService demandeEpiService) {
        this.demandeEpiService = demandeEpiService;
    }

    @PostMapping
    public ResponseEntity<DemandeEpi> createDemande(
            @RequestBody @Valid DemandeEpiDto demandeEpiDto,
            @AuthenticationPrincipal UserDetails userDetails) {

        log.info("Tentative de création d'une demande EPI par l'utilisateur: {}", userDetails.getUsername());
        log.debug("Détails de la demande: {}", demandeEpiDto);

        try {
            DemandeEpi createdDemande = demandeEpiService.createDemande(demandeEpiDto, userDetails.getUsername());
            log.info("Demande EPI créée avec succès - ID: {}", createdDemande.getId());
            return ResponseEntity.ok(createdDemande);
        } catch (Exception e) {
            log.error("Erreur lors de la création de la demande EPI", e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandeEpi> getDemande(@PathVariable Long id) {
        log.debug("Tentative de récupération de la demande EPI ID: {}", id);

        DemandeEpi demande = demandeEpiService.findById(id);
        log.info("Demande EPI trouvée - ID: {}, Statut: {}", demande.getId(), demande.getStatut());

        return ResponseEntity.ok(demande);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DemandeEpi> updateDemande(
            @PathVariable Long id,
            @RequestBody @Valid DemandeEpiDto demandeEpiDto,
            @AuthenticationPrincipal UserDetails userDetails) {

        log.info("Tentative de mise à jour de la demande EPI par l'utilisateur: {}", userDetails.getUsername());
        log.debug("Détails de la demande à mettre à jour: {}", demandeEpiDto);

        try {
            DemandeEpi updatedDemande = demandeEpiService.updateDemande(id, demandeEpiDto, userDetails.getUsername());
            log.info("Demande EPI mise à jour avec succès - ID: {}", updatedDemande.getId());
            return ResponseEntity.ok(updatedDemande);
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de la demande EPI", e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemande(@PathVariable Long id) {
        log.debug("Tentative de suppression de la demande EPI ID: {}", id);
        try {
            demandeEpiService.deleteDemande(id);
            log.info("Demande EPI supprimée avec succès - ID: {}", id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Erreur lors de la suppression de la demande EPI", e);
            throw e;
        }
    }
}