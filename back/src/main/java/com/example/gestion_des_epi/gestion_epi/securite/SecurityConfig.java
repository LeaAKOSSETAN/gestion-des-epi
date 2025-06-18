package com.example.gestion_des_epi.gestion_epi.securite;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.gestion_des_epi.gestion_epi.service.UserDetailsServiceImpl;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                // 🔽 Ajout de la configuration CORS ici
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                        "/auth/login",
                        /* "/auth/register",
                        "/auth/forgot-password", // ← à inclure ici !
                        "/auth/reset-password",
                        "/auth/confirm-account"*/
                        "/departement/**",
                        "/poste/**",
                        "/epi/**",
                        "/besoins/**",
                        "/demandes/**",
                        "/livraisons/**",
                        "/approvisionnements/**",
                        "/attributions/**"
                ).permitAll()
                .requestMatchers("/user/**").hasAuthority("ROLE_ADMIN")
                /* .requestMatchers("/demandes").hasAnyAuthority("ROLE_ADMIN", "ROLE_DQHSE", "ROLE_GESTIONNAIRE", "ROLE_EMPLOYE")
                        .requestMatchers("/demandes/a-valider").hasAnyAuthority("ROLE_DQHSE","ROLE_ADMIN")
                        .requestMatchers("/demandes/{id}/validation").hasAnyAuthority("ROLE_DQHSE","ROLE_ADMIN")
                        .requestMatchers("/demandes/mes-demandes").hasAnyAuthority("ROLE_ADMIN", "ROLE_DQHSE", "ROLE_GESTIONNAIRE", "ROLE_EMPLOYE")
                        .requestMatchers("/demandes/{id}").hasAnyAuthority("ROLE_ADMIN", "ROLE_DQHSE", "ROLE_GESTIONNAIRE", "ROLE_EMPLOYE")
                        .requestMatchers("/livraisons").hasAuthority("ROLE_ADMIN")*/
                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
        return builder.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🔽 Bean pour configurer les politiques CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 🔽 Autorise les appels depuis le frontend sur ce port
        configuration.setAllowedOrigins(List.of("http://localhost:3001"));

        // 🔽 Autorise les méthodes courantes
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 🔽 Autorise tous les headers (comme Authorization)
        configuration.setAllowedHeaders(List.of("*"));

        // 🔽 Autorise l'envoi des cookies
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
