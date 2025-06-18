package com.example.gestion_des_epi.gestion_epi.dto;

// ApprovisionnementEpiDTO.java

import lombok.Data;

import java.util.Date;

import com.example.gestion_des_epi.gestion_epi.model.ApprovisionnementEpi;


@Data
public class ApprovisionnementEpiDto {
    
    private Long id;
    private int quantite;
    private Date dateApprovisionnement;
    private Long epiId;
    private String epiNom;
    
    // Getters et setters
    
    public static ApprovisionnementEpiDto fromEntity(ApprovisionnementEpi approvisionnement) {
        ApprovisionnementEpiDto dto = new ApprovisionnementEpiDto();
        dto.setId(approvisionnement.getId());
        dto.setQuantite(approvisionnement.getQuantite());
        dto.setDateApprovisionnement(approvisionnement.getDate());
        dto.setEpiId(Long.valueOf(approvisionnement.getEpi().getId()));
        dto.setEpiNom(approvisionnement.getEpi().getNom());
        return dto;
    }
}

