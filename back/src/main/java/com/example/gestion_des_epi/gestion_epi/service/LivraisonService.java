package com.example.gestion_des_epi.gestion_epi.service;

import com.example.gestion_des_epi.gestion_epi.dto.LigneLivraisonDto;
import com.example.gestion_des_epi.gestion_epi.model.*;
import com.example.gestion_des_epi.gestion_epi.repository.DemandeEpiRepository;
import com.example.gestion_des_epi.gestion_epi.repository.LivraisonRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class LivraisonService {

    private final LivraisonRepository livraisonRepository;
    private final DemandeEpiRepository demandeRepository;



    @Transactional
    public DemandeEpi creerLivraison(int demandeId, List<LigneLivraisonDto> lignesDTO) {
        DemandeEpi demande = demandeRepository.findById((long) demandeId)
                .orElseThrow(() -> new RuntimeException("Demande introuvable"));

       /* if (!demande.getStatut().equals(StatutValidation.VALIDEE)) {
            throw new IllegalStateException("La demande n'est pas validée");
        }

        Livraison livraison = new Livraison();
        livraison.setDate_livraison(Date.valueOf(LocalDate.now()));
        livraison.setDemande(demande);

        for (LigneLivraisonDto dto : lignesDTO) {
            Besoin besoin = trouverBesoin(demande, dto.getBesoin_id());

            if (dto.getQuantiteLivree() > (besoin.getQuantite() - besoin.getQuantite_livre())) {
                throw new IllegalArgumentException("Quantité à livrer dépasse le besoin restant");
            }

            livraison.ajouterLigneLivraison(besoin, dto.getQuantiteLivree());
            besoin.setQuantite_livre(besoin.getQuantite_livre() + dto.getQuantiteLivree());
        }

        // Vérifier si la demande est complètement livrée
        if (demande.isCompleteLivree()) {
            demande.marquerCommeLivree();
        }*/

      return   demandeRepository.save(demande);
//        return livraisonRepository.save(livraison);
    }

    private Besoin trouverBesoin(DemandeEpi demande, int besoinId) {
        return demande.getBesoins().stream()
                .filter(b -> b.getId() == besoinId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Besoin non trouvé dans la demande"));
    }

    // DTO pour les lignes de livraison

}