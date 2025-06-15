package com.example.gestion_des_epi.gestion_epi.model;

import java.util.List;
import jakarta.persistence.*;


import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "livraisons")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class Livraison {
    private static final Logger logger = LoggerFactory.getLogger(Livraison.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_livraison")
    private LocalDateTime dateLivraison;

    @OneToMany(mappedBy = "livraison", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LigneLivraison> lignesLivraison = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gestionnaire_id")
    @ToString.Exclude
    private Utilisateur gestionnaire;

    @PrePersist
    public void prePersist() {
        logger.info("Création d'une nouvelle livraison ID: {}", id);
    }

    @PreUpdate
    public void preUpdate() {
        logger.info("Mise à jour de la livraison ID: {}", id);
    }

    public void confirmerLivraison() {
        this.dateLivraison = LocalDateTime.now();
        for (LigneLivraison ligne : lignesLivraison) {
            ligne.getBesoin().marquerCommeLivre(ligne.getQuantiteLivree());
        }
        logger.info("Livraison ID: {} confirmée avec {} lignes", id, lignesLivraison.size());
    }

    public void ajouterLigneLivraison(LigneLivraison ligne) {
        lignesLivraison.add(ligne);
        ligne.setLivraison(this);
        logger.debug("Ligne ajoutée à la livraison ID: {}", id);
    }
}