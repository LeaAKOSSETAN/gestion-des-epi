package com.example.gestion_des_epi.gestion_epi.dto;

//import jakarta.validation.constraints.*;
//import javax.validation.constraints.NotNull;
public record DemandeEpiDto(
//        @NotNull(message = "L'ID EPI est obligatoire")
//        @Positive(message = "L'ID EPI doit être positif")
        Integer epiId,

//        @NotNull(message = "La quantité est obligatoire")
//        @Min(value = 1, message = "La quantité minimale est 1")
        Integer quantite,

//        @NotBlank(message = "La justification est obligatoire")
//        @Size(max = 500, message = "La justification ne doit pas dépasser 500 caractères")
        String justification
) {}