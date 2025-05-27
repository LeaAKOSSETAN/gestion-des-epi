package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.model.Departement;
import com.example.gestion_des_epi.gestion_epi.repository.DepartementRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DepartementService {

    private DepartementRepository departementRepository;

        public List<Departement> afficherDepartements(){
        return departementRepository.findAll();
    }
}
