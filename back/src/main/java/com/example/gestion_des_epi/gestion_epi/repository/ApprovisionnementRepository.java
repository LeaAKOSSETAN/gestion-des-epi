package com.example.gestion_des_epi.gestion_epi.repository;

import com.example.gestion_des_epi.gestion_epi.model.ApprovisionnementEpi;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApprovisionnementRepository extends JpaRepository<ApprovisionnementEpi, Long> {
    List<ApprovisionnementEpi> findByEpiId(Long epiId);
}