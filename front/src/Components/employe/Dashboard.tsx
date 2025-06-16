import { JSX, useEffect, useState } from "react";
import EmployeNavbar from "./EmployeNavbar";
import {
  CheckCircle,
  Clipboard,
  Clock,
  XCircle,
  Search,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("demandes");
    if (data) {
      setDemandes(JSON.parse(data));
    }
  }, []);

  const countStatut = (statut: string) => {
    return demandes.filter((d) => d.statutDemande === statut).length;
  };

  const totalDemandes = demandes.length;

  const filteredUsers = demandes.filter((demande) => {
    const values = Object.values(demande).map((val) =>
      String(val).toLowerCase()
    );
    return values.some((val) => val.includes(searchTerm.toLowerCase()));
  });

  const getStatusClass = (status: string) =>
    status === "Livrée"
      ? "bg-emerald-100 text-emerald-700"
      : status === "En attente"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-rose-100 text-rose-700";

  const navigate = useNavigate();

  const handleModifier = (id: number) => {
    navigate(`/modifier-demande/${id}`);
  };

  const handleSupprimer = (id: number) => {
    const confirmDelete = window.confirm("Supprimer cette demande ?");
    if (confirmDelete) {
      const nouvelles = demandes.filter((d) => d.id !== id);
      setDemandes(nouvelles);
      localStorage.setItem("demandes", JSON.stringify(nouvelles));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <EmployeNavbar>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Clipboard size={28} />} label="Demandes" count={totalDemandes} color="bg-sky-100 text-sky-700" />
            <StatCard icon={<Clock size={28} />} label="En Attente" count={countStatut("En attente")} color="bg-amber-100 text-amber-700" />
            <StatCard icon={<CheckCircle size={28} />} label="Validées" count={countStatut("Validée")} color="bg-emerald-100 text-emerald-700" />
            <StatCard icon={<XCircle size={28} />} label="Rejetées" count={countStatut("Refusée")} color="bg-rose-100 text-rose-700" />
          </div>

          {/* Barre de recherche + bouton */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
            <h3 className="text-xl font-semibold text-gray-900">Liste des Demandes</h3>
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
              </div>
              <Link
                to="/demande-epi"
                className="bg-sky-700 text-white px-4 py-2 rounded-lg shadow hover:bg-sky-800 transition"
              >
                + Nouvelle Demande
              </Link>
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-white mt-8 shadow-xl rounded-xl overflow-hidden border border-gray-100">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-sky-800 text-white">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Livraison</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((demande) => (
                    <tr key={demande.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{demande.dateDemande}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{demande.statutDemande}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(demande.statutLivraison)}`}>
                          {demande.statutLivraison}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleModifier(demande.id)}
                          className="text-sky-700 hover:underline font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleSupprimer(demande.id)}
                          className="text-rose-600 hover:underline font-medium"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">
                      Aucune Demande trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </EmployeNavbar>
    </div>
  );
}

function StatCard({
  icon,
  count,
  label,
  color,
}: {
  icon: JSX.Element;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className={`flex items-center p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 gap-4`}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-gray-900">{count}</p>
        <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}

export default Dashboard;
