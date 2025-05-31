package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.dto.ValidationDto;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.service.DemandeEpiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/demandes", produces = APPLICATION_JSON_VALUE)
public class DemandeEpiController {

    private final DemandeEpiService demandeEpiService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('UTILISATEUR')")
    public DemandeEpi createDemande(@RequestBody DemandeEpiDto demandeEpiDto,
                                    Authentication authentication) {
        // Récupérer l'email de l'utilisateur connecté
        String username = authentication.getName();
        return demandeEpiService.createDemande(demandeEpiDto, username);
    }
    @PreAuthorize("hasRole('DQHSE')")
    @PutMapping("/{id}/validation")
    public DemandeEpi validerDemande(
            @PathVariable Integer id,
            @RequestBody ValidationDto validationDto) {
        return demandeEpiService.traiterDemande(id, validationDto);
    }

    @PreAuthorize("hasRole('GESTIONNAIRE')")
    @PutMapping("/{id}/livraison")
    public DemandeEpi enregistrerLivraison(@PathVariable Integer id) {
        return demandeEpiService.marquerCommeLivree(id);
    }

    @GetMapping("/utilisateur/{userId}")
    public List<DemandeEpi> getDemandesParUtilisateur(@PathVariable Integer userId) {
        return demandeEpiService.getDemandesByUtilisateur(String.valueOf(userId));
    }

    @PreAuthorize("hasRole('DQHSE')")
    @GetMapping("/a-valider")
    public List<DemandeEpi> getDemandesEnAttente() {
        return demandeEpiService.getDemandesEnAttente();
    }

    @GetMapping("/{id}")
    public DemandeEpi getDemandeDetails(@PathVariable Integer id) {
        return demandeEpiService.getDemandeById(id);
    }
}