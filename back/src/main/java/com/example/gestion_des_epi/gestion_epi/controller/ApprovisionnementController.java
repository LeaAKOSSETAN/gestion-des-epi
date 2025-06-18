package com.example.gestion_des_epi.gestion_epi.controller;

// ApprovisionnementController.java

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestion_des_epi.gestion_epi.dto.ApprovisionnementEpiDto;
import com.example.gestion_des_epi.gestion_epi.dto.ApprovisionnementRequestDto;
import com.example.gestion_des_epi.gestion_epi.service.ApprovisionnementService;

@RestController
@RequestMapping("/approvisionnements")
public class ApprovisionnementController {
    private final ApprovisionnementService approvisionnementService;
    
    public ApprovisionnementController(ApprovisionnementService approvisionnementService) {
        this.approvisionnementService = approvisionnementService;
    }
    
    @GetMapping
    public ResponseEntity<List<ApprovisionnementEpiDto>> getAllApprovisionnements() {
        return ResponseEntity.ok(approvisionnementService.getAllApprovisionnements());
    }
    
    @PostMapping
    public ResponseEntity<ApprovisionnementEpiDto> createApprovisionnement(
            @RequestBody ApprovisionnementRequestDto requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(approvisionnementService.createApprovisionnement(requestDTO));
    }
    
    @GetMapping("/epi/{epiId}")
    public ResponseEntity<List<ApprovisionnementEpiDto>> getByEpi(@PathVariable Long epiId) {
        return ResponseEntity.ok(approvisionnementService.getApprovisionnementsByEpi(epiId));
    }
}
