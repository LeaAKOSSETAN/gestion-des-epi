// Exemple de page demande réapprovisionnement
import React, { useState } from 'react';

const RestockRequest = () => {
  const [nomEpi, setNomEpi] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [raison, setRaison] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Envoyer la demande de réapprovisionnement à l'API
    console.log({ nomEpi, quantite, raison });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Demande de Réapprovisionnement d'EPI</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nom de l'EPI</label>
          <input
            type="text"
            value={nomEpi}
            onChange={(e) => setNomEpi(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Quantité demandée</label>
          <input
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Raison de la demande</label>
          <textarea
            value={raison}
            onChange={(e) => setRaison(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl">
          Soumettre la demande
        </button>
      </form>
    </div>
  );
};

export default RestockRequest;
