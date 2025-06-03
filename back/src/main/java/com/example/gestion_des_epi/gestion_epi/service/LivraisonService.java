//package com.example.gestion_des_epi.gestion_epi.service;
//
//import com.example.gestion_des_epi.gestion_epi.dto.LivraisonRequestDTO;
//import com.example.gestion_des_epi.gestion_epi.model.LigneLivraison;
//import com.example.gestion_des_epi.gestion_epi.model.Livraison;
//import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
//import com.example.gestion_des_epi.gestion_epi.repository.LivraisonRepository;
//import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j  // Lombok pour le logger
//public class LivraisonService {
//
//    private final LivraisonRepository livraisonRepo;
//    private final DemandeEpiRepository demandeRepo;
//
//    public Livraison creerLivraison(LivraisonRequestDTO dto, String usernameConnecte) {
//        log.info("Début création livraison pour la demande ID: {}", dto.getDemandeEpiId());
//
//        DemandeEpi demande = demandeRepo.findById(dto.getDemandeEpiId())
//                .orElseThrow(() -> {
//                    log.error("Demande EPI non trouvée pour ID: {}", dto.getDemandeEpiId());
//                    return new RuntimeException("Demande EPI non trouvée");
//                });
//
//        Livraison livraison = new Livraison();
//        livraison.setDate_livraison((java.sql.Date) new Date(System.currentTimeMillis()));
//        livraison.setLivreur(usernameConnecte);
//        livraison.setDemandeEpi(demande);
//
//        List<LigneLivraison> lignes = dto.getLignes().stream().map(ligneDTO -> {
//            LigneLivraison ligne = new LigneLivraison();
//            ligne.setNomEpi(ligneDTO.getNomEpi());
//            ligne.setQuantiteLivree(ligneDTO.getQuantiteLivree());
//            ligne.setLivraison(livraison);
//            return ligne;
//        }).toList();
//
//        livraison.setLignes(lignes);
//
//        Livraison saved = livraisonRepo.save(livraison);
//
//        log.info("Livraison créée avec succès ID: {}", saved.getId());
//        return saved;
//    }
//
//    public List<Livraison> getAllLivraisons() {
//        log.info("Récupération de toutes les livraisons");
//        return livraisonRepo.findAll();
//    }
//
//    public Livraison getLivraisonById(int id) {
//        log.info("Recherche livraison par ID: {}", id);
//        return livraisonRepo.findById((long) id)
//                .orElseThrow(() -> {
//                    log.error("Livraison non trouvée pour ID: {}", id);
//                    return new RuntimeException("Livraison non trouvée");
//                });
//    }
//
//    public void deleteLivraison(int id) {
//        log.info("Suppression de la livraison ID: {}", id);
//        if (!livraisonRepo.existsById((long) id)) {
//            log.error("Tentative de suppression d'une livraison non existante ID: {}", id);
//            throw new RuntimeException("Livraison non trouvée");
//        }
//        livraisonRepo.deleteById((long) id);
//        log.info("Livraison supprimée ID: {}", id);
//    }
//}
