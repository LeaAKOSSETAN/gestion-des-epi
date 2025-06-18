package com.example.gestion_des_epi.gestion_epi.exception;

public class EpiAlreadyExistsException extends RuntimeException {
    public EpiAlreadyExistsException(String message) {
        super(message);
    }
}
