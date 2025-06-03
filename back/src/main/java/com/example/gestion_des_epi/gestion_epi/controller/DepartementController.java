package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.DepartementDto;
import com.example.gestion_des_epi.gestion_epi.model.Departement;
import com.example.gestion_des_epi.gestion_epi.service.DepartementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "departement", produces = APPLICATION_JSON_VALUE)
public class DepartementController {
    private final DepartementService departementService;

    public DepartementController(DepartementService departementService) {
        this.departementService = departementService;
    }

    @PostMapping
    public ResponseEntity<String> creerDepartement(@RequestBody DepartementDto departementDto) {
        String resultat = departementService.creer(departementDto);

        // Vérifie bien le contenu de la chaîne retournée
        if (resultat.contains("existe déjà")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(resultat); // 409
        }

        return ResponseEntity.ok(resultat); // 200
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> rechercherDepartementParCode(@PathVariable String code) {
        try {
            DepartementDto dto = departementService.rechercherParCode(code);
            return ResponseEntity.ok(dto); // 200 avec JSON
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // 404
        }
    }


    @GetMapping
    public List<Departement> ListerDepartement() {

        return this.departementService.Liste();
    }
    @PutMapping(path = "{id}")
    public String updateDepartement(@PathVariable int id, @RequestBody DepartementDto departement) {
        return this.departementService.Modifier(id, departement);
    }

    @DeleteMapping(path = "{id}")
    public String deleteDepartement(@PathVariable int id) {
        return this.departementService.Delete(id);
    }
}