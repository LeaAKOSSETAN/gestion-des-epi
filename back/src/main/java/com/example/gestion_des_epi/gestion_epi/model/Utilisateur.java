package com.example.gestion_des_epi.gestion_epi.model;

import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;

import jakarta.persistence.*;

@Entity
@Table(name= "utilisateurs")
public class Utilisateur {
    private int id;
    private String nom;
    private String email;
    private String mot_de_passe;
    private TypeCompte typeCompte;
    private Boolean statut;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Poste postes;

    public Utilisateur() {
    }

    public Utilisateur(int id, String nom, String email, String mot_de_passe, TypeCompte typeCompte, Boolean statut,
            Poste postes) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.mot_de_passe = mot_de_passe;
        this.typeCompte = typeCompte;
        this.statut = statut;
        this.postes = postes;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMot_de_passe() {
        return mot_de_passe;
    }

    public void setMot_de_passe(String mot_de_passe) {
        this.mot_de_passe = mot_de_passe;
    }

    public TypeCompte getTypeCompte() {
        return typeCompte;
    }

    public void setTypeCompte(TypeCompte typeCompte) {
        this.typeCompte = typeCompte;
    }

    public Boolean getStatut() {
        return statut;
    }

    public void setStatut(Boolean statut) {
        this.statut = statut;
    }

    public Poste getPostes_id() {
        return postes;
    }

    public void setPostes_id(Poste postes) {
        this.postes = postes;
    }
    
}
