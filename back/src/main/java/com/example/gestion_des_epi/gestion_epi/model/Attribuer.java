package com.example.gestion_des_epi.gestion_epi.model;

import java.io.Serializable;
import java.util.Objects;

import com.example.gestion_des_epi.gestion_epi.model.Attribuer.AttribuerId;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attribuer")
@Data
public class Attribuer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @EmbeddedId
    private AttribuerId id;

    @ManyToOne
    @MapsId("epiId")
    @JoinColumn(name = "epi_id")
    private Epi epi;

    @ManyToOne
    @MapsId("posteId")
    @JoinColumn(name = "poste_id")
    private Poste poste;

    private int quantite;
    private int annee;

    // Clé composite
    @Data
    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    public static class AttribuerId implements Serializable {

        private Long epiId;
        private Long posteId;

        @Override
        public boolean equals(Object o) {
            if (this == o) {
                return true;
            }
            if (o == null || getClass() != o.getClass()) {
                return false;
            }
            AttribuerId that = (AttribuerId) o;
            return Objects.equals(epiId, that.epiId)
                    && Objects.equals(posteId, that.posteId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(epiId, posteId);
        }
        // Constructeur, equals(), hashCode()
    }
}
