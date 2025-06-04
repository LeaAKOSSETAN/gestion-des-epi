package com.example.gestion_des_epi.gestion_epi.model;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name= "livraisons")
@Data
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date_livraison;
    private String livreur;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private DemandeEpi demandeEpi;
}
