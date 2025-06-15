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
import java.util.Optional;

@Service
public class PosteService {

    private final DepartementRepository departementRepository;
    private final PosteRepository posteRepository;
    private static final Logger log = LoggerFactory.getLogger(PosteService.class);

    public PosteService(DepartementRepository departementRepository, PosteRepository posteRepository) {
        this.departementRepository = departementRepository;
        this.posteRepository = posteRepository;
    }

    public String creer(PosteDto posteDto) {
        log.info("Tentative création poste: {}", posteDto.getNom());

        // Vérifier si le poste existe déjà
        Optional<Poste> posteExistant = posteRepository.findByNomIgnoreCase(posteDto.getNom().trim());
        if (posteExistant.isPresent()) {
            log.warn("Tentative de création d'un poste existant: {}", posteDto.getNom());
            return "Un poste avec ce nom existe déjà";
        }

        // Utilisation de long pour l'ID du département
        Departement departement = departementRepository.findById((int) posteDto.getDepartement())
                .orElseThrow(() -> {
                    log.error("Département introuvable ID: {}", posteDto.getDepartement());
                    return new RuntimeException("Département non trouvé");
                });

        Poste poste = new Poste();
        poste.setNom(posteDto.getNom().trim());
        poste.setDepartement_id(departement);

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
        log.info("Tentative modification poste ID: {}", id);

        // Vérifier si un autre poste a déjà ce nom
        Optional<Poste> autrePoste = posteRepository.findByNomIgnoreCase(posteDto.getNom().trim());
        if (autrePoste.isPresent() && !autrePoste.get().getId().equals(id.intValue())) { // Correction ici
            log.warn("Conflit de nom pour le poste ID: {}", id);
            return "Un autre poste avec ce nom existe déjà";
        }

        // Conversion de Long en Integer
        Poste poste = posteRepository.findById(id.intValue())
                .orElseThrow(() -> {
                    log.error("Poste introuvable ID: {}", id);
                    return new RuntimeException("Poste introuvable");
                });

        // Utilisation de long pour l'ID du département
        Departement departement = departementRepository.findById((int) posteDto.getDepartement())
                .orElseThrow(() -> {
                    log.error("Département introuvable ID: {}", posteDto.getDepartement());
                    return new RuntimeException("Département non trouvé");
                });

        poste.setNom(posteDto.getNom().trim());
        poste.setDepartement_id(departement);

        posteRepository.save(poste);
        log.info("Poste ID: {} modifié avec succès", id);

        return "Poste modifié avec succès";
    }

    public String delete(Long id) {
        log.info("Tentative suppression poste ID: {}", id);

        // Vérification d'existence avec le bon type
        boolean exists = posteRepository.existsById(id.intValue());
        if (!exists) { // Correction: appliquer ! à un booléen, pas à un int
            log.error("Poste introuvable ID: {}", id);
            return "Poste introuvable";
        }

        posteRepository.deleteById(id.intValue());
        log.info("Poste ID: {} supprimé avec succès", id);

        return "Poste supprimé avec succès";
    }
}