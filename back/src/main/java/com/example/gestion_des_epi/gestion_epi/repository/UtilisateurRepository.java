package com.example.gestion_des_epi.gestion_epi.repository;

import java.util.Optional;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<user, Long> {
    Optional<Utilisateur> findByUsername(String username);

}

