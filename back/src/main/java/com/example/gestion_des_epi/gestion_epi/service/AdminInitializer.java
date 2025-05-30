package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer {
    private final UtilisateurRepository utilisateurRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private static final Logger log = (Logger) LoggerFactory.getLogger(UtilisateurService.class);


    @PostConstruct
    public void initFirstAdmin() {
        if (utilisateurRepository.count() == 0) { // Seulement si la base est vide
            Utilisateur admin = new Utilisateur();
            admin.setNom("Admin Principal");
            admin.setEmail("admin@port-cotonou.bj");
            admin.setUsername("admin");
            admin.setMot_de_passe(bCryptPasswordEncoder.encode("Admin123!")); // À changer après la 1ère connexion
            admin.setTypeCompte(TypeCompte.ADMIN);
            admin.setStatut(true);

            utilisateurRepository.save(admin);
            log.info("Compte admin principal créé avec succès");
        }
    }
}