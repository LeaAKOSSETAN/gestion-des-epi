import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { utilisateursInitial, Utilisateur } from "../../data/utilisateurs";

export default function ListeComptes() {
  const { statut } = useParams();
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>(utilisateursInitial);

  const isActif = statut === "actifs";

  const handleToggle = (id: number) => {
    setUtilisateurs(prev =>
      prev.map(user =>
        user.id === id ? { ...user, actif: !user.actif } : user
      )
    );
  };

  const comptesFiltres = utilisateurs.filter(u => u.actif === isActif);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Comptes {isActif ? "actifs" : "inactifs"}
      </h1>

      <div className="bg-white shadow rounded-xl p-6">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rôle</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {comptesFiltres.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.nom}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleToggle(u.id)}
                    className={`text-sm font-medium ${
                      isActif ? "text-red-600" : "text-green-600"
                    } hover:underline`}
                  >
                    {isActif ? "Désactiver" : "Activer"}
                  </button>
                </td>
              </tr>
            ))}
            {comptesFiltres.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  Aucun compte {isActif ? "actif" : "inactif"}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
