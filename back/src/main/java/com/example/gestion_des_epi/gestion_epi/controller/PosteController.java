package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.PosteDto;
import com.example.gestion_des_epi.gestion_epi.model.Poste;
import com.example.gestion_des_epi.gestion_epi.service.PosteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "/poste", produces = APPLICATION_JSON_VALUE)
public class PosteController {
    private PosteService posteService;


    public PosteController(PosteService posteService) {
        this.posteService = posteService;
    }

    @PostMapping
    public String creer(@RequestBody PosteDto postedto) {
        this.posteService.creer(postedto);
        return "le poste a ete bien creer avec succes";
    }
    @GetMapping
    public List<Poste> Liste() {
        return this.posteService.liste();
    }
    @PutMapping(path = "{id}")
    public String update(@PathVariable int id, @RequestBody PosteDto postedto) {
        return this.posteService.modifier((long) id,postedto);

    }
    @DeleteMapping(path = "{id}")
    public String delete(@PathVariable int id) {
        return this.posteService.delete(id);
    }
}