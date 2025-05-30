package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.UtilisateurDto;
import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Service
public class UtilisateurService {

//    @Autowired
    private JavaMailSender mailSender;
    private static final Logger log = (Logger) LoggerFactory.getLogger(UtilisateurService.class);

    private final UtilisateurRepository utilisateurRepository;
    private final PosteRepository posteRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

 /*   public UtilisateurService(UtilisateurRepository utilisateurRepository, PosteRepository posteRepository, BCryptPasswordEncoder bCryptPasswordEncoder ) {
        this.utilisateurRepository = utilisateurRepository;
        this.posteRepository = posteRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }*/

    public String addUtilisateur(UtilisateurDto dto) {

        log.info("Début création utilisateur - Email: {}, TypeCompte: {}");

        try {
            // 1. Vérification du poste
            log.debug("Recherche du poste avec ID: {}", dto.getPoste());
            Poste poste = posteRepository.findById(dto.getPoste())
                    .orElseThrow(() -> {
                        log.error("Poste introuvable - ID: {}", dto.getPoste());
                        return new IllegalArgumentException("Poste non trouvé");
                    });

            // 2. Génération des identifiants
            String username = dto.getEmail().split("@")[0];
            log.debug("Username généré: {}", username);

            String motDePasseGenere = generateRandomPassword(10);
            log.trace("Mot de passe généré (à ne pas logger en production)"); // Seulement pour le debug

            String encodedPassword = bCryptPasswordEncoder.encode(motDePasseGenere);
            log.debug("Mot de passe hashé avec succès");

            // 3. Validation du type de compte
            TypeCompte typeCompte;
            try {
                typeCompte = TypeCompte.valueOf(dto.getTypeCompte());
                log.debug("Type de compte validé: {}", typeCompte);
            } catch (IllegalArgumentException e) {
                log.error("Type de compte invalide: {}", dto.getTypeCompte(), e);
                return "Erreur: Type de compte invalide";
            }

            // 4. Création de l'utilisateur
            Utilisateur user = new Utilisateur();
            user.setUsername(username);
            user.setNom(dto.getNom());
            user.setEmail(dto.getEmail());
            user.setStatut(dto.isStatus());
            user.setTypeCompte(typeCompte);
            user.setMot_de_passe(encodedPassword);
            user.setPostes_id(poste);

            // 5. Sauvegarde
            utilisateurRepository.save(user);
            log.info("Utilisateur créé avec succès - ID: {}, Username: {}", user.getId(), username);

            // 6. Envoi d'email
            try {
                envoyerEmailBienvenue(user.getEmail(), username, motDePasseGenere);
                log.info("Email envoyé à: {}", user.getEmail());
            } catch (Exception e) {
                log.error("Échec envoi email à: {}", user.getEmail(), e);
                // On continue malgré l'échec d'email
            }

            return "Utilisateur ajouté avec succès";

        } catch (Exception e) {
            log.error("Échec création utilisateur - Email: {}", dto.getEmail(), e);
            return "Erreur lors de la création: " + e.getMessage();
        }
    }
    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#&$";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }


    private void envoyerEmailBienvenue(String to, String username, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Bienvenue dans la plateforme EPI");
        message.setText("Bonjour,\n\nVotre compte a été créé avec succès.\n\n" +
                "Nom d'utilisateur : " + username + "\n" +
                "Mot de passe : " + password + "\n\n" +
                "Merci de vous connecter et changer votre mot de passe.");

        mailSender.send(message);
    }
    public List<Utilisateur> ListeUser() {
        return utilisateurRepository.findAll();
    }

    public String updateUtilisateur(int id, UtilisateurDto dto) {
        Utilisateur user = utilisateurRepository.findById(id).orElse(null);
        if (user == null) return "Utilisateur non trouvé.";

        Poste poste = posteRepository.findById(dto.getPoste()).orElse(null);
        if (poste == null) return "Poste non trouvé.";

//        user.setNom(dto.getNom()); // facultatif si tu veux permettre de modifier le nom
        user.setEmail(dto.getEmail());
        user.setStatut(dto.isStatus());
        user.setTypeCompte(TypeCompte.valueOf(dto.getTypeCompte()));
        user.setPostes_id(poste);

        utilisateurRepository.save(user);
        return "Utilisateur modifié.";
    }


    public String deleteUtilisateur(int id) {
        utilisateurRepository.deleteById(id);
        return "Utilisateur supprimé.";
    }
}