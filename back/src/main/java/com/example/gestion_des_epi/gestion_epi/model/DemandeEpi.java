package com.example.gestion_des_epi.gestion_epi.model;

import java.util.Date;

import com.example.gestion_des_epi.gestion_epi.enume.StatutValidition;
import com.example.gestion_des_epi.gestion_epi.enume.StatutLivraison;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name= "demandeEpis")
public class DemandeEpi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date_demande;
    private int quantite;
    private StatutValidition Statut_validition;
    private StatutLivraison statut_livraison;
    
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;
    
    @ManyToOne
    @JoinColumn(name = "epi_id", nullable = false)
    private Epi epi;

   /* public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

   public DemandeEpi() {
    }

    

    public DemandeEpi(int id, Date date_demande, int quantite, StatutValidition statut_validition,
            StatutLivraison statut_livraison, Utilisateur utilisateur, Epi epi) {
        this.id = id;
        this.date_demande = date_demande;
        this.quantite = quantite;
        Statut_validition = statut_validition;
        this.Statut_validition = statut_livraison;
        this.utilisateur = utilisateur;
        this.epi = epi;
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



    public Utilisateur getUtilisateur_id() {
        return utilisateur;
    }



    public void setUtilisateur_id(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }



    public Epi getEpi_id() {
        return epi;
    }



    public void setEpi_id(Epi epi) {
        this.epi = epi;
    }

    
*/

}