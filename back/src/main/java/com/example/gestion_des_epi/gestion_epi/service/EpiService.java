package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.repository.EpiRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EpiService {
    private EpiRepository epiRepository;

    public List<Epi> afficherEpisDispo(){
        return epiRepository.findAll();
    }
}
