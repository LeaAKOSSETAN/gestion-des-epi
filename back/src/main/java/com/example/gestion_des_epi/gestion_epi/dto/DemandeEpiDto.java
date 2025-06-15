package com.example.gestion_des_epi.gestion_epi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DemandeEpiDto{

    @NotBlank(message = "La justification est obligatoire")
    private String justification;
    @NotNull
    private List<BesoinRequest> besoins;

    @Data
    public static class BesoinRequest {
        @NotBlank
        private String epiNom;

        @Positive
        private Integer quantite;


    }
}