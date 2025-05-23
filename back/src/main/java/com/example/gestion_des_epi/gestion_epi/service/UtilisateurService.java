package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.UtilisateurDto;
import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private PosteRepository posteRepository;
    private BCryptPasswordEncoder passwordEncoder;                

    public void inscription(UtilisateurDto utilisateurDto){ 

        Utilisateur utilisateur = new Utilisateur(); 
        String mdpCrypte = passwordEncoder.encode(utilisateurDto.getMotDePasse());
        utilisateur.setMot_de_passe(mdpCrypte);

        if (!utilisateurDto.getEmail().contains("@")){
            throw new RuntimeException("Mail invalide") ;
        }else{
            utilisateur.setEmail(utilisateurDto.getEmail());
        }

        utilisateurRepository.save(utilisateur);
    }

    public Utilisateur creerUtilisateur(UtilisateurDto dto) {
        Utilisateur user = new Utilisateur();
        user.setNom(dto.getNom());
        user.setEmail(dto.getEmail());
        user.setMot_de_passe(dto.getMotDePasse()); // tu peux encoder avec BCrypt
        user.setTypeCompte(TypeCompte.valueOf(dto.getTypeCompte()));

        if (dto.getPosteId() != null) {
            Poste poste = posteRepository.findById(dto.getPosteId())
                    .orElseThrow(() -> new RuntimeException("Poste introuvable"));
            user.setPostes_id(poste);
        }

        return utilisateurRepository.save(user);
    }

    public void activerDesactiver(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        utilisateur.setStatut(!utilisateur.getStatut());
        utilisateurRepository.save(utilisateur);
    }

    public List<Utilisateur> listerUtilisateurs(String typeCompte) {
        if (typeCompte == null || typeCompte.isEmpty()) {
            return utilisateurRepository.findAll();
        }
        return utilisateurRepository.findByTypeCompte(TypeCompte.valueOf(typeCompte.toUpperCase()));
    }

}
