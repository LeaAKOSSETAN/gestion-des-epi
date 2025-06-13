package com.example.gestion_des_epi.gestion_epi.dto;

import com.example.gestion_des_epi.gestion_epi.enume.StatutBesoin;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Builder
@Data

public class BesoinResponseDto {

    private Long id;
    private String epiNom;
    private Integer quantite;
    private Integer quantiteLivre;
    private StatutBesoin statut;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    // Informations minimales de la demande
    private String demandeReference;
}
