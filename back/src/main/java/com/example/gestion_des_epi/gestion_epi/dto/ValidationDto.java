package com.example.gestion_des_epi.gestion_epi.dto;
import jakarta.validation.constraints.NotNull;

import lombok.Data;
@Data
public class ValidationDto {

    @NotNull
    private Boolean estValide;

//    @Size(max = 500)
    private String commentaire;

//    @NotNull
//    @Positive
//    private Integer validateurId;
}
