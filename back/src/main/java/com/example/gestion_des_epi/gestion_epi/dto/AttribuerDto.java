package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;


@Data
public class AttribuerDto {


     private Long epiId;
    private String epiNom;
    private Long posteId;
    private String posteNom;
    private int quantite;
    private int annee;
}
