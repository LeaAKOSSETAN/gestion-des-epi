package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Besoin;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BesoinRepository extends JpaRepository<Besoin, Integer> {

    Optional<Besoin> findByDemandeEPIAndEpi(DemandeEpi demande, Epi epi);


}
