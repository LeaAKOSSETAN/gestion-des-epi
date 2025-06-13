package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "demande_lignes")
@Data
public class DemandeLigne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Utilisez Long au lieu de int pour les identifiants

    private int quantiteDemandee;
    private int quantiteLivree;

    @ManyToOne
    @JoinColumn(name = "epi_id", referencedColumnName = "id")
    private Epi epi;

    @ManyToOne
    @JoinColumn(name = "demande_id", referencedColumnName = "id")
    private DemandeEpi demande;

    // Vérifie si la ligne est complètement livrée
    public boolean isLivree() {
        return quantiteLivree >= quantiteDemandee;
    }
}
