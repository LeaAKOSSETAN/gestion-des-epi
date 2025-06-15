package com.example.gestion_des_epi.gestion_epi.model;


import com.example.gestion_des_epi.gestion_epi.enume.StatutValidation;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "demandes_epi")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DemandeEpi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateDemande;
    @Enumerated(EnumType.STRING)
    private StatutValidation statut;
    private String reference;
    @Column(columnDefinition = "TEXT")
    private String justification;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id")
    @ToString.Exclude
    @JsonBackReference
    private Utilisateur demandeur;

    @OneToMany(mappedBy = "demandeEPI", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Besoin> besoins = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private StatutValidation validationDQHSE = StatutValidation.EN_ATTENTE;

    @PrePersist
    public void onCreate() {
        this.dateDemande = LocalDateTime.now();
        this.reference = "DEM-" + UUID.randomUUID().toString().substring(0, 8);
        this.statut = StatutValidation.valueOf("EN_ATTENTE");
    }

    public void ajouterBesoin(Besoin besoin) {
        besoins.add(besoin);
        besoin.setDemandeEPI(this);
    }
}