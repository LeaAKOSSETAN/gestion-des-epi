package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name= "posteEpis")
@Data
public class PosteEpi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantite;
        
    @ManyToOne
    @JoinColumn(name = "epi_id", nullable = false)
    private Epi epi;
    @ManyToOne
    @JoinColumn(name = "poste_id", nullable = false)
    private Poste poste;

}
