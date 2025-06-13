package com.example.gestion_des_epi.gestion_epi.model;

import java.sql.Date;
import java.util.List;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "livraisons")
@Data
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date_livraison;
    private int quantiteLivré;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demande_id")
    private DemandeEpi demande;

    @OneToMany(mappedBy = "livraison", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LigneLivraison> lignesLivraison;

    // Méthode utilitaire pour ajouter une ligne de livraison
    public void ajouterLigneLivraison(Besoin besoin, int quantiteLivree) {
        LigneLivraison ligne = new LigneLivraison();
        ligne.setBesoin(besoin);
        ligne.setQuantiteLivree(quantiteLivree);
        ligne.setLivraison(this);
        lignesLivraison.add(ligne);
    }
}