package com.example.gestion_des_epi.gestion_epi.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class LivraisonDto {
    // Pour les livraisons multiples
    private List<LivraisonItemDto> items;

    // Pour les livraisons simples (alternative)
    private Long besoinId;
    private Long EpiId;
    private Integer quantite;

    // Optionnel pour validation des livraisons multiples
    private Long demandeId;

    // Classe pour les items de livraison multiple
    @Data
    public static class LivraisonItemDto {
        @NotNull(message = "L'ID du besoin est obligatoire")
        private Long besoinId;

        @NotNull(message = "La quantité est obligatoire")
        @Min(value = 1, message = "La quantité doit être au moins 1")
        private Integer quantite;
    }
}