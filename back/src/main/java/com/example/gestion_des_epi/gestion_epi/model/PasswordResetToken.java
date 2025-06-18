/*package com.example.gestion_des_epi.gestion_epi.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity

public class PasswordResetToken {

    private static final int EXPIRATION = 24 * 60; // 24 heures en minutes

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    @OneToOne(targetEntity = Utilisateur.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "utilisateur_id")
    private Utilisateur utilisateur;

    private LocalDateTime expiryDate;

    public PasswordResetToken(String token, Utilisateur user) {
        this.token = token;
        this.utilisateur = user;
        this.expiryDate = LocalDateTime.now().plusMinutes(EXPIRATION);
    }
}
*/