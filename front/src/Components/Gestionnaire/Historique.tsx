// Exemple de page historique des demandes
import React from 'react';
import GestionnaireLayout from './GestionnaireLayout';

const RequestHistory = () => {
  const demandes = [
    { id: 1, epi: 'Casque', quantite: 20, date: '01/05/2025', statut: 'En cours' },
    { id: 2, epi: 'Gants', quantite: 50, date: '02/05/2025', statut: 'Approuvée' },
    { id: 3, epi: 'Lunettes', quantite: 15, date: '03/05/2025', statut: 'Rejetée' },
  ];

  return (
    <GestionnaireLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Historique des Demandes</h1>
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="p-4 text-left">EPI</th>
              <th className="p-4 text-left">Quantité demandée</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id}>
                <td className="p-4">{demande.epi}</td>
                <td className="p-4">{demande.quantite}</td>
                <td className="p-4">{demande.date}</td>
                <td className="p-4">{demande.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GestionnaireLayout>
  );
};

export default RequestHistory;
