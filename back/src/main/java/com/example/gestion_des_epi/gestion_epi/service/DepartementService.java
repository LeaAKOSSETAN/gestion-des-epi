package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.DepartementDto;
import com.example.gestion_des_epi.gestion_epi.model.Departement;
import com.example.gestion_des_epi.gestion_epi.repository.DepartementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartementService {

    private DepartementRepository departementRepository;

    public DepartementService(DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
    }

    public void creer(DepartementDto departementtDto) {
        Departement departement1 =new Departement();
        departement1.setId(departementtDto.getId());
        departement1.setNom(departementtDto.getNom());
        departement1.setCodeDep(departementtDto.getCode());


        departementRepository.save(departement1);
    }

    public List<Departement> Liste() {
        return departementRepository.findAll();
    }

    public String Modifier(int id, DepartementDto departementDto) {

        Departement departement1= departementRepository.findById((long) id).orElse(null);
        if (departement1 != null) {
            departement1.setNom(departementDto.getNom());
            departement1.setCodeDep(departementDto.getCode());

            departementRepository.save(departement1);}
        return "Departement modifier avec succes";

    }

    public String Delete(int id) {
        this.departementRepository.deleteById((long) id);
        return "Departement supprime avec succes";
    }
}