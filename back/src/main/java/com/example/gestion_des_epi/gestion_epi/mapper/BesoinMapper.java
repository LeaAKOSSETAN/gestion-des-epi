package com.example.gestion_des_epi.gestion_epi.mapper;

import com.example.gestion_des_epi.gestion_epi.dto.BesoinRequestDto;
import com.example.gestion_des_epi.gestion_epi.dto.BesoinResponseDto;
import com.example.gestion_des_epi.gestion_epi.model.Besoin;
import org.springframework.stereotype.Component;

@Component
public class BesoinMapper {

    public Besoin toEntity(BesoinRequestDto dto) {
        return Besoin.builder()
                .quantite(dto.getQuantite())
                // Note: L'EPI et DemandeEpi doivent être chargés séparément
                .build();
    }

    public BesoinResponseDto toDto(Besoin besoin) {
        return BesoinResponseDto.builder()
                .id(besoin.getId())
                .epiNom(besoin.getEpi() != null ? besoin.getEpi().getNom() : null)
                .quantite(besoin.getQuantite())
                .quantiteLivre(besoin.getQuantiteLivre())
                .statut(besoin.getStatut())
                .dateCreation(besoin.getDateCreation())
                .dateModification(besoin.getDateModification())
                .demandeReference(besoin.getDemandeEPI() != null ? besoin.getDemandeEPI().getReference() : null)
                .build();
    }
}


