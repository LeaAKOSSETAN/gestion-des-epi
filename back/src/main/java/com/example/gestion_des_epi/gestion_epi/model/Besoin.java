package com.example.gestion_des_epi.gestion_epi.model;

import com.example.gestion_des_epi.gestion_epi.enume.StatutBesoin;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;



@Entity
@Table(name = "besoins")
@Data // Génère getters, setters, toString, equals, hashCode
@NoArgsConstructor // Constructeur sans arguments
@AllArgsConstructor // Constructeur avec tous les arguments
@Builder // Pattern builder pour la création d'instances
public class Besoin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer quantite;

    @Column(name = "quantite_livre")
    private Integer quantiteLivre ; // Valeur par défaut

    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;

    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    @Enumerated(EnumType.STRING)
    private StatutBesoin statut = StatutBesoin.EN_ATTENTE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demande_epi_id", nullable = false)
    @ToString.Exclude // Évite la récursion dans toString()
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
        if (quantiteLivree > this.quantite) {
            throw new IllegalArgumentException("La quantité livrée ne peut pas dépasser la quantité demandée");
        }

        this.quantiteLivre = quantiteLivree;
        this.statut = quantiteLivree == this.quantite
                ? StatutBesoin.LIVRE_COMPLET
                : StatutBesoin.LIVRE_PARTIEL;
    }


}