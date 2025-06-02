package com.example.gestion_des_epi.gestion_epi.model;

import com.example.gestion_des_epi.gestion_epi.enume.StatutLivraison;
import com.example.gestion_des_epi.gestion_epi.enume.StatutValidition;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "demande_epi")
public class DemandeEpi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date_demande", nullable = false, updatable = false)
    private LocalDateTime dateDemande = LocalDateTime.now();

    @Column(nullable = false)
    private Integer quantite;
    private boolean livree = false; // Nouveau champ pour suivre l'état


    @Column(name = "justification", length = 500)
    private String justification;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_validation", nullable = false)
    private StatutValidition statutValidation = StatutValidition.EN_ATTENTE;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_livraison")
    private StatutLivraison statutLivraison;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

    @JoinColumn(name = "utilisateur_id", nullable = false, updatable = false)
    private Utilisateur demandeur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "epi_id", nullable = false, updatable = false)
    private Epi epi;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "validateur_id")
    private Utilisateur validateur;

    @Column(name = "date_validation")
    private LocalDateTime dateValidation;

    @Column(name = "commentaire_validation", length = 1000)
    private String commentaireValidation;

    @Column(name = "date_livraison")
    private LocalDateTime dateLivraison;

    // Méthode utilitaire pour la validation
    public void valider(Utilisateur validateur, String commentaire) {
        this.statutValidation =StatutValidition.VALIDEE;
        this.validateur = validateur;
        this.commentaireValidation = commentaire;
        this.dateValidation = LocalDateTime.now();
    }

    // Méthode utilitaire pour le rejet
    public void rejeter(Utilisateur validateur, String motif) {
        this.statutValidation = StatutValidition.REFUSEE;
        this.validateur = validateur;
        this.commentaireValidation = motif;
        this.dateValidation = LocalDateTime.now();
    }

    // Méthode utilitaire pour la livraison
    public void marquerCommeLivree() {

    }

    public void modifierDemande(Integer quantite, String justification) {
    }
}