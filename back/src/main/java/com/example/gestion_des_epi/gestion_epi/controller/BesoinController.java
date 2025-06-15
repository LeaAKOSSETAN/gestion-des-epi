package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.BesoinRequestDto;
import com.example.gestion_des_epi.gestion_epi.dto.BesoinResponseDto;
import com.example.gestion_des_epi.gestion_epi.mapper.BesoinMapper;
import com.example.gestion_des_epi.gestion_epi.model.Besoin;
import com.example.gestion_des_epi.gestion_epi.service.BesoinService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/besoins")
@AllArgsConstructor
public class BesoinController {
    private static final Logger logger = LoggerFactory.getLogger(BesoinController.class);
    private final BesoinMapper besoinMapper;
    private final BesoinService besoinService;

    @PostMapping
    public ResponseEntity<BesoinResponseDto> createBesoin(
            @Valid @RequestBody BesoinRequestDto besoinDto) {

        logger.info("Tentative de création d'un besoin - EPI: {}, Quantité: {}, DemandeID: {}",
                besoinDto.getEpiNom(), besoinDto.getQuantite(), besoinDto.getDemandeEpiId());

        try {
            Besoin besoin = besoinService.createBesoin(besoinDto);
            logger.info("Besoin créé avec succès - ID: {}", besoin.getId());
            return ResponseEntity.ok(besoinMapper.toDto(besoin));
        } catch (Exception e) {
            logger.error("Erreur lors de la création du besoin", e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BesoinResponseDto> getBesoin(@PathVariable Long id) {
        logger.debug("Tentative de récupération du besoin ID: {}", id);
        Besoin besoin = besoinService.findById(id);
        logger.info("Besoin trouvé - ID: {}", id);
        return ResponseEntity.ok(besoinMapper.toDto(besoin));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Besoin> updateBesoin(@PathVariable Long id, @RequestBody BesoinRequestDto besoinRequestDto) {
        Besoin besoin = besoinService.updateBesoin(id, besoinRequestDto);
        return ResponseEntity.ok(besoin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBesoin(@PathVariable Long id) {
        besoinService.deleteBesoin(id);
        return ResponseEntity.noContent().build();
    }
}