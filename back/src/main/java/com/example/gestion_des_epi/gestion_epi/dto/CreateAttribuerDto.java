package com.example.gestion_des_epi.gestion_epi.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateAttribuerDto {


        @NotNull
    private Long epiId;
    
    @NotNull
    private Long posteId;
    
    @Min(1)
    private int quantite;
    
    @Min(2023)
    private int annee;
}
