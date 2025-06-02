package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.model.Livraison;
import com.example.gestion_des_epi.gestion_epi.service.LivraisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livraisons")
public class LivraisonController {

    @Autowired
    private LivraisonService livraisonService;

    @PostMapping
    public ResponseEntity<Livraison> createLivraison(@RequestBody Livraison livraison) {
        return ResponseEntity.ok(livraisonService.createLivraison(livraison));
    }

    @GetMapping
    public List<Livraison> getAllLivraisons() {
        return livraisonService.getAllLivraisons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livraison> getLivraisonById(@PathVariable int id) {
        return livraisonService.getLivraisonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livraison> updateLivraison(
            @PathVariable int id,
            @RequestBody Livraison livraisonDetails) {
        return ResponseEntity.ok(livraisonService.updateLivraison(id, livraisonDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivraison(@PathVariable int id) {
        livraisonService.deleteLivraison(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/demande/{demandeId}")
    public List<Livraison> getLivraisonsByDemandeId(@PathVariable int demandeId) {
        return livraisonService.getLivraisonsByDemandeId(demandeId);
    }
}