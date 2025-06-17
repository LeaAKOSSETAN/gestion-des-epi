import React from "react";
import EmployeNavbar from "./EmployeNavbar";

export default function RefaireDemande() {
  const anciennesDemandes = [
    { id: 1, epi: "Gants anti-coupure", quantite: 2 },
    { id: 2, epi: "Casque de chantier", quantite: 1 },
  ];

  const refaire = (demandeId: number) => {
    alert("Demande ID " + demandeId + " recréée !");
    // Ici, vous pouvez rediriger vers le formulaire de demande pré-rempli
  };

  return (
    <EmployeNavbar>
     
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-sky-900 mb-4">Refaire une demande</h2>
      <ul className="space-y-3">
        {anciennesDemandes.map((demande) => (
          <li
            key={demande.id}
            className="flex justify-between items-center p-4 bg-sky-50 rounded border"
          >
            <div>
              <p className="font-medium text-sky-900">{demande.epi}</p>
              <p className="text-sm text-gray-600">Quantité : {demande.quantite}</p>
            </div>
            <button
              onClick={() => refaire(demande.id)}
              className="bg-sky-700 text-white text-sm px-3 py-1 rounded hover:bg-sky-800"
            >
              Refaire
            </button>
          </li>
        ))}
      </ul>
    </div>
    </EmployeNavbar>
  );
}
