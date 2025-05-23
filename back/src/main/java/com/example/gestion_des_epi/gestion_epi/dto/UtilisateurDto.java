package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;

@Data
public class UtilisateurDto {
    private String nom;
    private String email;
    private String motDePasse;
    private String typeCompte;
    private Long poste;
    private boolean status;


}
