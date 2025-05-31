package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Tentative de chargement de l'utilisateur: {}", username);

        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByUsername(username);

        if (utilisateurOpt.isEmpty()) {
            log.error("Utilisateur non trouvé: {}", username);
            throw new UsernameNotFoundException("Identifiant ou mot de passe incorrect");
        }

        Utilisateur utilisateur = utilisateurOpt.get();

        if (!utilisateur.getStatut()) {
            log.warn("Tentative de connexion pour un compte désactivé: {}", username);
            throw new UsernameNotFoundException("Ce compte est désactivé");
        }

        return createUserDetails(utilisateur);
    }

    private UserDetails createUserDetails(Utilisateur utilisateur) {
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
        String roleName = typeCompte.name().startsWith("ROLE_") ?
                typeCompte.name() :
                "ROLE_" + typeCompte.name();

        log.debug("Attribution du rôle: {}", roleName);
        return Collections.singletonList(new SimpleGrantedAuthority(roleName));
    }
}