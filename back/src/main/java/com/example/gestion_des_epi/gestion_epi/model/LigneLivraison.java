package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lignes_livraison")
@Data
public class LigneLivraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantiteLivree;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "besoin_id")
    private Besoin besoin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livraison_id")
    private Livraison livraison;
}