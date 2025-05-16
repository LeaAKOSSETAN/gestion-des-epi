package com.example.gestion_des_epi.gestion_epi.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.CascadeType.PERSIST;

@Entity
@Table(name = "POSTES_EPI")
public class PosteEpi {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int quantite;

    @ManyToOne(cascade = {PERSIST,MERGE})
    @JoinColumn(name = "POSTE_ID", referencedColumnName = "id",
    foreignKey = @ForeignKey(name = "fk_poste"),
    nullable = true)
    private Poste poste;

    @ManyToOne(cascade = {PERSIST,MERGE})
    @JoinColumn(name = "EPI_ID" ,referencedColumnName = "id",
    foreignKey = @ForeignKey(name = "fk_epi"),
    nullable = true)
    private Epi epi;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public PosteEpi() {
    }

    public PosteEpi(int id, int quantite, Poste poste, Epi epi, LocalDateTime createdAt) {
        this.id = id;
        this.quantite = quantite;
        this.poste = poste;
        this.epi = epi;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public Poste getPoste() {
        return poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }

    public Epi getEpi() {
        return epi;
    }

    public void setEpi(Epi epi) {
        this.epi = epi;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
