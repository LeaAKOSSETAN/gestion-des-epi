package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.dto.ValidationDto;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.service.DemandeEpiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/demandes")
@RequiredArgsConstructor
public class DemandeEpiController {
    private final DemandeEpiService demandeEpiService;
@PreAuthorize("hasAnyRole(\"ROLE_ADMIN\", \"ROLE_DQHSE\", \"ROLE_GESTIONNAIRE\", \"ROLE_EMPLOYE\")")
    @PostMapping
    public ResponseEntity<DemandeEpi> creerDemande(
            @RequestBody DemandeEpiDto dto,
            Authentication authentication) {
        String emailDemandeur = authentication.getName();
        return ResponseEntity.ok(demandeEpiService.creerDemande(dto, emailDemandeur));
    }

    @PostMapping("/{id}/validation")
    @PreAuthorize("hasAnyRole(\"ROLE_ADMIN\", \"ROLE_DQHSE\")")
    public ResponseEntity<DemandeEpi> validerDemande(
            @PathVariable Integer id,
            @RequestBody ValidationDto dto,
            Authentication authentication) {
        String emailValidateur = authentication.getName();
        return ResponseEntity.ok(demandeEpiService.traiterDemande(Long.valueOf(id), dto, emailValidateur));
    }
    @PreAuthorize("hasAnyRole(\"ROLE_ADMIN\", \"ROLE_DQHSE\", \"ROLE_GESTIONNAIRE\", \"ROLE_EMPLOYE\")")
    @GetMapping("/mes-demandes")
    public ResponseEntity<List<DemandeEpi>> getMesDemandes(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(demandeEpiService.getDemandesByUtilisateurConnecte(email));
    }

    @GetMapping("/a-valider")
    @PreAuthorize("hasRole('ROLE_DQHSE')")
    public ResponseEntity<List<DemandeEpi>> getDemandesAValider() {
        return ResponseEntity.ok(demandeEpiService.getDemandesEnAttentePourValidation());
    }
    @PutMapping("/{id}")
    public ResponseEntity<DemandeEpi> modifierDemande(
            @PathVariable Integer id,
            @RequestBody @Valid DemandeEpiDto dto,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(demandeEpiService.modifierDemande(Long.valueOf(id), dto, email));
    }
}