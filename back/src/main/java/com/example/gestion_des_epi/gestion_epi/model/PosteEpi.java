package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name= "postes_epis")
@Data
public class PosteEpi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int quantite;
    
    private Epi epis_id;
    private Epi postes_id;

}
