import React from "react";

export default function MonProfil() {
  const user = {
    nom: "Doe",
    prenom: "Jean",
    email: "jean.doe@example.com",
    poste: "Magasinier",
    service: "Logistique",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-sky-900 mb-6">Mon Profil</h2>
      <div className="space-y-4 text-sm text-gray-800">
        <p><strong>Nom :</strong> {user.nom}</p>
        <p><strong>Prénom :</strong> {user.prenom}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Poste :</strong> {user.poste}</p>
        <p><strong>Service :</strong> {user.service}</p>
      </div>
    </div>
  );
}