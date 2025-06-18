package com.example.gestion_des_epi.gestion_epi.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateQuantiteDto {

    @NotNull(message = "L'ID EPI est obligatoire")
    private Long epiId;

    @NotNull(message = "L'ID Poste est obligatoire")
    private Long posteId;

    @Min(value = 2000, message = "L'année doit être >= 2000")
    @Max(value = 2100, message = "L'année doit être <= 2100")
    private int annee;

    @Min(value = 1, message = "La quantité doit être au moins 1")
    private int quantite;

    // Getters et Setters
    public Long getEpiId() {
        return epiId;
    }

    public void setEpiId(Long epiId) {
        this.epiId = epiId;
    }

    public Long getPosteId() {
        return posteId;
    }

    public void setPosteId(Long posteId) {
        this.posteId = posteId;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
