package com.example.gestion_des_epi.gestion_epi.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestion_des_epi.gestion_epi.dto.LivraisonDto;
import com.example.gestion_des_epi.gestion_epi.exception.EpiIndisponibleException;
import com.example.gestion_des_epi.gestion_epi.exception.SeuilAlerteAtteintException;
import com.example.gestion_des_epi.gestion_epi.exception.StockInsuffisantException;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.model.Livraison;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import com.example.gestion_des_epi.gestion_epi.service.LivraisonService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/livraisons")
@RequiredArgsConstructor
@Slf4j
public class LivraisonController {

    private final LivraisonService livraisonService;
    private final EpiRepository epiRepository;

    @PostMapping
    public ResponseEntity<?> creerLivraison(@RequestBody LivraisonDto livraisonDto) {
        try {
            log.info("Reçu une nouvelle demande de livraison pour l'EPI: {}", livraisonDto.getEpiId());
            Livraison livraison = livraisonService.traiterLivraison(livraisonDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(livraison);
        } catch (EpiIndisponibleException e) {
            return handleEpiException(e, "EPI indisponible");
        } catch (StockInsuffisantException e) {
            return handleEpiException(e, "Stock insuffisant");
        } catch (SeuilAlerteAtteintException e) {
            return handleEpiException(e, "Seuil d'alerte atteint");
        } catch (IllegalArgumentException e) {
            log.error("Erreur de validation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Validation error", "message", e.getMessage())
            );
        } catch (Exception e) {
            log.error("Erreur lors du traitement de la livraison: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal error", "message", "Une erreur est survenue")
            );
        }
    }

    @PostMapping("/multiple")
    public ResponseEntity<?> creerMultipleLivraisons(@RequestBody LivraisonDto livraisonDto) {
        try {
            log.info("Reçu une demande de livraison multiple pour la demande: {}", livraisonDto.getDemandeId());
            List<Livraison> livraisons = livraisonService.traiterLivraisonMultiple(livraisonDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(livraisons);
        } catch (EpiIndisponibleException e) {
            return handleEpiException(e, "EPI indisponible");
        } catch (StockInsuffisantException e) {
            return handleEpiException(e, "Stock insuffisant");
        } catch (SeuilAlerteAtteintException e) {
            return handleEpiException(e, "Seuil d'alerte atteint");
        } catch (IllegalArgumentException e) {
            log.error("Erreur de validation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Validation error", "message", e.getMessage())
            );
        } catch (Exception e) {
            log.error("Erreur lors du traitement de la livraison multiple: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal error", "message", "Une erreur est survenue")
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> mettreAJourLivraison(
            @PathVariable Long id,
            @RequestBody LivraisonDto updateDto) {

        try {
            log.info("Mise à jour complète de la livraison ID: {}", id);
            Livraison updatedLivraison = livraisonService.mettreAJourLivraison(id, updateDto);
            return ResponseEntity.ok(updatedLivraison);
        } catch (EpiIndisponibleException e) {
            return handleEpiException(e, "EPI indisponible");
        } catch (StockInsuffisantException e) {
            return handleEpiException(e, "Stock insuffisant");
        } catch (SeuilAlerteAtteintException e) {
            return handleEpiException(e, "Seuil d'alerte atteint");
        } catch (IllegalArgumentException e) {
            log.error("Erreur de validation lors de la mise à jour: {}", e.getMessage());
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Validation error", "message", e.getMessage())
            );
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de la livraison: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal error", "message", "Une erreur est survenue")
            );
        }
    }

    @PatchMapping("/{id}/quantite")
    public ResponseEntity<?> mettreAJourQuantiteLivraison(
            @PathVariable Long id,
            @RequestParam("valeur") int nouvelleQuantite) {

        try {
            Livraison updatedLivraison = livraisonService.mettreAJourQuantiteLivraison(id, nouvelleQuantite);
            return ResponseEntity.ok(updatedLivraison);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Erreur interne du serveur"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerLivraison(@PathVariable Long id) {
        try {
            log.info("Suppression de la livraison ID: {}", id);
            livraisonService.supprimerLivraison(id);
            return ResponseEntity.noContent().build();
        } catch (EpiIndisponibleException e) {
            return handleEpiException(e, "EPI indisponible");
        } catch (IllegalArgumentException e) {
            log.error("Erreur lors de la suppression: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Erreur lors de la suppression de la livraison: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal error", "message", "Une erreur est survenue")
            );
        }
    }

    @GetMapping
    public ResponseEntity<List<Livraison>> obtenirToutesLivraisons() {
        log.info("Récupération de toutes les livraisons");
        return ResponseEntity.ok(livraisonService.obtenirToutesLivraisons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenirLivraisonParId(@PathVariable Long id) {
        log.info("Récupération de la livraison par id: {}", id);
        try {
            Optional<Livraison> livraison = livraisonService.obtenirLivraisonParId(id);
            return livraison.map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        log.warn("Livraison non trouvée avec l'id: {}", id);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            log.error("Erreur lors de la récupération: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal error", "message", "Une erreur est survenue")
            );
        }
    }

    @GetMapping("/demande/{demandeId}")
    public ResponseEntity<?> obtenirLivraisonsParDemande(@PathVariable Long demandeId) {
        try {
            log.info("Récupération des livraisons pour la demande ID: {}", demandeId);
            List<Livraison> livraisons = livraisonService.obtenirLivraisonsParDemande(demandeId);
            return ResponseEntity.ok(livraisons);
        } catch (IllegalArgumentException e) {
            log.error("Demande non trouvée: {}", demandeId);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des livraisons: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal error", "message", "Une erreur est survenue")
            );
        }
    }

    private ResponseEntity<Map<String, String>> handleEpiException(RuntimeException e, String errorType) {
        Epi epi = null;
        String message = e.getMessage();

        if (e instanceof EpiIndisponibleException) {
            epi = ((EpiIndisponibleException) e).getEpi();
        } else if (e instanceof StockInsuffisantException) {
            epi = ((StockInsuffisantException) e).getEpi();
        } else if (e instanceof SeuilAlerteAtteintException) {
            epi = ((SeuilAlerteAtteintException) e).getEpi();
        }

        if (epi != null) {
            // Marquer le besoin de réapprovisionnement
            epi.setBesoinReapprovisionnement(true);
            epiRepository.save(epi);
            log.warn("Marqué besoin réapprovisionnement pour EPI: {}", epi.getId());
        }

        log.error("{}: {}", errorType, message);

        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("error", errorType,
                        "message", message,
                        "solution", "Veuillez réapprovisionner cet EPI")
        );
    }

    @PostMapping("/completer/{besoinId}")
    public ResponseEntity<?> completerLivraison(@PathVariable Long besoinId) {
        try {
            log.info("Demande de complétion de livraison pour le besoin ID: {}", besoinId);
            Livraison livraison = livraisonService.completerLivraison(besoinId);
            return ResponseEntity.status(HttpStatus.CREATED).body(livraison);
        } catch (StockInsuffisantException e) {
            return handleEpiException(e, "Stock insuffisant");
        } catch (SeuilAlerteAtteintException e) {
            return handleEpiException(e, "Seuil d'alerte atteint");
        } catch (IllegalArgumentException e) {
            log.error("Erreur de validation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Validation error", "message", e.getMessage())
            );
        } catch (Exception e) {
            log.error("Erreur lors de la complétion de la livraison: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal error", "message", "Une erreur est survenue")
            );
        }
    }
}
