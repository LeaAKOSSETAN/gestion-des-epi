package com.example.gestion_des_epi.gestion_epi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.gestion_des_epi.gestion_epi.dto.AttribuerDto;
import com.example.gestion_des_epi.gestion_epi.dto.CreateAttribuerDto;
import com.example.gestion_des_epi.gestion_epi.dto.UpdateQuantiteDto;
import com.example.gestion_des_epi.gestion_epi.mapper.AttribuerMapper;
import com.example.gestion_des_epi.gestion_epi.model.Attribuer;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.repository.AttribuerRepository;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AttribuerService {

    private final AttribuerRepository attribuerRepository;
    private final EpiRepository epiRepository;
    private final PosteRepository posteRepository;
    private final AttribuerMapper attribuerMapper;

    public AttribuerDto createAttribution(CreateAttribuerDto dto) {
        log.info("Création d'une nouvelle attribution - EPI: {}, Poste: {}, Année: {}", 
                dto.getEpiId(), dto.getPosteId(), dto.getAnnee());

        // Vérification de l'existence de l'attribution
        if (attribuerRepository.existsByEpiIdAndPosteIdAndAnnee(
                dto.getEpiId(), dto.getPosteId(), dto.getAnnee())) {
            throw new IllegalStateException("Cette attribution existe déjà pour cette année");
        }

        // Récupération des entités
        Epi epi = epiRepository.findById(dto.getEpiId().intValue())
                .orElseThrow(() -> new EntityNotFoundException("EPI non trouvé avec l'ID: " + dto.getEpiId()));

        Poste poste = posteRepository.findById(dto.getPosteId().intValue())
                .orElseThrow(() -> new EntityNotFoundException("Poste non trouvé avec l'ID: " + dto.getPosteId()));

        // Création de la nouvelle attribution
        Attribuer attribuer = new Attribuer();
        Attribuer.AttribuerId id = new Attribuer.AttribuerId();
        id.setEpiId(dto.getEpiId());
        id.setPosteId(dto.getPosteId());

        attribuer.setId(id);
        attribuer.setEpi(epi);
        attribuer.setPoste(poste);
        attribuer.setQuantite(dto.getQuantite());
        attribuer.setAnnee(dto.getAnnee());

        // Sauvegarde
        Attribuer savedAttribuer = attribuerRepository.save(attribuer);
        log.info("Attribution créée avec succès - ID: {}", savedAttribuer.getId());

        return attribuerMapper.toDto(savedAttribuer);
    }

    public List<AttribuerDto> getAttributionsByPoste(Long posteId) {
        log.info("Récupération des attributions pour le poste ID: {}", posteId);
        return attribuerRepository.findByPosteId(posteId).stream()
                .map(attribuerMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<AttribuerDto> getAttributionsByEpi(Long epiId) {
        log.info("Récupération des attributions pour l'EPI ID: {}", epiId);
        return attribuerRepository.findByEpiId(epiId).stream()
                .map(attribuerMapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<AttribuerDto> getAttributionById(Long epiId, Long posteId) {
        log.info("Récupération de l'attribution - EPI ID: {}, Poste ID: {}", epiId, posteId);
        Attribuer.AttribuerId id = new Attribuer.AttribuerId();
        id.setEpiId(epiId);
        id.setPosteId(posteId);
        
        Optional<Attribuer> attribuerOpt = (Optional<Attribuer>) attribuerRepository.findById(id);
        return attribuerOpt.map(attribuerMapper::toDto);
    }

   @Transactional
public AttribuerDto updateQuantite(UpdateQuantiteDto dto) {
    // Vérification de l'existence de l'attribution
    Attribuer.AttribuerId id = new Attribuer.AttribuerId();
    id.setEpiId(dto.getEpiId());
    id.setPosteId(dto.getPosteId());
    
    Attribuer attribuer = ((Optional<Attribuer>) attribuerRepository.findById(id))
        .orElseThrow(() -> new EntityNotFoundException(
            "Attribution non trouvée pour EPI ID: " + dto.getEpiId() + 
            " et Poste ID: " + dto.getPosteId()));
    
    // Vérification de l'année
    if (attribuer.getAnnee() != dto.getAnnee()) {
        throw new IllegalStateException(
            "L'année ne correspond pas à l'attribution existante");
    }
    
    // Mise à jour
    attribuer.setQuantite(dto.getQuantite());
    attribuer = attribuerRepository.save(attribuer);
    
    return attribuerMapper.toDto(attribuer);
}

    public void deleteAttribution(Long epiId, Long posteId) {
        log.info("Suppression de l'attribution - EPI ID: {}, Poste ID: {}", epiId, posteId);
        Attribuer.AttribuerId id = new Attribuer.AttribuerId();
        id.setEpiId(epiId);
        id.setPosteId(posteId);
        
        if (!attribuerRepository.existsById(id)) {
            throw new EntityNotFoundException(
                String.format("Attribution non trouvée pour EPI ID: %d et Poste ID: %d", epiId, posteId));
        }
        
        attribuerRepository.deleteById(id);
        log.info("Attribution supprimée avec succès");
    }

    public boolean existsAttribution(Long epiId, Long posteId, int annee) {
        return attribuerRepository.existsByEpiIdAndPosteIdAndAnnee(epiId, posteId, annee);
    }
}