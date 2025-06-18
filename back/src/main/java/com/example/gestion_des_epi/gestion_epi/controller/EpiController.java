package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.EpiDto;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.service.EpiService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.gestion_des_epi.gestion_epi.exception.EpiAlreadyExistsException;

@RestController
@RequestMapping(path = "/epi")
public class EpiController {

    private final EpiService epiService;

    public EpiController(EpiService epiService) {
        this.epiService = epiService;
    }
    @PostMapping
public ResponseEntity<?> addEpi(@RequestBody EpiDto epiDto) {
    try {
        String result = epiService.Add(epiDto);
        return ResponseEntity.ok(result);
    } catch (EpiAlreadyExistsException e) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(e.getMessage());
    } catch (IllegalArgumentException e) {
        return ResponseEntity
            .badRequest()
            .body(e.getMessage());
    }
}

    @GetMapping
    public List<Epi> getAllEpi() {
        return this.epiService.Liste();

    }
    @PutMapping(path = "{id}")
    public String updateEpi(@PathVariable("id") int id, @RequestBody EpiDto epi) {
        return this.epiService.Modifier(id,epi);
    }
    @DeleteMapping(path="{id}")
    public String deleteEpi(@PathVariable("id") int id) {
        return this.epiService.delete(id);
    }
}
