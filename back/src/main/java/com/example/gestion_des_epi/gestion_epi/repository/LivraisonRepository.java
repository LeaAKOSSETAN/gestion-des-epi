package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivraisonRepository  extends JpaRepository<Livraison, Long> {
    List<Livraison> findByDemandeEpi_id_Id(int demandeId);


}
