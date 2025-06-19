import React from "react";
import DqhseLayout from "./DqhseLayout";
import {
  FileText,
  CheckCircle,
  Clock,
  History,
  User,
  Eye,
  Search,
} from "lucide-react";

function DqhseDashboard() {
  const totalDemandes = 50;
  const demandesValidees = 30;
  const demandesEnAttente = 20;
  const historiques = 75;

  return (
    <DqhseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
      

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<FileText size={28} />}
            label="Total demandes"
            value={totalDemandes}
            color="bg-orange-100 text-orange-600"
          />
          <StatCard
            icon={<CheckCircle size={28}/>}
            label="Demandes validées"
            value={demandesValidees}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            icon={<Clock size={28}  />}
            label="En attente"
            value={demandesEnAttente}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard
            icon={<History size={28}  />}
            label="Historique global"
            value={historiques}
            color="bg-purple-100 text-purple-600"
          />
        </div>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Rechercher un employé, un EPI..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition">
              Tous
            </button>
            <button className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-200 transition">
              En attente
            </button>
            <button className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition">
              Validées
            </button>
            <button className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition">
              Refusées
            </button>
          </div>
        </div>

        {/* Section d'activité */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dernières activités
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-orange-600 text-gray-800 font-medium">
                <tr>
                  <th className="px-4 py-2 text-left">Employé</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Objet</th>
                  <th className="px-4 py-2 text-left">Statut</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <ActivityRow user="Jean Doe" date="17/06/2025" objet="Casque" statut="Validée" />
                <ActivityRow user="Awa B." date="16/06/2025" objet="Gilet haute visibilité" statut="En attente" />
                <ActivityRow user="Mamadou S." date="15/06/2025" objet="Bottes de sécurité" statut="Validée" />
                <ActivityRow user="Fatou N." date="14/06/2025" objet="Gants de protection" statut="Refusée" />
                <ActivityRow user="Alioune D." date="13/06/2025" objet="Lunettes de sécurité" statut="En attente" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DqhseLayout>
  );
}

export default DqhseDashboard;

// Carte statistique
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className={`flex items-center p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 gap-4`}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// : JSX.Element {
//   return (
//     <div className={`flex items-center p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 gap-4`}>
//       <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}>{icon}</div>
//       <div>
//         <p className="text-2xl font-semibold text-gray-900">{count}</p>
//         <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">{label}</p>
//       </div>
//     </div>
//   );
// }

// Ligne d’activité
function ActivityRow({
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
      : "text-red-600";

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-2 flex items-center gap-2">
        <User size={16} className="text-gray-500" />
        {user}
      </td>
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2">{objet}</td>
      <td className={`px-4 py-2 font-semibold ${statusColor}`}>{statut}</td>
      <td className="px-4 py-2">
        <button className="flex items-center gap-1 text-orange-600 hover:underline text-sm">
          <Eye size={16} />
          Voir
        </button>
      </td>
    </tr>
  );
}

