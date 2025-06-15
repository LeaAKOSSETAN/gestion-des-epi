package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "livraisons")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_livraison", nullable = false)
    private LocalDateTime dateLivraison;

    @Column(nullable = false, unique = true)
    private String reference;

    @Column(name = "quantite_livree", nullable = false)
    private Integer quantiteLivree;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demande_epi_id", nullable = false)
    @ToString.Exclude
    private DemandeEpi demandeEpi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "epi_id", nullable = false)
    @ToString.Exclude
    private Epi epi;
}