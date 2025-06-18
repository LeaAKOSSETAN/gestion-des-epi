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

@Service
@Transactional
@RequiredArgsConstructor
public class AttribuerService {

    private final AttribuerRepository attribuerRepository;
    private final EpiRepository epiRepository;
    private final PosteRepository posteRepository;
    private final AttribuerMapper attribuerMapper;

    public AttribuerDto createAttribution(CreateAttribuerDto dto) {
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

        return attribuerMapper.toDto(savedAttribuer);
    }

    public List<AttribuerDto> getAttributionsByPoste(Long posteId) {
        return attribuerRepository.findByPosteId(posteId).stream()
                .map(attribuerMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<AttribuerDto> getAttributionsByEpi(Long epiId) {
        return attribuerRepository.findByEpiId(epiId).stream()
                .map(attribuerMapper::toDto)
                .collect(Collectors.toList());
    }

    public AttribuerDto updateQuantite(Long epiId, Long posteId, int annee, int nouvelleQuantite) {
        Attribuer.AttribuerId id = new Attribuer.AttribuerId();
        id.setEpiId(epiId);
        id.setPosteId(posteId);

        Attribuer attribuer = attribuerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                String.format("Attribution non trouvée pour EPI ID: %d et Poste ID: %d", epiId, posteId)));

        // Vérification de l'année
        if (attribuer.getAnnee() != annee) {
            throw new IllegalStateException("L'année ne correspond pas à l'attribution existante");
        }

        attribuer.setQuantite(nouvelleQuantite);
        Attribuer updatedAttribuer = attribuerRepository.save(attribuer);

        return attribuerMapper.toDto(updatedAttribuer);
    }

    @Transactional
    public AttribuerDto updateQuantite(UpdateQuantiteDto dto) {
        // Création de l'ID composite
        Attribuer.AttribuerId id = new Attribuer.AttribuerId();
        id.setEpiId(dto.getEpiId());
        id.setPosteId(dto.getPosteId());

        // Récupération de l'attribution existante
        Attribuer attribuer = ((Optional<Attribuer>) attribuerRepository.findById(id))
                .orElseThrow(() -> new EntityNotFoundException(
                String.format("Attribution non trouvée pour EPI ID: %d et Poste ID: %d",
                        dto.getEpiId(), dto.getPosteId())));

        // Vérification de l'année
        if (attribuer.getAnnee() != dto.getAnnee()) {
            throw new IllegalStateException(
                    "L'année ne correspond pas à l'attribution existante");
        }

        // Mise à jour de la quantité
        attribuer.setQuantite(dto.getQuantite());

        // Sauvegarde
        Attribuer updatedAttribuer = attribuerRepository.save(attribuer);

        // Conversion en DTO
        return attribuerMapper.toDto(updatedAttribuer);
    }

    public void deleteAttribution(Long epiId, Long posteId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
