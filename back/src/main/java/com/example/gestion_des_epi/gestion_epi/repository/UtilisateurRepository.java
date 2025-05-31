package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    @Query(value = "SELECT * FROM utilisateur u WHERE u.id =:id", nativeQuery = true)
    Utilisateur findUtilisateurById(@Param("id") Integer id);

    Optional<Utilisateur> findByNom(String nom);
    Optional<Utilisateur>findByUsername(String username);// <-- ajoutée

    Optional<Utilisateur> findByEmail(String email);

}