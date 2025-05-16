package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivraisonRepository  extends JpaRepository<Livraison, Long> {
}
