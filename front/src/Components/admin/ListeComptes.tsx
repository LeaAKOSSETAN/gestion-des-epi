import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { utilisateursInitial, Utilisateur } from "../../data/utilisateurs";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";

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
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Comptes {isActif ? "actifs" : "inactifs"}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 font-semibold">Nom</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Rôle</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {comptesFiltres.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{u.nom}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 capitalize">{u.role.replace("_", " ")}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggle(u.id)}
                      className={`px-4 py-1 rounded text-sm font-medium transition-all ${
                        isActif
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {isActif ? "Désactiver" : "Activer"}
                    </button>
                  </td>
                </tr>
              ))}
              {comptesFiltres.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-gray-500">
                    Aucun compte {isActif ? "actif" : "inactif"}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
