import React from "react";
import { ClipboardList, Check, X } from "lucide-react";
import GestionnaireLayout from "./GestionnaireLayout";

export default function DemandesReapprovisionnement() {
  const demandes = [
    { id: 1, produit: "Casques", quantite: 30, date: "10/06/2025", statut: "En attente" },
    { id: 2, produit: "Gants", quantite: 50, date: "09/06/2025", statut: "Validée" },
  ];

  return (
    <GestionnaireLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Demandes de Réapprovisionnement</h1>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-600">
              <tr>
                <th className="p-4">Produit</th>
                <th className="p-4">Quantité</th>
                <th className="p-4">Date</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande) => (
                <tr key={demande.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{demande.produit}</td>
                  <td className="p-4">{demande.quantite}</td>
                  <td className="p-4">{demande.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        demande.statut === "Validée"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {demande.statut}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="text-green-600 hover:underline">
                      <Check size={16} />
                    </button>
                    <button className="text-red-600 hover:underline">
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GestionnaireLayout>
  );
}
