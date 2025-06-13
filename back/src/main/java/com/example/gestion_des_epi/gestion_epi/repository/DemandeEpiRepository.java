package com.example.gestion_des_epi.gestion_epi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;

public interface DemandeEpiRepository extends JpaRepository<DemandeEpi, Long> {
}
