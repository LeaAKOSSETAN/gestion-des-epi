import React from "react";
import DqhseLayout from "./DqhseLayout";
import {
  FileText,
  CheckCircle,
  Clock,
  History,
  User,
  Eye,
} from "lucide-react";

function DqhseDashboard() {
  const totalDemandes = 50;
  const demandesValidees = 30;
  const demandesEnAttente = 20;
  const historiques = 75;

  return (
    <DqhseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-sky-900">Tableau de bord DQHSE</h1>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card
            icon={<FileText size={24} className="text-indigo-600" />}
            label="Total demandes"
            value={totalDemandes}
            bgColor="bg-indigo-50"
          />
          <Card
            icon={<CheckCircle size={24} className="text-emerald-600" />}
            label="Demandes validées"
            value={demandesValidees}
            bgColor="bg-emerald-50"
          />
          <Card
            icon={<Clock size={24} className="text-yellow-600" />}
            label="En attente"
            value={demandesEnAttente}
            bgColor="bg-yellow-50"
          />
          <Card
            icon={<History size={24} className="text-purple-600" />}
            label="Historique global"
            value={historiques}
            bgColor="bg-purple-50"
          />
        </div>

        {/* Section d'activité */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Dernières activités</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-sky-700 text-white font-medium">
                <tr>
                  <th className="px-4 py-2 text-left">Employé</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Objet</th>
                  <th className="px-4 py-2 text-left">Statut</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <Row user="Jean Doe" date="17/06/2025" objet="Casque" statut="Validée" />
                <Row user="Awa B." date="16/06/2025" objet="Gilet haute visibilité" statut="En attente" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DqhseLayout>
  );
}

export default DqhseDashboard;

// Carte statistique avec couleurs variées
function Card({
  icon,
  label,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
}) {
  return (
    <div className={`p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 ${bgColor}`}>
      <div className="bg-white p-3 rounded-full shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// Ligne d'activité
function Row({
  user,
  date,
  objet,
  statut,
}: {
  user: string;
  date: string;
  objet: string;
  statut: string;
}) {
  const statusColor =
    statut === "Validée"
      ? "text-green-600"
      : statut === "En attente"
      ? "text-yellow-600"
      : "text-gray-500";

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-2 flex items-center gap-2">
        <User size={16} className="text-gray-500" />
        {user}
      </td>
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2">{objet}</td>
      <td className={`px-4 py-2 font-medium ${statusColor}`}>{statut}</td>
      <td className="px-4 py-2">
        <button className="flex items-center gap-1 text-sky-700 hover:underline text-sm">
          <Eye size={16} />
          Voir
        </button>
      </td>
    </tr>
  );
}
