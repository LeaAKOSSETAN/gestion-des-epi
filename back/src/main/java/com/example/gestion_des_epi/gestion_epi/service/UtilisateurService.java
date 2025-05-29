package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.UtilisateurDto;
import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
@AllArgsConstructor
@Service
public class UtilisateurService {

//    @Autowired
    private JavaMailSender mailSender;

    private final UtilisateurRepository utilisateurRepository;
    private final PosteRepository posteRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

 /*   public UtilisateurService(UtilisateurRepository utilisateurRepository, PosteRepository posteRepository, BCryptPasswordEncoder bCryptPasswordEncoder ) {
        this.utilisateurRepository = utilisateurRepository;
        this.posteRepository = posteRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }*/

    public String addUtilisateur(UtilisateurDto dto) {
        Poste poste = posteRepository.findById(dto.getPoste()).orElse(null);
        if (poste == null) {
            return "Erreur : poste non trouvé.";
        }

        String nomUtilisateur = dto.getEmail().split("@")[0];
        String motDePasseGenere = generateRandomPassword(10);
        String encodedPassword = bCryptPasswordEncoder.encode(motDePasseGenere);

        Utilisateur user = new Utilisateur();
        user.setNom(nomUtilisateur);
        user.setEmail(dto.getEmail());
        user.setStatut(dto.isStatus());
        user.setTypeCompte(TypeCompte.valueOf(dto.getTypeCompte()));
        user.setMot_de_passe(encodedPassword);
        user.setPostes_id(poste);

        utilisateurRepository.save(user);
        envoyerEmailBienvenue(user.getEmail(), nomUtilisateur, motDePasseGenere);

        return "Utilisateur ajouté et email envoyé.";
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

        user.setNom(dto.getNom()); // facultatif si tu veux permettre de modifier le nom
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