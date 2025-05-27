package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Poste;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PosteRepository  extends JpaRepository<Poste, Long> {
        
    @Query("SELECT d FROM Departement d WHERE d.nom = :nom")
    Optional<Poste> findByDepartement(@Param("nom") String nom);
}


