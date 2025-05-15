package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;

@Entity
@Table(name= "livraisons")
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
}
//  id integer AUTO_INCREMENT PRIMARY KEY,
//     demande_id integer NOT NULL,
//     date_livraison DATE NOT NULL,
//     livreur VARCHAR(100) NOT NULL,
//     remarque TEXT