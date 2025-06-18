package com.example.gestion_des_epi.gestion_epi.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestion_des_epi.gestion_epi.dto.AttribuerDto;
import com.example.gestion_des_epi.gestion_epi.dto.CreateAttribuerDto;
import com.example.gestion_des_epi.gestion_epi.dto.UpdateQuantiteDto;
import com.example.gestion_des_epi.gestion_epi.model.Attribuer;
import com.example.gestion_des_epi.gestion_epi.service.AttribuerService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/attributions")
@RequiredArgsConstructor
public class AttribuerController {

    private final AttribuerService attribuerService;

    @PostMapping
   // @PreAuthorize("hasRole('ADMIN') or hasRole('GESTIONNAIRE')")
    public ResponseEntity<?> createAttribution(
            @RequestBody @Valid CreateAttribuerDto dto) {
        try {
            AttribuerDto createdAttribution = attribuerService.createAttribution(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAttribution);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/poste/{posteId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('GESTIONNAIRE') or hasRole('UTILISATEUR')")
    public ResponseEntity<List<AttribuerDto>> getAttributionsByPoste(
            @PathVariable Long posteId) {
        List<AttribuerDto> attributions = attribuerService.getAttributionsByPoste(posteId);
        return ResponseEntity.ok(attributions);
    }

    @GetMapping("/epi/{epiId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('GESTIONNAIRE') or hasRole('UTILISATEUR')")
    public ResponseEntity<List<AttribuerDto>> getAttributionsByEpi(
            @PathVariable Long epiId) {
        List<AttribuerDto> attributions = attribuerService.getAttributionsByEpi(epiId);
        return ResponseEntity.ok(attributions);
    }

   @PatchMapping
//@PreAuthorize("hasRole('ADMIN') or hasRole('GESTIONNAIRE')")
public ResponseEntity<?> updateQuantite(
        @RequestBody @Valid UpdateQuantiteDto dto,
        BindingResult bindingResult) {
    
    // Validation des données
    if (bindingResult.hasErrors()) {
        return ResponseEntity.badRequest()
            .body(bindingResult.getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList()));
    }
    
    try {
        AttribuerDto updatedAttribution = attribuerService.updateQuantite(dto);
        return ResponseEntity.ok(updatedAttribution);
    } catch (EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (IllegalStateException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}

    @GetMapping("/{epiId}/{posteId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('GESTIONNAIRE') or hasRole('UTILISATEUR')")
    public ResponseEntity<AttribuerDto> getAttributionDetails(
            @PathVariable Long epiId,
            @PathVariable Long posteId) {
        try {
            Attribuer.AttribuerId id = new Attribuer.AttribuerId();
            id.setEpiId(epiId);
            id.setPosteId(posteId);
            AttribuerDto attribution = (AttribuerDto) attribuerService.getAttributionsByEpi(epiId);
            return ResponseEntity.ok(attribution);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{epiId}/{posteId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAttribution(
            @PathVariable Long epiId,
            @PathVariable Long posteId) {
        try {
            attribuerService.deleteAttribution(epiId, posteId);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}