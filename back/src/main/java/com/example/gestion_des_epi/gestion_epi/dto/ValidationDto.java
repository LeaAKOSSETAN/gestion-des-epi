package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;
@Data
public class ValidationDto {

    @NotNull
    private Boolean estValide;

//    @Size(max = 500)
    private String commentaire;

    @NotNull
//    @Positive
    private Integer validateurId;
}
