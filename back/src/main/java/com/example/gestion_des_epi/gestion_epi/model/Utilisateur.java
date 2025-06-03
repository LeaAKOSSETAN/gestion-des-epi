package com.example.gestion_des_epi.gestion_epi.model;

import com.example.gestion_des_epi.gestion_epi.enume.TypeCompte;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "utilisateurs")
public class Utilisateur  implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(unique = true)

    private String nom;
    @Column(unique = true)
    private String username;
    private String email;
    private String mot_de_passe;
    @Enumerated(EnumType.STRING)
    private TypeCompte typeCompte;
    private Boolean statut = false;
//    @Column(unique = true)
//    private String username;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Poste postes_id;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"+this.typeCompte)) ;
    }

    @Override
    public String getPassword() {
        return this.mot_de_passe;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
       // return UserDetails.super.isAccountNonExpired();
        return this.statut;
    }

    @Override
    public boolean isAccountNonLocked() {
       // return UserDetails.super.isAccountNonLocked();
        return this.statut;
    }

    @Override
    public boolean isCredentialsNonExpired() {
       // return UserDetails.super.isCredentialsNonExpired();
        return this.statut;
    }

    @Override
    public boolean isEnabled() {
//        return UserDetails.super.isEnabled();
        return this.statut;
    }
}
