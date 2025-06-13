package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;
import com.example.gestion_des_epi.gestion_epi.model.DemandeEpi;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.model.Notification;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.NotificationRepository;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@AllArgsConstructor
@Service
public class NotificationService {


    private final  NotificationRepository notificationRepository;

    @Autowired
    private  final UtilisateurRepository utilisateurRepository;

    public void notifyDQHSE( DemandeEpi demande) {
        Utilisateur dqhse = (Utilisateur) utilisateurRepository.findByTypeCompte("DQHSE")
                .orElseThrow(() -> new RuntimeException("DQHSE non trouvé"));

        Notification notification=  new Notification();
//        notification.setMessage("Une nouvelle demande d'EPI a été faite par " + demande.getDemandeur().getUsername());
        notification.setUtilisateur(dqhse);
        notification.setDemandeEPI(demande);
        notification.setDateEnvoi(new Date());
        notificationRepository.save(notification);
    }

    public void notifyGestionnaire(DemandeEpi demande) {
        Utilisateur gestionnaire = (Utilisateur) utilisateurRepository.findByTypeCompte("GESTIONNAIRE")
                .orElseThrow(() -> new RuntimeException("Gestionnaire non trouvé"));

        Notification notification = new Notification();
//        notification.setMessage("La demande d'EPI de " + demande.getDemandeur().getUsername() + " a été validée.");
        notification.setUtilisateur(gestionnaire);
        notification.setDemandeEPI(demande);
        notification.setDateEnvoi(new Date());
        notificationRepository.save(notification);
    }

    public void notifyDemandeur(DemandeEpi demande) {
        Notification notification = new Notification();
        notification.setMessage("Votre demande d'EPI a été validée.");
//        notification.setUtilisateur(demande.getDemandeur());
        notification.setDemandeEPI(demande);
        notification.setDateEnvoi(new Date());
        notificationRepository.save(notification);
    }

    public void notifyStockAlert(Epi epi) {
        // Convertissez la chaîne en TypeCompte
        TypeCompte typeCompte = TypeCompte.valueOf("GESTIONNAIRE");

        // Utilisez l'énumération dans la recherche
        Utilisateur gestionnaire = (Utilisateur) utilisateurRepository.findByTypeCompte(String.valueOf(typeCompte))
                .orElseThrow(() -> new RuntimeException("Gestionnaire non trouvé"));

        Notification notification = new Notification();
        notification.setMessage("Alerte de stock pour l'EPI: " + epi.getNom());
        notification.setUtilisateur(gestionnaire);
        notification.setDateEnvoi(new Date());
        notificationRepository.save(notification);
    }



    public void notifyLivraison(DemandeEpi demande) {
        Notification notification = new Notification();
        notification.setMessage("Votre demande d'EPI est prête à être livrée.");
//        notification.setUtilisateur(demande.getDemandeur());
        notification.setDemandeEPI(demande);
        notification.setDateEnvoi(new Date());
        notificationRepository.save(notification);
    }

    public void notifyBesoinComplete(DemandeEpi demandeEPI) {

        this.notifyBesoinComplete(demandeEPI);
    }
}
