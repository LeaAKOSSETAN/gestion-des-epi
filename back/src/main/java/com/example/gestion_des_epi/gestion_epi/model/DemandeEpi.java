package com.example.gestion_des_epi.gestion_epi.model;

import java.util.Date;

import com.example.gestion_des_epi.gestion_epi.enume.StatutValidition;
import com.example.gestion_des_epi.gestion_epi.enume.StatutLivraison;


import jakarta.persistence.*;

@Entity
@Table(name= "demandes_epis")
public class DemandeEpi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date_demande;
    private int quantite;
    private StatutValidition Statut_validition;
    private StatutLivraison statut_livraison;

    public DemandeEpi() {
    }

    public DemandeEpi(int id, Date date_demande, int quantite, StatutValidition statut_validition,
            StatutLivraison statut_livraison) {
        this.id = id;
        this.date_demande = date_demande;
        this.quantite = quantite;
        Statut_validition = statut_validition;
        this.statut_livraison = statut_livraison;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate_demande() {
        return date_demande;
    }

    public void setDate_demande(Date date_demande) {
        this.date_demande = date_demande;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public StatutValidition getStatut_validition() {
        return Statut_validition;
    }

    public void setStatut_validition(StatutValidition statut_validition) {
        Statut_validition = statut_validition;
    }

    public StatutLivraison getStatut_livraison() {
        return statut_livraison;
    }

    public void setStatut_livraison(StatutLivraison statut_livraison) {
        this.statut_livraison = statut_livraison;
    }  
}