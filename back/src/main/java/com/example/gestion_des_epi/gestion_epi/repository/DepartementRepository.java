package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DepartementRepository extends JpaRepository<Departement, Long> {
    @Query(value = "select * from departements d where d.id=:id",nativeQuery = true)
    public Departement getDepartementById(@Param("id") Long id);
    boolean existsByCodeDep(String codeDep);
    boolean existsByNom(String nom);

    Optional<Departement> findByCodeDep(String codeDep);


}
