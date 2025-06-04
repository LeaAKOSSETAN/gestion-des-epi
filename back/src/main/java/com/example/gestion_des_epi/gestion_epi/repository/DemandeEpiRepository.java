package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.enume.StatutValidition;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DemandeEpiRepository extends JpaRepository<DemandeEpi, Long> {
    @Query(value = "SELECT * FROM demandes_epi WHERE statut_validation = 'EN_ATTENTE'", nativeQuery = true)
    List<DemandeEpi> listerDemandesEnAttente();

    @Modifying
    @Transactional
    @Query(value = "UPDATE demandes_epi SET statut_validation = 'VALIDEE' WHERE id = ?1", nativeQuery = true)
    void validerDemande(Long id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE demandes_epi SET statut_validation = 'REFUSEE' WHERE id = ?1", nativeQuery = true)
    void refuserDemande(Long id);






    List<DemandeEpi> findByStatutValidation(StatutValidition statut);
    List<DemandeEpi> findByDemandeur(Utilisateur demandeur);

    List<DemandeEpi> findAllByDemandeur(Utilisateur utilisateur);
}
