package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.repository.DepartementRepository;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;
import org.springframework.stereotype.Service;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import java.util.*;

@Service
public class PosteService {

    private PosteRepository posteRepository;
    private DepartementRepository departementRepository;

    public Optional<Poste> afficherPostesParDepartement (String nom){
        return posteRepository.findByDepartement(nom);
    }
}

