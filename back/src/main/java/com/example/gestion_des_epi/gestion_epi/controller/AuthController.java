package com.example.gestion_des_epi.gestion_epi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestion_des_epi.gestion_epi.dto.AuthRequest;
import com.example.gestion_des_epi.gestion_epi.dto.AuthResponse;
import com.example.gestion_des_epi.gestion_epi.model.Utilisateur;
import com.example.gestion_des_epi.gestion_epi.repository.UtilisateurRepository;
import com.example.gestion_des_epi.gestion_epi.securite.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UtilisateurRepository utilisateurRepository;
   /*   private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;*/


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
            return ok;

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Mot de passe ou email incorrect !");
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(404).body("Utilisateur non trouvé !");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Erreur interne : " + ex.getMessage());
        }
    }
/*@PostMapping("/forgot-password")
public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequestDto request) {
    try {
        Utilisateur user = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisateur trouvé avec cet email"));

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(user.getEmail(), token);

        return ResponseEntity.ok("Email de réinitialisation envoyé");
    } catch (UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'envoi de l'email");
    }
}


    @GetMapping("/validate-reset-token")
    public ResponseEntity<?> validateResetToken(@RequestParam String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token invalide"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expiré");
        }

        return ResponseEntity.ok("Token valide");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token invalide"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expiré");
        }

        Utilisateur user = resetToken.getUtilisateur();
        user.setMot_de_passe(passwordEncoder.encode(newPassword));
        utilisateurRepository.save(user);

        // Supprimer le token après utilisation
        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok("Mot de passe mis à jour avec succès");
    }*/

}
