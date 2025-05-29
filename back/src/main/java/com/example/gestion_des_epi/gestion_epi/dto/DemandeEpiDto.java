package com.example.gestion_des_epi.gestion_epi.dto;

import com.example.gestion_des_epi.gestion_epi.enume.StatutLivraison;
import com.example.gestion_des_epi.gestion_epi.enume.StatutValidition;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;
@Data
public class DemandeEpiDto {

    private Date date_demande;
    private int quantite;
    private String Statut_validition;
    private String statut_livraison;
//    private int utilisateur;
    private int epi;


}
