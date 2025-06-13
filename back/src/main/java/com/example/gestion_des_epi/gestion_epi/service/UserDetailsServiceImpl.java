package com.example.gestion_des_epi.gestion_epi.service;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Tentative de chargement de l'utilisateur: {}", username);

        Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("Utilisateur non trouvé: {}", username);
                    return new UsernameNotFoundException("Identifiant ou mot de passe incorrect");
                });

        validateUserAccount(utilisateur, username);
        logUserDetails(utilisateur);  // Nouveau log critique

        return buildSpringSecurityUser(utilisateur);
    }


    private void validateUserAccount(Utilisateur utilisateur, String username) {
        if (!utilisateur.getStatut()) {
            log.warn("Tentative de connexion pour un compte désactivé: {}", username);
            throw new UsernameNotFoundException("Ce compte est désactivé");
        }
    }

    private void logUserDetails(Utilisateur utilisateur) {
        String normalizedRole = getNormalizedRoleName(utilisateur.getTypeCompte());
        log.info("Utilisateur '{}' connecté avec le rôle : {}",
                utilisateur.getUsername(),
                normalizedRole);
    }

    private String getRoleForLog(TypeCompte typeCompte) {
        if (typeCompte == null) return "ROLE_USER (par défaut)";
        return typeCompte.name().startsWith("ROLE_") ?
                typeCompte.name() :
                "ROLE_" + typeCompte.name();
    }

    private UserDetails buildSpringSecurityUser(Utilisateur utilisateur) {
        return User.builder()
                .username(utilisateur.getUsername())
                .password(utilisateur.getMot_de_passe())
                .authorities(getAuthorities(utilisateur.getTypeCompte()))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!utilisateur.getStatut())
                .build();
    }

    private Collection<? extends GrantedAuthority> getAuthorities(TypeCompte typeCompte) {
        String roleName = getNormalizedRoleName(typeCompte);
        log.debug("Attribution du rôle: {}", roleName);
        return Collections.singletonList(new SimpleGrantedAuthority(roleName));
    }

    private String getNormalizedRoleName(TypeCompte typeCompte) {
        if (typeCompte == null) {
            log.warn("TypeCompte est null, utilisation du rôle par défaut");
            return "ROLE_USER";
        }

        // Conversion spéciale pour EMPLOYE_STANDARD
        if (typeCompte == TypeCompte.EMPLOYE_STANDARD) {
            return "ROLE_EMPLOYE";
        }

        // Ajoute ROLE_ pour les autres rôles (s'ils ne l'ont pas déjà)
        return typeCompte.name().startsWith("ROLE_")
                ? typeCompte.name()
                : "ROLE_" + typeCompte.name();
    }
}