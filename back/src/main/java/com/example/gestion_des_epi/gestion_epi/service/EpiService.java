package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.EpiDto;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EpiService {
    @Autowired
    private EpiRepository epiRepository;

    public String Add(EpiDto epiDto) {

        Epi epi = new Epi();
        epi.setNom(epiDto.getNom());
        epi.setQuantite_en_stock(epiDto.getQuantite_en_stock());
        epi.setSeuil_alerte(epiDto.getSeuil_alerte());
        epiRepository.save(epi);
        return "epi a ete bien ajouter";

    }

    public List<Epi> Liste() {
        return epiRepository.findAll();

    }

    public String Modifier(int id, EpiDto epi) {
        Epi epi1= epiRepository.findById((long) id).orElse(null);
        if(epi1 != null) {
            epi1.setNom(epi.getNom());
            epi1.setSeuil_alerte(epi.getSeuil_alerte());
            epi1.setQuantite_en_stock(epi.getQuantite_en_stock());
            epiRepository.save(epi1);



        }
        return "epi été bien  modifier ";
    }
}
