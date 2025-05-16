package com.example.gestion_des_epi.gestion_epi.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
@Table(name= "departements")
public class Departement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int codeDep;
    private String nom;

    public Departement() {
    }

    public Departement(int id, int codeDep, String nom) {
        this.id = id;
        this.codeDep = codeDep;
        this.nom = nom;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCode() {
        return codeDep;
    }

    public void setCode(int codeDep) {
        this.codeDep = codeDep;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

}
