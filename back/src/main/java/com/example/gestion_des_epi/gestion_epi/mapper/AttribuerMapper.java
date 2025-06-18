package com.example.gestion_des_epi.gestion_epi.mapper;

import org.springframework.stereotype.Component;

import com.example.gestion_des_epi.gestion_epi.dto.AttribuerDto;
import com.example.gestion_des_epi.gestion_epi.model.Attribuer;

@Component
public class AttribuerMapper {

    public AttribuerDto toDto(Attribuer attribuer) {
        AttribuerDto dto = new AttribuerDto();
        dto.setEpiId(Long.valueOf(attribuer.getEpi().getId()));
        dto.setEpiNom(attribuer.getEpi().getNom());
        dto.setPosteId(attribuer.getPoste().getId());
        dto.setPosteNom(attribuer.getPoste().getNom());
        dto.setQuantite(attribuer.getQuantite());
        dto.setAnnee(attribuer.getAnnee());
        return dto;
    }
}
