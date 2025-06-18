package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.EpiDto;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.gestion_des_epi.gestion_epi.exception.EpiAlreadyExistsException;

@Service
public class EpiService {
    @Autowired
    private EpiRepository epiRepository;
public String Add(EpiDto epiDto) {
    try {
        // Validation des entrées
        if (epiDto.getNom() == null || epiDto.getNom().isBlank()) {
            throw new IllegalArgumentException("Le nom de l'EPI est obligatoire");
        }

        // Vérification existence EPI
        epiRepository.findByNom(epiDto.getNom())
            .ifPresent(epi -> {
                throw new EpiAlreadyExistsException(
                    String.format("L'EPI '%s' existe déjà (ID: %d)", 
                    epi.getNom(), epi.getId())
                );
            });

        // Validation des autres champs
        if (epiDto.getQuantite_en_stock() == null || epiDto.getQuantite_en_stock() < 0) {
            throw new IllegalArgumentException("La quantité doit être un nombre positif");
        }

        if (epiDto.getSeuil_alerte() == null || epiDto.getSeuil_alerte() < 0) {
            throw new IllegalArgumentException("Le seuil d'alerte doit être un nombre positif");
        }

        // Conversion durée de vie
        int duree;
        try {
            duree = Integer.parseInt(epiDto.getDure_de_vie());
            if (duree <= 0) throw new IllegalArgumentException();
        } catch (Exception e) {
            throw new IllegalArgumentException("La durée de vie doit être un nombre entier positif");
        }

        // Création et sauvegarde
        Epi epi = new Epi();
        epi.setNom(epiDto.getNom().trim());
        epi.setQuantite_en_stock(epiDto.getQuantite_en_stock());
        epi.setSeuil_alerte(epiDto.getSeuil_alerte());
        epi.setDureeValidite(duree);

        epiRepository.save(epi);
        return "EPI ajouté avec succès";

    } catch (EpiAlreadyExistsException e) {
        throw e; // Exception spécifique - à traiter dans le controller
    } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException("Données invalides: " + e.getMessage());
    }
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
