package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Epi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EpiRepository extends JpaRepository<Epi, Integer> {
    @Query(value = "select * from epi e where e.id=:id",nativeQuery = true)
    Epi findEpiById(@Param("id") Long id);
    Optional<Epi> findByNom(String nom);

}
