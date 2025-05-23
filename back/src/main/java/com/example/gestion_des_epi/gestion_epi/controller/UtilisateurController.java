package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.UtilisateurDto;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.service.PosteEpiService;
import com.example.gestion_des_epi.gestion_epi.service.UtilisateurService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "/user", produces = APPLICATION_JSON_VALUE)
public class UtilisateurController {

    private final PosteEpiService posteEpiService;
    private final UtilisateurService utilisateurService;

    public UtilisateurController(PosteEpiService posteEpiService, UtilisateurService utilisateurService) {
        this.posteEpiService = posteEpiService;
        this.utilisateurService = utilisateurService;
    }

    @PostMapping(path = "/creer")
    @ResponseStatus(HttpStatus.CREATED)
    public String addUtilisateur(@RequestBody UtilisateurDto utilisateurDto) {
        return utilisateurService.addUtilisateur(utilisateurDto);
    }

    @GetMapping
    public List<Utilisateur> ListeUser() {
        return utilisateurService.ListeUser();
    }

    @PutMapping(path = "{id}")
    public String updateUtilisateur(@PathVariable int id, @RequestBody UtilisateurDto utilisateurDto) {
        return utilisateurService.updateUtilisateur(id, utilisateurDto);
    }

    @DeleteMapping(path = "{id}")
    public String deleteUtilisateur(@PathVariable int id) {
        return utilisateurService.deleteUtilisateur(id);
    }
}