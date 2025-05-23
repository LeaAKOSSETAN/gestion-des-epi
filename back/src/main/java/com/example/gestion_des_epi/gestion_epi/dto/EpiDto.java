package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;

@Data

public class EpiDto {

    private int id;

    private String nom;
    private int quantite_en_stock;
    private int seuil_alerte;
}
