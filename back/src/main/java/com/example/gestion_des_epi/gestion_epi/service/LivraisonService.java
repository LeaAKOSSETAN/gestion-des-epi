package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.LivraisonDto;
import com.example.gestion_des_epi.gestion_epi.enume.StatutBesoin;
import com.example.gestion_des_epi.gestion_epi.enume.StatutValidation;
import com.example.gestion_des_epi.gestion_epi.exception.EpiIndisponibleException;
import com.example.gestion_des_epi.gestion_epi.exception.SeuilAlerteAtteintException;
import com.example.gestion_des_epi.gestion_epi.exception.StockInsuffisantException;
import com.example.gestion_des_epi.gestion_epi.model.*;
import com.example.gestion_des_epi.gestion_epi.repository.BesoinRepository;
import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.LivraisonRepository;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LivraisonService {

    private final LivraisonRepository livraisonRepository;
    private final DemandeEpiRepository demandeEpiRepository;
    private final BesoinRepository besoinRepository;
    private final EpiRepository epiRepository;

    @Transactional
    public Livraison traiterLivraison(LivraisonDto livraisonDto) {
        log.info("Traitement de la livraison pour la demande: {}", livraisonDto.getDemandeId());

        // 1. Vérifier la demande
        DemandeEpi demande = demandeEpiRepository.findById(livraisonDto.getDemandeId())
                .orElseThrow(() -> {
                    log.error("Demande non trouvée avec l'id: {}", livraisonDto.getDemandeId());
                    return new IllegalArgumentException("Demande non trouvée");
                });

        // Vérification: La demande doit être validée par le DQHSE
        if (!StatutValidation.VALIDEE.equals(demande.getValidationDQHSE())) {
            log.error("La demande {} n'est pas validée. Statut actuel: {}", demande.getId(), demande.getValidationDQHSE());
            throw new IllegalArgumentException("La demande n'est pas validée par le DQHSE");
        }

        // 2. Vérifier l'EPI
        Epi epi = epiRepository.findById(livraisonDto.getEpiId().intValue())
                .orElseThrow(() -> {
                    log.error("EPI non trouvé avec l'id: {}", livraisonDto.getEpiId());
                    return new IllegalArgumentException("EPI non trouvé");
                });

        // 3. Trouver le besoin correspondant
        Besoin besoin = besoinRepository.findByDemandeEPIAndEpi(demande, epi)
                .orElseThrow(() -> {
                    log.error("Besoin non trouvé pour demande {} et EPI {}", demande.getId(), epi.getId());
                    return new IllegalArgumentException("Besoin non trouvé");
                });

        // 4. Vérifier la quantité
        if (livraisonDto.getQuantite() > besoin.getQuantiteRestante()) {
            log.warn("Tentative de livrer plus que le besoin restant: demandé={}, disponible={}",
                    livraisonDto.getQuantite(), besoin.getQuantiteRestante());
            throw new IllegalArgumentException("Quantité livrée supérieure au besoin restant");
        }

        // 5. Vérification: Stock suffisant
        if (epi.getQuantite_en_stock() < livraisonDto.getQuantite()) {
            log.error("Stock insuffisant pour l'EPI {}: stock={}, demande={}",
                    epi.getId(), epi.getQuantite_en_stock(), livraisonDto.getQuantite());
            String message = "Stock insuffisant pour l'EPI " + epi.getNom() +
                    ". Disponible: " + epi.getQuantite_en_stock() +
                    ", Demandé: " + livraisonDto.getQuantite();
            throw new StockInsuffisantException(message, epi);
        }

        // 6. Vérifier le seuil d'alerte après livraison
        int stockApresLivraison = epi.getQuantite_en_stock() - livraisonDto.getQuantite();
        if (stockApresLivraison <= epi.getSeuil_alerte()) {
            String message = "Le stock de l'EPI " + epi.getNom() +
                    " atteindra le seuil d'alerte (" + epi.getSeuil_alerte() +
                    ") après cette livraison";
            throw new SeuilAlerteAtteintException(message, epi);
        }

        // 7. Créer la livraison
        Livraison livraison = new Livraison();
        livraison.setDateLivraison(LocalDateTime.now());
        livraison.setReference("LIV-" + UUID.randomUUID().toString().substring(0, 8));
        livraison.setDemandeEpi(demande);
        livraison.setEpi(epi);
        livraison.setQuantiteLivree(livraisonDto.getQuantite());

        // 8. Mettre à jour le besoin
        int nouvelleQuantiteLivre = besoin.getQuantiteLivre() + livraisonDto.getQuantite();
        int nouvelleQuantiteRestante = besoin.getQuantite() - nouvelleQuantiteLivre;

        besoin.setQuantiteLivre(nouvelleQuantiteLivre);
        besoin.setQuantiteRestante(nouvelleQuantiteRestante);

        // Mettre à jour le statut du besoin
        if (nouvelleQuantiteRestante == 0) {
            besoin.setStatut(StatutBesoin.LIVRE_COMPLET);
        } else {
            besoin.setStatut(StatutBesoin.LIVRE_PARTIEL);
        }

        // 9. Mettre à jour le stock EPI
        epi.setQuantite_en_stock(stockApresLivraison);

        // 10. Mettre à jour le statut global de la demande
        mettreAJourStatutDemande(demande);

        // 11. Sauvegarder les entités
        epiRepository.save(epi);
        besoinRepository.save(besoin);
        demandeEpiRepository.save(demande);
        Livraison livraisonSauvegardee = livraisonRepository.save(livraison);

        log.info("Livraison traitée avec succès: {} - Quantité livrée: {}, Restant: {}, Statut Demande: {}",
                livraisonSauvegardee.getReference(),
                livraisonDto.getQuantite(),
                besoin.getQuantiteRestante(),
                demande.getStatut());

        return livraisonSauvegardee;
    }

    @Transactional
    public List<Livraison> traiterLivraisonMultiple(LivraisonDto livraisonDto) {
        if (livraisonDto.getItems() == null || livraisonDto.getItems().isEmpty()) {
            throw new IllegalArgumentException("Aucun item à livrer");
        }

        log.info("Traitement de la livraison multiple pour la demande: {}", livraisonDto.getDemandeId());
        DemandeEpi demande = demandeEpiRepository.findById(livraisonDto.getDemandeId())
                .orElseThrow(() -> new IllegalArgumentException("Demande non trouvée"));

        // Vérifier que la demande est validée par le DQHSE
        if (!StatutValidation.VALIDEE.equals(demande.getValidationDQHSE())) {
            throw new IllegalArgumentException("La demande n'est pas validée par le DQHSE");
        }

        // Vérification globale de disponibilité
        verifierDisponibiliteGlobale(livraisonDto.getItems());

        List<Livraison> livraisons = new ArrayList<>();
        for (LivraisonDto.LivraisonItemDto item : livraisonDto.getItems()) {
            Livraison livraison = traiterItemLivraison(demande, item);
            livraisons.add(livraison);
        }

        // Mettre à jour le statut global de la demande
        mettreAJourStatutDemande(demande);
        return livraisons;
    }

    private void verifierDisponibiliteGlobale(List<LivraisonDto.LivraisonItemDto> items) {
        // Regrouper les besoins par EPI
        Map<Long, Integer> besoinsParEpi = new HashMap<>();

        for (LivraisonDto.LivraisonItemDto item : items) {
            Besoin besoin = besoinRepository.findById(Math.toIntExact(item.getBesoinId()))
                    .orElseThrow(() -> new IllegalArgumentException("Besoin non trouvé: " + item.getBesoinId()));

            Epi epi = besoin.getEpi();

            besoinsParEpi.merge(
                    (long) epi.getId(),
                    item.getQuantite(),
                    Integer::sum
            );
        }

        // Vérifier le stock pour chaque EPI
        for (Map.Entry<Long, Integer> entry : besoinsParEpi.entrySet()) {
            Long epiId = entry.getKey();
            Integer quantiteTotale = entry.getValue();

            Epi epi = epiRepository.findById(Math.toIntExact(epiId))
                    .orElseThrow(() -> new IllegalArgumentException("EPI non trouvé: " + epiId));

            if (epi.getQuantite_en_stock() < quantiteTotale) {
                String message = "Stock insuffisant pour l'EPI: "
                        + epi.getNom() + ". Disponible: "
                        + epi.getQuantite_en_stock() + ", Demandé: "
                        + quantiteTotale;
                throw new StockInsuffisantException(message, epi);
            }

            // Vérifier si le seuil d'alerte est atteint après livraison
            int stockApresLivraison = epi.getQuantite_en_stock() - quantiteTotale;
            if (stockApresLivraison <= epi.getSeuil_alerte()) {
                String message = "Le stock de l'EPI " + epi.getNom() +
                        " atteindra le seuil d'alerte (" + epi.getSeuil_alerte() +
                        ") après cette livraison";
                throw new SeuilAlerteAtteintException(message, epi);
            }
        }
    }

    private Livraison traiterItemLivraison(DemandeEpi demande, LivraisonDto.LivraisonItemDto item) {
        Besoin besoin = besoinRepository.findById(Math.toIntExact(item.getBesoinId()))
                .orElseThrow(() -> new IllegalArgumentException("Besoin non trouvé"));

        // Vérifier que le besoin appartient à la demande
        if (!besoin.getDemandeEPI().getId().equals(demande.getId())) {
            throw new IllegalArgumentException("Le besoin ne correspond pas à la demande");
        }

        Epi epi = besoin.getEpi();
        int quantite = item.getQuantite();

        // Validation quantité et stock
        if (quantite > besoin.getQuantiteRestante()) {
            throw new IllegalArgumentException("Quantité livrée supérieure au besoin restant pour l'EPI: " + epi.getNom());
        }
        if (epi.getQuantite_en_stock() < quantite) {
            String message = "Stock insuffisant pour l'EPI: " + epi.getNom();
            throw new StockInsuffisantException(message, epi);
        }

        // Vérifier le seuil d'alerte après livraison
        int stockApresLivraison = epi.getQuantite_en_stock() - quantite;
        if (stockApresLivraison <= epi.getSeuil_alerte()) {
            String message = "Le stock de l'EPI " + epi.getNom() +
                    " atteindra le seuil d'alerte (" + epi.getSeuil_alerte() +
                    ") après cette livraison";
            throw new SeuilAlerteAtteintException(message, epi);
        }

        // Création livraison
        Livraison livraison = new Livraison();
        livraison.setDateLivraison(LocalDateTime.now());
        livraison.setReference("LIV-" + UUID.randomUUID().toString().substring(0, 8));
        livraison.setDemandeEpi(demande);
        livraison.setEpi(epi);
        livraison.setQuantiteLivree(quantite);

        // Mise à jour besoin
        int nouvelleQuantiteLivre = besoin.getQuantiteLivre() + quantite;
        int nouvelleQuantiteRestante = besoin.getQuantite() - nouvelleQuantiteLivre;
        besoin.setQuantiteLivre(nouvelleQuantiteLivre);
        besoin.setQuantiteRestante(nouvelleQuantiteRestante);
        besoin.setStatut(nouvelleQuantiteRestante == 0 ?
                StatutBesoin.LIVRE_COMPLET : StatutBesoin.LIVRE_PARTIEL);

        // Mise à jour stock
        epi.setQuantite_en_stock(stockApresLivraison);

        // Sauvegarde
        epiRepository.save(epi);
        besoinRepository.save(besoin);
        return livraisonRepository.save(livraison);
    }

    private void mettreAJourStatutDemande(DemandeEpi demande) {
        // Recharger la demande avec les besoins pour avoir les données à jour
        DemandeEpi demandeActualisee = demandeEpiRepository.findByIdWithBesoins(demande.getId())
                .orElseThrow(() -> new IllegalArgumentException("Demande non trouvée"));

        boolean tousLivres = demandeActualisee.getBesoins().stream()
                .allMatch(b -> b.getStatut() == StatutBesoin.LIVRE_COMPLET);

        demandeActualisee.setStatut(tousLivres ?
                StatutValidation.LIVRE : StatutValidation.EN_COURS_LIVRAISON);

        demandeEpiRepository.save(demandeActualisee);
    }

    @Transactional
    public Livraison mettreAJourQuantiteLivraison(Long id, int nouvelleQuantite) {
        log.info("Mise à jour partielle de la quantité pour la livraison ID: {}", id);

        // 1. Récupérer la livraison existante
        Livraison livraison = livraisonRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> {
                    log.error("Livraison non trouvée avec l'id: {}", id);
                    return new IllegalArgumentException("Livraison non trouvée");
                });

        // 2. Récupérer les entités liées
        Besoin besoin = besoinRepository.findByDemandeEPIAndEpi(livraison.getDemandeEpi(), livraison.getEpi())
                .orElseThrow(() -> {
                    log.error("Besoin non trouvé pour la livraison {}", id);
                    return new IllegalArgumentException("Besoin associé non trouvé");
                });

        Epi epi = livraison.getEpi();

        // 3. Calculer la différence de quantité
        int ancienneQuantite = livraison.getQuantiteLivree();
        int difference = nouvelleQuantite - ancienneQuantite;

        // 4. Vérifier si la quantité est identique
        if (difference == 0) {
            log.info("Aucun changement de quantité pour la livraison {}", id);
            return livraison;
        }

        // 5. Vérifier la quantité
        if (difference > 0) {
            // Augmentation de quantité
            if (difference > besoin.getQuantiteRestante()) {
                log.warn("Tentative d'augmenter la livraison au-delà du besoin restant: demandé={}, disponible={}",
                        difference, besoin.getQuantiteRestante());
                throw new IllegalArgumentException("Quantité supplémentaire supérieure au besoin restant");
            }

            if (epi.getQuantite_en_stock() < difference) {
                log.error("Stock insuffisant pour l'augmentation: stock={}, demande={}",
                        epi.getQuantite_en_stock(), difference);
                String message = "Stock insuffisant pour augmenter la livraison de l'EPI " + epi.getNom();
                throw new StockInsuffisantException(message, epi);
            }

            // Vérifier le seuil d'alerte après augmentation
            int stockApresMAJ = epi.getQuantite_en_stock() - difference;
            if (stockApresMAJ <= epi.getSeuil_alerte()) {
                String message = "Le stock de l'EPI " + epi.getNom() +
                        " atteindra le seuil d'alerte (" + epi.getSeuil_alerte() +
                        ") après cette augmentation";
                throw new SeuilAlerteAtteintException(message, epi);
            }
        } else {
            // Diminution de quantité (différence négative)
            int diminution = -difference;
            if (diminution > ancienneQuantite) {
                throw new IllegalArgumentException("Réduction supérieure à la quantité initiale");
            }
        }

        // 6. Mettre à jour le besoin
        besoin.setQuantiteLivre(besoin.getQuantiteLivre() + difference);
        besoin.setQuantiteRestante(besoin.getQuantiteRestante() - difference);

        if (besoin.getQuantiteRestante() == 0) {
            besoin.setStatut(StatutBesoin.LIVRE_COMPLET);
        } else {
            besoin.setStatut(StatutBesoin.LIVRE_PARTIEL);
        }

        // 7. Mettre à jour le stock
        epi.setQuantite_en_stock(epi.getQuantite_en_stock() - difference);

        // 8. Mettre à jour la livraison
        livraison.setQuantiteLivree(nouvelleQuantite);
        livraison.setDateLivraison(LocalDateTime.now());

        // 9. Mettre à jour le statut de la demande
        mettreAJourStatutDemande(livraison.getDemandeEpi());

        // 10. Sauvegarder les modifications
        epiRepository.save(epi);
        besoinRepository.save(besoin);
        Livraison updatedLivraison = livraisonRepository.save(livraison);

        log.info("Quantité de livraison mise à jour - ID: {}, Ancienne: {}, Nouvelle: {}, Différence: {}",
                id, ancienneQuantite, nouvelleQuantite, difference);

        return updatedLivraison;
    }

    @Transactional
    public Livraison mettreAJourLivraison(Long id, LivraisonDto updateDto) {
        log.info("Mise à jour complète de la livraison ID: {}", id);

        Livraison livraison = livraisonRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> {
                    log.error("Livraison non trouvée avec l'id: {}", id);
                    return new IllegalArgumentException("Livraison non trouvée");
                });

        // Récupérer les entités liées
        Besoin besoin = besoinRepository.findByDemandeEPIAndEpi(livraison.getDemandeEpi(), livraison.getEpi())
                .orElseThrow(() -> {
                    log.error("Besoin non trouvé pour la livraison {}", id);
                    return new IllegalArgumentException("Besoin associé non trouvé");
                });

        Epi epi = livraison.getEpi();

        // 1. Annuler l'effet de la livraison précédente
        int ancienneQuantite = livraison.getQuantiteLivree();
        besoin.annulerLivraison(ancienneQuantite);
        epi.ajouterStock(ancienneQuantite);

        // 2. Appliquer la nouvelle quantité
        int nouvelleQuantite = updateDto.getQuantite();

        // Vérifier la quantité
        if (nouvelleQuantite > besoin.getQuantiteRestante()) {
            log.warn("Tentative de modifier la livraison avec quantité supérieure au besoin restant: demandé={}, disponible={}",
                    nouvelleQuantite, besoin.getQuantiteRestante());
            throw new IllegalArgumentException("Nouvelle quantité supérieure au besoin restant");
        }

        // Vérifier le stock
        if (epi.getQuantite_en_stock() < nouvelleQuantite) {
            log.error("Stock insuffisant pour la mise à jour: stock={}, demande={}",
                    epi.getQuantite_en_stock(), nouvelleQuantite);
            String message = "Stock insuffisant pour l'EPI " + epi.getNom() +
                    ". Disponible: " + epi.getQuantite_en_stock() +
                    ", Demandé: " + nouvelleQuantite;
            throw new StockInsuffisantException(message, epi);
        }

        // Vérifier le seuil d'alerte après mise à jour
        int stockApresMAJ = epi.getQuantite_en_stock() - nouvelleQuantite;
        if (stockApresMAJ <= epi.getSeuil_alerte()) {
            String message = "Le stock de l'EPI " + epi.getNom() +
                    " atteindra le seuil d'alerte (" + epi.getSeuil_alerte() +
                    ") après cette mise à jour";
            throw new SeuilAlerteAtteintException(message, epi);
        }

        // Mettre à jour la livraison
        livraison.setQuantiteLivree(nouvelleQuantite);
        livraison.setDateLivraison(LocalDateTime.now());

        // Mettre à jour le besoin
        besoin.marquerCommeLivre(nouvelleQuantite);

        // Mettre à jour le stock
        epi.retirerStock(nouvelleQuantite);

        // Sauvegarder les modifications
        epiRepository.save(epi);
        besoinRepository.save(besoin);
        Livraison updatedLivraison = livraisonRepository.save(livraison);

        // Mettre à jour le statut de la demande
        mettreAJourStatutDemande(livraison.getDemandeEpi());

        log.info("Livraison mise à jour - Quantité: {}, Restant: {}",
                nouvelleQuantite, besoin.getQuantiteRestante());

        return updatedLivraison;
    }

    @Transactional
    public void supprimerLivraison(Long id) {
        log.info("Suppression de la livraison ID: {}", id);

        Livraison livraison = livraisonRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> {
                    log.error("Livraison non trouvée avec l'id: {}", id);
                    return new IllegalArgumentException("Livraison non trouvée");
                });

        // Récupérer les entités liées
        Besoin besoin = besoinRepository.findByDemandeEPIAndEpi(livraison.getDemandeEpi(), livraison.getEpi())
                .orElseThrow(() -> {
                    log.error("Besoin non trouvé pour la livraison {}", id);
                    return new IllegalArgumentException("Besoin associé non trouvé");
                });

        Epi epi = livraison.getEpi();

        // Annuler l'effet de la livraison
        int quantiteLivree = livraison.getQuantiteLivree();
        besoin.annulerLivraison(quantiteLivree);
        epi.ajouterStock(quantiteLivree);

        // Sauvegarder les modifications
        epiRepository.save(epi);
        besoinRepository.save(besoin);

        // Supprimer la livraison
        livraisonRepository.delete(livraison);

        // Mettre à jour le statut de la demande
        mettreAJourStatutDemande(livraison.getDemandeEpi());

        log.info("Livraison supprimée - Quantité restituée: {}, Restant: {}",
                quantiteLivree, besoin.getQuantiteRestante());
    }

    public List<Livraison> obtenirToutesLivraisons() {
        log.debug("Récupération de toutes les livraisons");
        return livraisonRepository.findAll();
    }

    public Optional<Livraison> obtenirLivraisonParId(Long id) {
        log.debug("Récupération de la livraison par id: {}", id);
        return livraisonRepository.findById(Math.toIntExact(id));
    }

    public List<Livraison> obtenirLivraisonsParDemande(Long demandeId) {
        log.debug("Récupération des livraisons pour la demande ID: {}", demandeId);
        DemandeEpi demande = demandeEpiRepository.findById(demandeId)
                .orElseThrow(() -> {
                    log.error("Demande non trouvée avec l'id: {}", demandeId);
                    return new IllegalArgumentException("Demande non trouvée");
                });
        return livraisonRepository.findByDemandeEpi(demande);
    }
}