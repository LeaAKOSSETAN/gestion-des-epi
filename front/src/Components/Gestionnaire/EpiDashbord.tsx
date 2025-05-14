import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, PlusCircle, HardHat, Truck } from "lucide-react";
import GestionnaireLayout from "./GestionnaireLayout";

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
};

function StatCard({ icon, title, value, color }: StatCardProps) {
  return (
    <div className={`rounded-xl shadow-lg p-5 flex items-center gap-4 ${color} text-white`}>
      <div className="bg-white bg-opacity-20 rounded-full p-3">{icon}</div>
      <div>
        <h3 className="text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function EpiDashboard() {
  const [search, setSearch] = useState("");

  const episData = [
    { id: 1, nom: "Casque de sécurité", quantite: 50, type: "Protection tête", maj: "05/05/2025" },
    { id: 2, nom: "Gants anti-coupure", quantite: 80, type: "Protection main", maj: "04/05/2025" },
    { id: 3, nom: "Lunettes de protection", quantite: 30, type: "Protection yeux", maj: "03/05/2025" },
  ];

  const filteredEpis = episData.filter((epi) =>
    epi.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <GestionnaireLayout>
      <div className="min-h-screen bg-gray-50 px-6 py-8">

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des EPI</h1>
          <Link
            to="/gestionnaire/ajouter"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Ajouter un EPI
          </Link>
        </header>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            title="EPI disponibles"
            value="235"
            color="bg-green-500"
          />
          <StatCard
            icon={<HardHat className="w-6 h-6 text-white" />}
            title="EPI attribués"
            value="132"
            color="bg-yellow-500"
          />
          <StatCard
            icon={<Truck className="w-6 h-6 text-white" />}
            title="En attente de livraison"
            value="21"
            color="bg-red-500"
          />
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher un EPI..."
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tableau des EPI */}
        <div className="bg-white shadow-md rounded-xl p-6 overflow-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock actuel</h2>
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="p-3">Nom</th>
                <th className="p-3">Quantité</th>
                <th className="p-3">Type</th>
                <th className="p-3">Dernière mise à jour</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEpis.length > 0 ? (
                filteredEpis.map((epi) => (
                  <tr key={epi.id} className="hover:bg-gray-50 border-b">
                    <td className="p-3">{epi.nom}</td>
                    <td className="p-3">{epi.quantite}</td>
                    <td className="p-3">{epi.type}</td>
                    <td className="p-3">{epi.maj}</td>
                    <td className="p-3 text-right space-x-2">
                      <Link to={`/gestionnaire/modifier/${epi.id}`} className="text-blue-600 hover:underline text-sm">
                        Modifier
                      </Link>
                      <button className="text-red-600 hover:underline text-sm">Supprimer</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Aucun EPI trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </GestionnaireLayout>

  );
}
