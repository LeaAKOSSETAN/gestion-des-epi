package com.example.gestion_des_epi.gestion_epi.repository;

import java.util.Optional;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<user, Long> {
    Optional<Utilisateur> findByEmail(String email);

}
