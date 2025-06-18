package com.example.gestion_des_epi.gestion_epi.service;

// ApprovisionnementService.java

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.gestion_des_epi.gestion_epi.dto.ApprovisionnementEpiDto;
import com.example.gestion_des_epi.gestion_epi.dto.ApprovisionnementRequestDto;
import com.example.gestion_des_epi.gestion_epi.exception.NotFoundException;
import com.example.gestion_des_epi.gestion_epi.model.ApprovisionnementEpi;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.repository.ApprovisionnementRepository;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class ApprovisionnementService {
    private final ApprovisionnementRepository approvisionnementRepository;
    private final EpiRepository epiRepository;
    
    public ApprovisionnementService(ApprovisionnementRepository approvisionnementRepository, 
                                  EpiRepository epiRepository) {
        this.approvisionnementRepository = approvisionnementRepository;
        this.epiRepository = epiRepository;
    }
    
    public List<ApprovisionnementEpiDto> getAllApprovisionnements() {
        return approvisionnementRepository.findAll().stream()
            .map(ApprovisionnementEpiDto::fromEntity)
            .collect(Collectors.toList());
    }
    
     
    public ApprovisionnementEpiDto createApprovisionnement(ApprovisionnementRequestDto requestDTO) {
        Epi epi = epiRepository.findById(requestDTO.getEpiId().intValue())
            .orElseThrow(() -> new NotFoundException("EPI non trouvé"));
        
        ApprovisionnementEpi approvisionnement = new ApprovisionnementEpi();
        approvisionnement.setQuantite(requestDTO.getQuantite());
        approvisionnement.setDate(new Date());
        approvisionnement.setEpi(epi);
        
        // Mise à jour du stock
        epi.ajouterStock(requestDTO.getQuantite());
        epiRepository.save(epi);
        approvisionnement.setEpi(epi);
        ApprovisionnementEpi savedApprovisionnement = approvisionnementRepository.save(approvisionnement);
        return ApprovisionnementEpiDto.fromEntity(savedApprovisionnement);
    }
    
    public List<ApprovisionnementEpiDto> getApprovisionnementsByEpi(Long epiId) {
        return approvisionnementRepository.findByEpiId(epiId).stream()
            .map(ApprovisionnementEpiDto::fromEntity)
            .collect(Collectors.toList());
    }
}