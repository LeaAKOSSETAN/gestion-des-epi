package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.PosteDto;
import com.example.gestion_des_epi.gestion_epi.model.Departement;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.repository.DepartementRepository;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PosteService {

    private  DepartementRepository departementRepository;
    private PosteRepository posteRepository;
    public PosteService(DepartementRepository departementRepository, PosteRepository posteRepository) {
        this.departementRepository = departementRepository;
        this.posteRepository = posteRepository;

    }

    public void creer(PosteDto posteDto) {
        Departement departement= departementRepository.findById(posteDto.getDepartement()).orElse(null);

        Poste poste=new Poste();
        poste.setNom(posteDto.getNom());
        poste.setDepartement_id(departement);
        posteRepository.save(poste);
    }

    public List<Poste> Liste() {
        return posteRepository.findAll();

    }

    public String Modifier(int id, PosteDto postedto) {
        Departement departement = departementRepository.findById(postedto.getDepartement()).orElse(null);
        Poste poste = posteRepository.findById((long) id).orElse(null);

        if (poste == null) return "Utilisateur introuvable";

        poste.setNom(postedto.getNom());
        poste.setDepartement_id(departement);
        posteRepository.save(poste);
        return "poste  a ete bien modifier";
    }

    public String Delete(int id) {
        this.posteRepository.deleteById((long) id);
        return "departement supprimé";
    }
}