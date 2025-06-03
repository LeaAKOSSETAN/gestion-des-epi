package com.example.gestion_des_epi.gestion_epi.model;

import java.sql.Date;

import com.example.gestion_des_epi.gestion_epi.enume.TypeMouvement;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "mouvementStocks")
@Data
public class MouvementStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantite;
    private Date date;
    private TypeMouvement typeMouvement;

    @ManyToOne
    @JoinColumn(name = "epi_id", nullable = false)
    private Epi epi;

    @ManyToOne
    @JoinColumn(name = "demandeEpi_id", nullable = false)
    private DemandeEpi demandeEpi;
}
