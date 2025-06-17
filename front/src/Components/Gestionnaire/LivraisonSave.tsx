import React from "react";
import { Truck } from "lucide-react";
import GestionnaireLayout from "./GestionnaireLayout";

export default function LivraisonEpi() {
  const livraisons = [
    { id: 1, demande: "Casques", livreur: "John Doe", statut: "En transit", date: "10/06/2025" },
    { id: 2, demande: "Gants", livreur: "Anna Smith", statut: "Livrée", date: "08/06/2025" },
  ];

  return (
    <GestionnaireLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Livraisons d’EPI</h1>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-600">
              <tr>
                <th className="p-4">Demande</th>
                <th className="p-4">Livreur</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {livraisons.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.demande}</td>
                  <td className="p-4">{item.livreur}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.statut === "Livrée"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.statut}
                    </span>
                  </td>
                  <td className="p-4">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GestionnaireLayout>
  );
}