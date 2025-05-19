package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.UtilisateurDto;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@RestController
@RequestMapping(path = "/user")
public class UtilisateurController {

@Autowired
    private UtilisateurService utilisateurService;
//
//    @PreAuthorize("hasRole('ADMIN')")

    @PostMapping(path = "inscription")
    public void inscription(@RequestBody UtilisateurDto utilisateurDto){
        log.info("Inscription");
        this.utilisateurService.inscription(utilisateurDto);
    }

    @PostMapping("/creer")
    public ResponseEntity<?> creerUtilisateur(@RequestBody UtilisateurDto dto) {
        Utilisateur u = utilisateurService.creerUtilisateur(dto);
        return ResponseEntity.ok("Utilisateur " + u.getNom() + " créé !");
    }

    @PutMapping("/changer-statut/{id}")
    public ResponseEntity<?> changerStatut(@PathVariable Long id) {
        utilisateurService.activerDesactiver(id);
        return ResponseEntity.ok("Statut modifié !");
    }
    @GetMapping("/liste")
    public ResponseEntity<List<Utilisateur>> listerUtilisateurs(
            @RequestParam(required = false) String typeCompte) {
        return ResponseEntity.ok(utilisateurService.listerUtilisateurs(typeCompte));
    }

}
