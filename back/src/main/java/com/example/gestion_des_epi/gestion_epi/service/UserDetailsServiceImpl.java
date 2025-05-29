package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    public UserDetailsServiceImpl(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String nom) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByNom(nom)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        return User.builder()
                .username(utilisateur.getNom())
                .password(utilisateur.getMot_de_passe()) // ne pas re-crypter !
                .authorities(utilisateur.getTypeCompte().name())
                .build();
    }
}
