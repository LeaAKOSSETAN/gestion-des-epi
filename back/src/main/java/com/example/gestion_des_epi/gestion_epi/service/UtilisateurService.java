package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.UtilisateurDto;
import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.PosteRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final PosteRepository posteRepository;

    public UtilisateurService(UtilisateurRepository utilisateurRepository, PosteRepository posteRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.posteRepository = posteRepository;
    }

    public String addUtilisateur(UtilisateurDto dto) {
        Poste poste = posteRepository.findById(dto.getPoste()).orElse(null);
        if (poste == null) {
            return "Erreur : poste non trouvé.";
        }
        Utilisateur user = new Utilisateur();
        user.setNom(dto.getNom());
        user.setEmail(dto.getEmail());
        user.setStatut(dto.isStatus());
        user.setTypeCompte(TypeCompte.valueOf(dto.getTypeCompte()));
        user.setMot_de_passe(dto.getMotDePasse());  // mot de passe en clair
        user.setPostes_id(poste);

        utilisateurRepository.save(user);
        return "Utilisateur ajouté.";
    }

    public List<Utilisateur> ListeUser() {
        return utilisateurRepository.findAll();
    }

    public String updateUtilisateur(int id, UtilisateurDto dto) {
        Utilisateur user = utilisateurRepository.findById(id).orElse(null);
        if (user == null) return "Utilisateur non trouvé.";

        Poste poste = posteRepository.findById(dto.getPoste()).orElse(null);
        if (poste == null) return "Poste non trouvé.";

        user.setNom(dto.getNom());
        user.setEmail(dto.getEmail());
        user.setStatut(dto.isStatus());
        user.setTypeCompte(TypeCompte.valueOf(dto.getTypeCompte()));
        user.setMot_de_passe(dto.getMotDePasse());  // mot de passe en clair
        user.setPostes_id(poste);

        utilisateurRepository.save(user);
        return "Utilisateur modifié.";
    }

    public String deleteUtilisateur(int id) {
        utilisateurRepository.deleteById(id);
        return "Utilisateur supprimé.";
    }
}
