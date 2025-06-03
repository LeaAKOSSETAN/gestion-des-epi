package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.DepartementDto;
import com.example.gestion_des_epi.gestion_epi.model.Departement;
import com.example.gestion_des_epi.gestion_epi.repository.DepartementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartementService {

    private DepartementRepository departementRepository;
    private static final Logger logger = LoggerFactory.getLogger(DepartementService.class);


    public DepartementService(DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
    }

    public String creer(DepartementDto departementDto) {
        if (departementRepository.existsByCodeDep(departementDto.getCode())) {
            logger.warn("Département avec le code {} existe déjà", departementDto.getCode());
            return "Département avec ce code existe déjà";
        }

        if (departementRepository.existsByNom(departementDto.getNom())) {
            logger.warn("Département avec le nom {} existe déjà", departementDto.getNom());
            return "Département avec ce nom existe déjà";
        }

        Departement departement = new Departement();
        departement.setNom(departementDto.getNom());
        departement.setCodeDep(departementDto.getCode());

        departementRepository.save(departement);
        logger.info("Département {} créé avec succès", departementDto.getNom());

        return "Département créé avec succès";
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

    public DepartementDto rechercherParCode(String code) {
        Departement departement = departementRepository.findByCodeDep(code)
                .orElseThrow(() -> new RuntimeException("Aucun département trouvé avec ce code : " + code));

        DepartementDto dto = new DepartementDto();
        dto.setId(departement.getId());
        dto.setNom(departement.getNom());
        dto.setCode(departement.getCodeDep());

        return dto;
    }

}