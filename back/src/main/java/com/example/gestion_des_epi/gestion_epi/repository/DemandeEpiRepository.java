package com.example.gestion_des_epi.gestion_epi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DemandeEpiRepository extends JpaRepository<DemandeEpi, Long> {

    // Ajout de la méthode pour charger les besoins avec la demande
    @Query("SELECT d FROM DemandeEpi d LEFT JOIN FETCH d.besoins WHERE d.id = :id")
    Optional<DemandeEpi> findByIdWithBesoins(@Param("id") Long id);
}
