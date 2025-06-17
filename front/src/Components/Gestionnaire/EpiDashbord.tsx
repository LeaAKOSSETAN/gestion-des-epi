import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, PlusCircle, HardHat, Truck, Pencil, Trash2 } from "lucide-react";
import GestionnaireLayout from "./GestionnaireLayout";

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
};

function StatCard({ icon, title, value, color }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-all">
      <div className={`p-3 rounded-full ${color} bg-opacity-10 text-${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
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
      <div className="min-h-screen px-6 py-8 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord – Stock EPI</h1>
          <Link
            to="/gestionnaire/ajouter"
            className="flex items-center gap-2 bg-sky-700 hover:bg-sky-700 text-white px-4 py-2 rounded-xl shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            Ajouter un EPI
          </Link>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="EPI disponibles"
            value="235"
            color="text-green-600"
          />
          <StatCard
            icon={<HardHat className="w-6 h-6" />}
            title="EPI attribués"
            value="132"
            color="text-yellow-600"
          />
          <StatCard
            icon={<Truck className="w-6 h-6" />}
            title="En attente de livraison"
            value="21"
            color="text-red-600"
          />
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Rechercher un EPI..."
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-700 focus:outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tableau des EPI */}
        <div className="bg-white shadow-lg rounded-2xl p-6 overflow-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventaire du stock</h2>
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="text-gray-600 bg-gray-100 rounded-lg">
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Quantité</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Mise à jour</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEpis.length > 0 ? (
                filteredEpis.map((epi) => (
                  <tr key={epi.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{epi.nom}</td>
                    <td className="px-4 py-3">{epi.quantite}</td>
                    <td className="px-4 py-3">{epi.type}</td>
                    <td className="px-4 py-3">{epi.maj}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        to={`/gestionnaire/modifier/${epi.id}`}
                        className="inline-flex items-center gap-1 text-sky-700 hover:underline"
                      >
                        <Pencil size={16} />
                        Modifier
                      </Link>
                      <button
                        className="inline-flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <Trash2 size={16} />
                        Supprimer
                      </button>
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
