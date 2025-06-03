//package com.example.gestion_des_epi.gestion_epi.model;
//
//import java.sql.Date;
//import java.util.List;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//@Entity
//@Table(name= "livraisons")
//@Data
//public class Livraison {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//    private Date date_livraison;
//    private String livreur;
//
//    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
//    @JoinColumn(name = "DEMANDE_EPI")
//    private DemandeEpi demandeEpi;
//
//    @OneToMany(mappedBy = "livraison", cascade = CascadeType.ALL)
////    private List<LigneLivraison> lignes;
//}
