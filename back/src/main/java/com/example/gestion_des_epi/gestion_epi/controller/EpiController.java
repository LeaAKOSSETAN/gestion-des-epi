package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.EpiDto;
import com.example.gestion_des_epi.gestion_epi.model.Epi;
import com.example.gestion_des_epi.gestion_epi.service.EpiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/epi")
public class EpiController {

    private final EpiService epiService;

    public EpiController(EpiService epiService) {
        this.epiService = epiService;
    }
    @PostMapping
    public String addEpi(@RequestBody EpiDto epi) {
        return this.epiService.Add(epi);
    }

    @GetMapping
    public List<Epi> getAllEpi() {
        return this.epiService.Liste();

    }
    @PutMapping(path = "{id}")
    public String updateEpi(@PathVariable("id") int id, @RequestBody EpiDto epi) {
        return this.epiService.Modifier(id,epi);
    }
}
