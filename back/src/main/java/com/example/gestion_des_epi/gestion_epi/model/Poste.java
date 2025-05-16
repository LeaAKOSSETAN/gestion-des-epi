package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;

@Entity
@Table(name= "postes")
public class Poste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Departement departement_id;
    
    public Poste() {
    }

    public Poste(int id, String nom, Departement departement_id) {
        this.id = id;
        this.nom = nom;
        this.departement_id = departement_id;
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

    public Departement getDepartement_id() {
        return departement_id;
    }

    public void setDepartement_id(Departement departement_id) {
        this.departement_id = departement_id;
    }
}
