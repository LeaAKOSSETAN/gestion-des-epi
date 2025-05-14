package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;

@Entity
@Table(name= "epis")
public class Epi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private int quantite_en_stock;
    private int seuil_alerte;

    public Epi() {
    }

    public Epi(int id, String nom, int quantite_en_stock, int seuil_alerte) {
        this.id = id;
        this.nom = nom;
        this.quantite_en_stock = quantite_en_stock;
        this.seuil_alerte = seuil_alerte;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getQuantite_en_stock() {
        return quantite_en_stock;
    }

    public void setQuantite_en_stock(int quantite_en_stock) {
        this.quantite_en_stock = quantite_en_stock;
    }

    public int getSeuil_alerte() {
        return seuil_alerte;
    }

    public void setSeuil_alerte(int seuil_alerte) {
        this.seuil_alerte = seuil_alerte;
    }

    
    
    
}
//  id integer AUTO_INCREMENT PRIMARY KEY,
//     nom VARCHAR(100) NOT NULL,
//     quantite_en_stock INT DEFAULT 0,
//     seuil_alerte IN