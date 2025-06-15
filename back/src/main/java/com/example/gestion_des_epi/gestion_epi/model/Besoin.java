package com.example.gestion_des_epi.gestion_epi.model;

import com.example.gestion_des_epi.gestion_epi.enume.StatutBesoin;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "besoins")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Besoin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer quantite;

    @Column(name = "quantite_livre")
    private Integer quantiteLivre = 0; // Valeur par défaut

    @Column(name = "quantite_restante", nullable = false)
    private Integer quantiteRestante; // Nouveau champ pour la quantité restante

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;

    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    @Enumerated(EnumType.STRING)
    private StatutBesoin statut = StatutBesoin.EN_ATTENTE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demande_epi_id", nullable = false)
    @ToString.Exclude
    @JsonBackReference
    private DemandeEpi demandeEPI;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "epi_id", nullable = false)
    @ToString.Exclude
    private Epi epi;

    // Méthodes de callback JPA
    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
        this.dateModification = LocalDateTime.now();
        this.quantiteLivre = 0;
        this.quantiteRestante = this.quantite; // Initialiser la quantité restante
    }

    @PreUpdate
    protected void onUpdate() {
        this.dateModification = LocalDateTime.now();
    }

    // Méthode métier pour marquer comme livré
    public void marquerCommeLivre(int quantiteLivree) {
        if (quantiteLivree <= 0) {
            throw new IllegalArgumentException("La quantité livrée doit être positive");
        }
        if (quantiteLivree > this.quantiteRestante) {
            throw new IllegalArgumentException("La quantité livrée ne peut pas dépasser la quantité restante");
        }

        this.quantiteLivre += quantiteLivree;
        this.quantiteRestante = this.quantite - this.quantiteLivre;

        if (this.quantiteRestante == 0) {
            this.statut = StatutBesoin.LIVRE_COMPLET;
        } else {
            this.statut = StatutBesoin.LIVRE_PARTIEL;
        }
    }

    // Méthode pour annuler une livraison
    public void annulerLivraison(int quantiteLivree) {
        this.quantiteLivre -= quantiteLivree;
        this.quantiteRestante = this.quantite - this.quantiteLivre;

        if (this.quantiteRestante == this.quantite) {
            this.statut = StatutBesoin.EN_ATTENTE;
        } else if (this.quantiteRestante > 0) {
            this.statut = StatutBesoin.LIVRE_PARTIEL;
        }
    }
}