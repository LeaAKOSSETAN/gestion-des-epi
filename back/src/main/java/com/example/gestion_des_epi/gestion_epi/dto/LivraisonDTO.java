package com.example.gestion_des_epi.gestion_epi.dto;

import lombok.Data;

import java.time.LocalDate;


@Data
public class LivraisonDTO {

  /*  private Date dateLivraison;
    private String livreur;
    private int demandeEpiId;
    private boolean demandeLivree;
*/

    private LocalDate dateLivraison;
    private String livreur;
    private int demandeId;
//    private String employeNom;
    private String epiNom;
}
