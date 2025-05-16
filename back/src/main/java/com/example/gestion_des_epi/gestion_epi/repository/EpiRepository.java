package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Epi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpiRepository extends JpaRepository<Epi, Long> {
}
