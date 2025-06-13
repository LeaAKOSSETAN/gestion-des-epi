package com.example.gestion_des_epi.gestion_epi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    @Query(value = "SELECT * FROM utilisateur u WHERE u.id =:id", nativeQuery = true)
    Utilisateur findUtilisateurById(@Param("id") Integer id);

    Optional<Utilisateur> findByNom(String nom);
    Optional<Utilisateur>findByUsername(String username);// <-- ajoutée

    Optional<Utilisateur> findByEmail(String email);

    Optional<Object> findByTypeCompte(String dqhse);

//    Optional<Object> findByTypeCompte(String gestionnaire);

//    <T> ScopedValue<T> findByTypeCompte(String dqhse);
}