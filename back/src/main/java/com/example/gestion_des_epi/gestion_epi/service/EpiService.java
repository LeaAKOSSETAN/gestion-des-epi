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

        // Vérifiez que les valeurs ne sont pas null avant de les utiliser
        if (epiDto.getNom() == null) {
            throw new IllegalArgumentException("Le nom de l'EPI ne peut pas être null.");
        }
        epi.setNom(epiDto.getNom());

        if (epiDto.getQuantite_en_stock() == null) {
            throw new IllegalArgumentException("La quantité en stock ne peut pas être null.");
        }
        epi.setQuantite_en_stock(epiDto.getQuantite_en_stock());

        if (epiDto.getSeuil_alerte() == null) {
            throw new IllegalArgumentException("Le seuil d'alerte ne peut pas être null.");
        }
        epi.setSeuil_alerte(epiDto.getSeuil_alerte());

        if (epiDto.getDure_de_vie() == null || !epiDto.getDure_de_vie().matches("\\d+")) {
            throw new IllegalArgumentException("La durée de vie doit être un nombre valide.");
        }

        try {
            epi.setDureeValidite(Integer.parseInt(epiDto.getDure_de_vie()));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("La durée de vie doit être un nombre valide.");
        }

        epiRepository.save(epi);
        return "EPI a été bien ajouté";
    }



    public List<Epi> Liste() {
        return epiRepository.findAll();

    }

    public String Modifier(int id, EpiDto epi) {
        Epi epi1= epiRepository.findById( id).orElse(null);
        if(epi1 != null) {
            epi1.setNom(epi.getNom());
            epi1.setSeuil_alerte(epi.getSeuil_alerte());
            epi1.setQuantite_en_stock(epi.getQuantite_en_stock());
            epi1.setDureeValidite(Integer.parseInt(epi.getDure_de_vie()));
            epiRepository.save(epi1);



        }
        return "epi été bien  modifier ";
    }

    public String delete(int id) {
        if (!epiRepository.existsById( id)) {
            return "epi introuvable";
        }
        epiRepository.deleteById(id);
        return "epi supprimé avec succès";
    }
}
