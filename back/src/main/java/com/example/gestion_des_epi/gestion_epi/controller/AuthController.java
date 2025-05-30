package com.example.gestion_des_epi.gestion_epi.controller;

import com.example.gestion_des_epi.gestion_epi.dto.AuthRequest;
import com.example.gestion_des_epi.gestion_epi.dto.AuthResponse;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import com.example.gestion_des_epi.gestion_epi.securite.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UtilisateurRepository utilisateurRepository;


    /*@PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
      String email="y@example.com";//request.getEmail();
        String password="$2a$10$zTB6oEqKUAkEoRfcQpyAMOD856w5/8YY2Zbyl8Gl9HQ3jVW5adjHS";// request.getMotDePasse();
        UsernamePasswordAuthenticationToken user =new UsernamePasswordAuthenticationToken(email, password);
        Authentication authentication = authenticationManager.authenticate(
                user );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(token));
    }*/
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getMotDePasse() // mot de passe en clair ici
                    )
            );

            Utilisateur utilisateur = utilisateurRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            String token = jwtService.generateToken(userDetails);

            ResponseEntity<AuthResponse> ok = ResponseEntity.ok(new AuthResponse(token, utilisateur.getTypeCompte().name()));
            return ok ;


        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Mot de passe ou email incorrect !");
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(404).body("Utilisateur non trouvé !");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Erreur interne : " + ex.getMessage());
        }
    }


}
