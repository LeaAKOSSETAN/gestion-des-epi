package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
   /* @Query(value = "INSERT INTO utilisateurs (nom, email, mot_de_passe, type_compte, statut, postes_id, created_at) VALUES (?1, ?2, ?3, ?4, true, ?5, NOW())", nativeQuery = true)
    @Modifying
    @Transactional
    void creerUtilisateur(String nom, String email, String motDePasse, String typeCompte, Long posteId);

    @Query(value = "SELECT * FROM utilisateurs WHERE type_compte = 'EMPLOYE'", nativeQuery = true)
    List<Utilisateur> trouverTousLesEmployes();*/

    @Query("SELECT u FROM Utilisateur u WHERE u.email = :email")
    Optional<Utilisateur> findByEmail(@Param("email") String email);

    @Query("SELECT u FROM Utilisateur u WHERE (:typeCompte IS NULL OR u.typeCompte = :typeCompte)")
    List<Utilisateur> findByTypeCompte(@Param("typeCompte") TypeCompte typeCompte);


}
