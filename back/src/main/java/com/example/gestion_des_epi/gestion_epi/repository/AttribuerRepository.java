package com.example.gestion_des_epi.gestion_epi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.gestion_des_epi.gestion_epi.model.Attribuer;
import com.example.gestion_des_epi.gestion_epi.model.Attribuer.AttribuerId;

public interface AttribuerRepository extends JpaRepository<Attribuer, Integer> {

    List<Attribuer> findByPosteId(Long posteId);

    List<Attribuer> findByEpiId(Long epiId);

    List<Attribuer> findByAnnee(int annee);

    boolean existsByEpiIdAndPosteIdAndAnnee(Long epiId, Long posteId, int annee);

    //public Object findById(Attribuer.AttribuerId id);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END "
            + "FROM Attribuer a WHERE a.epi.id = :epiId AND a.poste.id = :posteId AND a.annee = :annee")
    boolean existsByEpiAndPosteAndAnnee(@Param("epiId") Long epiId,
            @Param("posteId") Long posteId,
            @Param("annee") int annee);

    @EntityGraph(attributePaths = {"epi", "poste", "poste.departement"})
    Optional<Attribuer> findWithDetailsById(AttribuerId id);

    public Object findById(AttribuerId id);



}
