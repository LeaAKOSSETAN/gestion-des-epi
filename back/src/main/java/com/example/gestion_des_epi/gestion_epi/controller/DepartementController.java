package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.DepartementDto;
import com.example.gestion_des_epi.gestion_epi.model.Departement;
import com.example.gestion_des_epi.gestion_epi.service.DepartementService;
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
    public  String CreerDepartement(@RequestBody DepartementDto departement) {
        this.departementService.creer(departement);
        return "departement creer";
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