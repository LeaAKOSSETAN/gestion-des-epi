package com.example.gestion_des_epi.gestion_epi.exception;

import com.example.gestion_des_epi.gestion_epi.model.Epi;

public class EpiIndisponibleException extends RuntimeException {
    private final Epi epi;

    public EpiIndisponibleException(String message, Epi epi) {
        super(message);
        this.epi = epi;
    }

    public Epi getEpi() {
        return epi;
    }
}