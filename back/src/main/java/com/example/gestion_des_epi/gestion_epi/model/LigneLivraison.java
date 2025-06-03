//package com.example.gestion_des_epi.gestion_epi.model;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//@Entity
//@Table(name = "lignes_livraison")
//@Data
//public class LigneLivraison {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String nomEpi;
//    private int quantiteLivree;
//
//    @ManyToOne
//    @JoinColumn(name = "livraison_id")
//    private Livraison livraison;
//}
//
