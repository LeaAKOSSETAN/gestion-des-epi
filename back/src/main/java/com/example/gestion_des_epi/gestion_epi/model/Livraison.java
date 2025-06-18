package com.example.gestion_des_epi.gestion_epi.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "demande_epi_id", nullable = false)
    @ToString.Exclude
    private DemandeEpi demandeEpi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "epi_id", nullable = false)
    @ToString.Exclude
    private Epi epi;
}
