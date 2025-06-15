package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lignes_livraison")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class LigneLivraison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantiteLivree;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livraison_id", nullable = false)
    @ToString.Exclude
    private Livraison livraison;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "besoin_id", nullable = false)
    @ToString.Exclude
    private Besoin besoin;

    @PrePersist
    public void prePersist() {
        if (quantiteLivree == null || quantiteLivree <= 0) {
            throw new IllegalArgumentException("La quantité livrée doit être positive");
        }
    }
}