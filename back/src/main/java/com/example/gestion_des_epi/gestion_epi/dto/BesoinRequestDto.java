package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;


import jakarta.validation.constraints.*;

@Data
public class BesoinRequestDto {

    @NotBlank(message = "Le nom de l'EPI est obligatoire")
    private String epiNom;  // Nom de l'EPI au lieu de l'ID pour une meilleure UX

    @NotNull(message = "La quantité est obligatoire")
    @Positive(message = "La quantité doit être positive")
    private Integer quantite;

    // Si nécessaire pour lier à la demande
   private Long demandeEpiId;
}