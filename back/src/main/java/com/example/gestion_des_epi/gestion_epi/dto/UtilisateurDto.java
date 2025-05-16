package com.example.gestion_des_epi.gestion_epi.dto;

public class UtilisateurDto {
    private String nom;
    private String email;
    private String motDePasse;
    private String typeCompte;
    private Long posteId;

    public UtilisateurDto() {
    }

    public UtilisateurDto(String nom, String email, String motDePasse, String typeCompte, Long posteId) {
        this.nom = nom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.typeCompte = typeCompte;
        this.posteId = posteId;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public String getTypeCompte() {
        return typeCompte;
    }

    public void setTypeCompte(String typeCompte) {
        this.typeCompte = typeCompte;
    }

    public Long getPosteId() {
        return posteId;
    }

    public void setPosteId(Long posteId) {
        this.posteId = posteId;
    }
}
