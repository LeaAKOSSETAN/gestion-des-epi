package com.example.gestion_des_epi.gestion_epi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestion_des_epi.gestion_epi.model.Notification;


public interface NotificationRepository  extends JpaRepository<Notification, Integer> {
    List<Notification> findByUtilisateurId(Long utilisateurId);

}
