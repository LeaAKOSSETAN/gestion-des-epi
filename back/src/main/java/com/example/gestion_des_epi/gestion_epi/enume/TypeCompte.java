package com.example.gestion_des_epi.gestion_epi.enume;

public enum TypeCompte {
    ADMIN,
    DQHSE,
    GESTIONNAIRE,
    EMPLOYE_STANDARD;

    public static TypeCompte fromString(String role) {
        for (TypeCompte t : TypeCompte.values()) {
            if (t.name().equalsIgnoreCase(role)) {
                return t;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + role);
    }



}