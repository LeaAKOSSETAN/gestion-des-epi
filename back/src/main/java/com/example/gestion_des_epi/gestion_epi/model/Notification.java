package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
@Data
@Entity
@Table
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String message;
    private Date dateEnvoi;
    private String statut; // Champ statut

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "demande_epi_id")
    private DemandeEpi demandeEPI;

  /*  // Constructeur par défaut
    public Notification() {
    }

    // Constructeur avec tous les champs
    public Notification(Long id, String message, Date dateEnvoi, String statut, Utilisateur utilisateur, DemandeEpi demandeEPI) {
        this.id = id;
        this.message = message;
        this.dateEnvoi = dateEnvoi;
        this.statut = statut;
        this.utilisateur = utilisateur;
        this.demandeEPI = demandeEPI;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDateEnvoi() {
        return dateEnvoi;
    }

    public void setDateEnvoi(Date dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public DemandeEpi getDemandeEPI() {
        return demandeEPI;
    }

    public void setDemandeEPI(DemandeEpi demandeEPI) {
        this.demandeEPI = demandeEPI;
    }

   */
}
