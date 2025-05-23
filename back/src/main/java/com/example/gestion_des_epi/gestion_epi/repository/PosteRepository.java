package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Poste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PosteRepository  extends JpaRepository<Poste, Long> {
    @Query(value = "select * from poste p where p.id=:id", nativeQuery = true)
    Poste getPoste(@Param("id") int id);

}