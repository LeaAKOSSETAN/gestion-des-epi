//package com.example.gestion_des_epi.gestion_epi.controller;
//
//import com.example.gestion_des_epi.gestion_epi.dto.LivraisonRequestDTO;
//import com.example.gestion_des_epi.gestion_epi.model.Livraison;
//import com.example.gestion_des_epi.gestion_epi.service.LivraisonService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/livraisons")
//@RequiredArgsConstructor
//@Slf4j
//public class LivraisonController {
//
//    private final LivraisonService livraisonService;
//
//    @PostMapping
//    public ResponseEntity<Livraison> creerLivraison(@RequestBody LivraisonRequestDTO dto,
//                                                    @AuthenticationPrincipal UserDetails userDetails) {
//        log.info("Requête création livraison reçue de l'utilisateur: {}", userDetails.getUsername());
//        Livraison livraison = livraisonService.creerLivraison(dto, userDetails.getUsername());
//        return ResponseEntity.ok(livraison);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Livraison>> getAllLivraisons() {
//        log.info("Requête pour récupérer toutes les livraisons");
//        return ResponseEntity.ok(livraisonService.getAllLivraisons());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Livraison> getLivraisonById(@PathVariable int id) {
//        log.info("Requête pour récupérer la livraison ID: {}", id);
//        Livraison livraison = livraisonService.getLivraisonById(id);
//        return ResponseEntity.ok(livraison);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteLivraison(@PathVariable int id) {
//        log.info("Requête pour supprimer la livraison ID: {}", id);
//        livraisonService.deleteLivraison(id);
//        return ResponseEntity.ok("Livraison supprimée avec succès");
//    }
//}
