// Exemple de page enregistrement des livraisons
import React, { useState } from 'react';

const RecordDelivery = () => {
  const [epi, setEpi] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [dateLivraison, setDateLivraison] = useState('');
  const [fournisseur, setFournisseur] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enregistrer la livraison dans la base de données
    console.log({ epi, quantite, dateLivraison, fournisseur });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Enregistrer une Livraison</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nom de l'EPI</label>
          <input
            type="text"
            value={epi}
            onChange={(e) => setEpi(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Quantité reçue</label>
          <input
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Date de livraison</label>
          <input
            type="date"
            value={dateLivraison}
            onChange={(e) => setDateLivraison(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Fournisseur</label>
          <input
            type="text"
            value={fournisseur}
            onChange={(e) => setFournisseur(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl">
          Enregistrer la Livraison
        </button>
      </form>
    </div>
  );
};

export default RecordDelivery;
