package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.BesoinRequestDto;
import com.example.gestion_des_epi.gestion_epi.model.Besoin;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.repository.BesoinRepository;
import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class BesoinService {


    private static final Logger logger = LoggerFactory.getLogger(BesoinService.class);
    private final BesoinRepository besoinRepository;
    private final EpiRepository epiRepository;
    private final DemandeEpiRepository demandEpiRepository;
    @Transactional
    public Besoin createBesoin(BesoinRequestDto dto) {
        logger.debug("Début création besoin - EPI: {}, Quantité: {}", dto.getEpiNom(), dto.getQuantite());

        // Trouver l'EPI par nom
        logger.debug("Recherche EPI: {}", dto.getEpiNom());
        Optional<Epi> epiOptional = epiRepository.findByNom(dto.getEpiNom());
        if (epiOptional.isEmpty()) {
            logger.error("EPI non trouvé: {}", dto.getEpiNom());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "EPI non trouvé avec le nom: " + dto.getEpiNom());
        }
        Epi epi = epiOptional.get();
        logger.debug("EPI trouvé - ID: {}", epi.getId());

        // Trouver la demande
        logger.debug("Recherche demande EPI ID: {}", dto.getDemandeEpiId());
        Optional<DemandeEpi> demandeOptional = demandEpiRepository.findById(dto.getDemandeEpiId());
        if (demandeOptional.isEmpty()) {
            logger.error("Demande EPI non trouvée - ID: {}", dto.getDemandeEpiId());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Demande non trouvée avec ID: " + dto.getDemandeEpiId());
        }
        DemandeEpi demande = demandeOptional.get();
        logger.debug("Demande EPI trouvée - ID: {}", demande.getId());

        // Créer le besoin
        logger.debug("Création du besoin...");
        Besoin besoin = Besoin.builder()
                .quantite(dto.getQuantite())
                .epi(epi)
                .demandeEPI(demande)
                .build();

        Besoin savedBesoin = besoinRepository.save(besoin);
        logger.info("Besoin créé avec succès - ID: {}", savedBesoin.getId());

        return savedBesoin;
    }

    public Besoin findById(Long id) {
        logger.debug("Recherche besoin par ID: {}", id);
        return besoinRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> {
                    logger.error("Besoin non trouvé - ID: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Besoin non trouvé avec ID: " + id);
                });
    }
}