package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.model.Notification;
import com.example.gestion_des_epi.gestion_epi.repository.NotificationRepository;
import com.example.gestion_des_epi.gestion_epi.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUser(@PathVariable Long userId) {
        List<Notification> notifications = notificationRepository.findByUtilisateurId(userId);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long notificationId) {
        Notification notification = notificationRepository.findById(Math.toIntExact(notificationId))
                .orElseThrow(() -> new RuntimeException("Notification non trouvée"));
        notification.setStatut("LUE"); // Supposons que nous avons un champ statut dans Notification
        notificationRepository.save(notification);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId) {
        notificationRepository.deleteById(Math.toIntExact(notificationId));
        return ResponseEntity.ok().build();
    }
}

