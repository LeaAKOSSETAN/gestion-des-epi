package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;

@Data
public class LivraisonDto {
    private String demandeur; // id de la demande EPI liée
    private Integer quantite;
    private String Epinom;
}
