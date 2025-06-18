/*package com.example.gestion_des_epi.gestion_epi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestion_des_epi.gestion_epi.model.PasswordResetToken;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUtilisateur(Utilisateur utilisateur);

    void deleteByUtilisateur(Utilisateur utilisateur);
    // PasswordResetToken findByToken(String token);

}*/
