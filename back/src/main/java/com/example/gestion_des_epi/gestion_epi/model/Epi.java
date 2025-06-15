package com.example.gestion_des_epi.gestion_epi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Entity
@Table(name= "epis")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Slf4j // Ajout pour la journalisation
public class Epi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private int quantite_en_stock;
    private int dureeValidite;
    private int seuil_alerte;

    /*@Column(name = "is_actif", nullable = false)
    private boolean actif = true;

    @Column(name = "is_deleted", nullable = false)
    private boolean deleted = false;*/

    @Column(name = "besoin_reapprovisionnement")
    private Boolean besoinReapprovisionnement = false;

    // Ajout de la méthode retirerStock
    public void retirerStock(int quantite) {
        if (quantite < 0) {
            log.error("Tentative de retrait d'une quantité négative pour l'EPI {}", id);
            throw new IllegalArgumentException("La quantité doit être positive");
        }
        if (quantite > this.quantite_en_stock) {
            log.error("Stock insuffisant pour l'EPI {}: stock actuel={}, quantité demandée={}",
                    id, quantite_en_stock, quantite);
            throw new IllegalArgumentException("Stock insuffisant");
        }

        this.quantite_en_stock -= quantite;

        // Vérifier le seuil d'alerte
        if (this.quantite_en_stock < seuil_alerte) {
            log.warn("Alerte stock bas pour EPI {} ({}): stock actuel={} < seuil={}",
                    id, nom, quantite_en_stock, seuil_alerte);
        }
    }

    // Ajout d'une méthode pour ajouter du stock (optionnel mais utile)
    public void ajouterStock(int quantite) {
        if (quantite < 0) {
            log.error("Tentative d'ajout d'une quantité négative pour l'EPI {}", id);
            throw new IllegalArgumentException("La quantité doit être positive");
        }
        this.quantite_en_stock += quantite;
    }
}