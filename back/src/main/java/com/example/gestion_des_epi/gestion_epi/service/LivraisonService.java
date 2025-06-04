// package com.example.gestion_des_epi.gestion_epi.service;

// import com.example.gestion_des_epi.gestion_epi.model.Livraison;
// import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
// import com.example.gestion_des_epi.gestion_epi.repository.LivraisonRepository;
// import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class LivraisonService {

//     private static final Logger logger = LoggerFactory.getLogger(LivraisonService.class);

//     @Autowired
//     private LivraisonRepository livraisonRepository;

//     @Autowired
//     private DemandeEpiRepository demandeEpiRepository;

//     @Transactional
//     public Livraison createLivraison(Livraison livraison) {
//         try {
//             // Validation de l'existence de la demande EPI
//             DemandeEpi demande = demandeEpiRepository.findById(Long.valueOf(livraison.getDemandeEpi().getId()))
//                     .orElseThrow(() -> new IllegalArgumentException("Demande EPI introuvable"));

//             // Vérification si la demande est déjà livrée
//             if(demande.isLivree()) {
//                 logger.warn("Tentative de livraison pour une demande déjà livrée: {}", demande.getId());
//                 throw new IllegalStateException("Cette demande a déjà été livrée");
//             }

//             // Enregistrement de la livraison
//             Livraison savedLivraison = livraisonRepository.save(livraison);

//             // Mise à jour du statut de la demande
//             demande.setLivree(true);
//             demandeEpiRepository.save(demande);

//             logger.info("Livraison créée avec succès: {} pour la demande: {}", savedLivraison.getId(), demande.getId());
//             return savedLivraison;

//         } catch (Exception e) {
//             logger.error("Erreur lors de la création de la livraison: {}", e.getMessage());
//             throw e;
//         }
//     }

//     public List<Livraison> getAllLivraisons() {
//         logger.info("Récupération de toutes les livraisons");
//         return livraisonRepository.findAll();
//     }

//     public Optional<Livraison> getLivraisonById(int id) {
//         logger.info("Récupération de la livraison ID: {}", id);
//         return livraisonRepository.findById((long) id);
//     }

//     @Transactional
//     public Livraison updateLivraison(int id, Livraison livraisonDetails) {
//         try {
//             Livraison livraison = livraisonRepository.findById((long) id)
//                     .orElseThrow(() -> new IllegalArgumentException("Livraison introuvable"));

//             // Journalisation des modifications
//             logger.info("Mise à jour de la livraison ID: {}", id);
//             if(!livraison.getDate_livraison().equals(livraisonDetails.getDate_livraison())) {
//                 logger.debug("Modification date livraison: {} -> {}",
//                         livraison.getDate_livraison(), livraisonDetails.getDate_livraison());
//             }
//             if(!livraison.getLivreur().equals(livraisonDetails.getLivreur())) {
//                 logger.debug("Modification livreur: {} -> {}",
//                         livraison.getLivreur(), livraisonDetails.getLivreur());
//             }

//             livraison.setDate_livraison(livraisonDetails.getDate_livraison());
//             livraison.setLivreur(livraisonDetails.getLivreur());

//             return livraisonRepository.save(livraison);

//         } catch (Exception e) {
//             logger.error("Erreur lors de la mise à jour de la livraison ID: {} - {}", id, e.getMessage());
//             throw e;
//         }
//     }

//     @Transactional
//     public void deleteLivraison(int id) {
//         try {
//             Livraison livraison = livraisonRepository.findById((long) id)
//                     .orElseThrow(() -> new IllegalArgumentException("Livraison introuvable"));

//             // Réinitialiser le statut de la demande EPI
//             DemandeEpi demande = livraison.getDemandeEpi();
//             demande.setLivree(false);
//             demandeEpiRepository.save(demande);

//             livraisonRepository.delete(livraison);
//             logger.info("Livraison supprimée ID: {}", id);

//         } catch (Exception e) {
//             logger.error("Erreur lors de la suppression de la livraison ID: {} - {}", id, e.getMessage());
//             throw e;
//         }
//     }

//     public List<Livraison> getLivraisonsByDemandeId(int demandeId) {
//         logger.info("Récupération des livraisons pour demande ID: {}", demandeId);
//         return livraisonRepository.findByDemandeEpi_id_Id(demandeId);
//     }
// }