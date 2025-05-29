package com.example.gestion_des_epi.gestion_epi.service;


import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import static javax.swing.text.html.HTML.Tag.U;

@Service
public class DemandeEpiService {
    private DemandeEpiRepository demandeEpiRepository;
    private EpiRepository epiRepository;
    private UtilisateurRepository utilisateurRepository;

//    public String  Demande(DemandeEpiDto demandeEpiDto) {
//
//
//        this.demandeEpiRepository.save(demandeEpiDto)
////       this.demandeEpiRepository.save(demandeEpiDto);
//        return "la demande a ete bien effectué";
//    }
}
