package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.PosteDto;
import com.example.gestion_des_epi.gestion_epi.model.Departement;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.repository.DepartementRepository;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PosteService {

    private final DepartementRepository departementRepository;
    private final PosteRepository posteRepository;
    private static final Logger log = (Logger) LoggerFactory.getLogger(UtilisateurService.class);


    public PosteService(DepartementRepository departementRepository, PosteRepository posteRepository) {
        this.departementRepository = departementRepository;
        this.posteRepository = posteRepository;
    }

    public String creer(PosteDto posteDto) {
        log.info("Tentative création poste: {}", posteDto.getNom());
        Departement departement = departementRepository.findById(posteDto.getDepartement())
                .orElseThrow(() -> {
                    log.error("Département introuvable ID: {}", posteDto.getDepartement());
                    return new RuntimeException("Département non trouvé");
                });

        Poste poste = new Poste();
        poste.setNom(posteDto.getNom());
        poste.setDepartement(departement);

        Poste saved = posteRepository.save(poste);
        log.info("Poste créé avec ID: {}", saved.getId());

        return "Poste créé avec succès (ID: " + saved.getId() + ")";
    }

    public List<Poste> liste() {
        List<Poste> postes = posteRepository.findAll();
        log.info("Nombre de postes trouvés: {}", postes.size());
        return postes;
    }



    public String modifier(Long id, PosteDto posteDto) {
        Departement departement = departementRepository.findById(posteDto.getDepartement()).orElse(null);
        if (departement == null) return "Département non trouvé";

        Poste poste = posteRepository.findById(id).orElse(null);
        if (poste == null) return "Poste introuvable";

        poste.setNom(posteDto.getNom());
        poste.setDepartement(departement);

        posteRepository.save(poste);
        return "Poste modifié avec succès";
    }

    public String delete(int id) {
        if (!posteRepository.existsById((long) id)) {
            return "Poste introuvable";
        }
        posteRepository.deleteById((long) id);
        return "Poste supprimé avec succès";
    }
}
