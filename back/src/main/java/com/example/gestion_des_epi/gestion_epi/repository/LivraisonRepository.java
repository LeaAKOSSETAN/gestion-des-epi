package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivraisonRepository extends JpaRepository<Livraison, Integer> {
    List<Livraison> findByDemandeEpi(DemandeEpi demande);
}
