package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.DemandeEpiDto;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.service.DemandeEpiService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@AllArgsConstructor
@RestController
@RequestMapping(path = "demande", produces = APPLICATION_JSON_VALUE)
public class DemandeEpiController {


//    private DemandeEpiService demandeEpiService;

//    @PostMapping
//    public void FaireDemande(@RequestBody DemandeEpiDto demandeEpi){
//        this.demandeEpiService.Demande(demandeEpi);
//    }
//
}
