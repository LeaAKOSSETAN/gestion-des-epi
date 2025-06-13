package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.LigneLivraisonDto;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.service.LivraisonService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping("/api/livraisons")
public class LivraisonController {

    private final LivraisonService livraisonService;



    @PostMapping
    public ResponseEntity<DemandeEpi> creerLivraison(
            @RequestParam int demandeId,
            @RequestBody List<LigneLivraisonDto> lignes) {

        DemandeEpi livraison = livraisonService.creerLivraison(demandeId, lignes);
        return ResponseEntity.ok(livraison);
    }
}