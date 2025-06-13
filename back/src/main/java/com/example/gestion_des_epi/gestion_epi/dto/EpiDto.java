package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;

@Data

public class EpiDto {

    private int id;

    private String nom;
    private Integer quantite_en_stock;
    private Integer seuil_alerte;
    private  String dure_de_vie;
}
