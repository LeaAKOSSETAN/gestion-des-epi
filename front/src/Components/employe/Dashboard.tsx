import { useEffect, useState } from "react";
import EmployeeNavbar from "./navbar";
import { CheckCircle, Clipboard, Clock, XCircle, BarChart } from "lucide-react";
import { Link } from "react-router-dom"; // Pour naviguer vers l'historique


function Dashboard() {
  const [demandes, setDemandes] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("demandes");
    if (data) {
      setDemandes(JSON.parse(data));
    }
  }, []);

  const countStatut = (statut: string) => {
    return demandes.filter(d => d.statut === statut).length;
  };

  const totalDemandes = demandes.length;

  return (
    <div>
      <EmployeeNavbar />
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">Bienvenue sur votre Espace</h1>
        <p className="text-lg text-center text-gray-700">Voici votre tableau de bord employé avec des informations clés.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {/* Total des demandes */}
          <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="text-center flex items-center justify-center bg-blue-400 text-white p-4 rounded-full">
              <Clipboard size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">Total des Demandes</h3>
              <p className="text-3xl">{totalDemandes}</p>
            </div>
          </div>

          {/* Demandes en attente */}
          <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="text-center flex items-center justify-center bg-yellow-400 text-white p-4 rounded-full">
              <Clock size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">Demandes en Attente</h3>
              <p className="text-3xl">{countStatut("En attente")}</p>
            </div>
          </div>

          {/* Demandes validées */}
          <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="text-center flex items-center justify-center bg-green-400 text-white p-4 rounded-full">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">Demandes Validées</h3>
              <p className="text-3xl">{countStatut("Validée")}</p>
            </div>
          </div>

          {/* Demandes refusées */}
          <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="text-center flex items-center justify-center bg-red-400 text-white p-4 rounded-full">
              <XCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">Demandes Refusées</h3>
              <p className="text-3xl">{countStatut("Refusée")}</p>
            </div>
          </div>
        </div>

       

        {/* Affichage de l'historique des demandes */}
        <div className="mt-8 text-center">
        <Link
          to="/historique-demandes"
          className="text-white px-4 py-2 rounded-lg hover:bg-indigo-300 bg-blue-400  transition duration-300"
        >
          Voir l'Historique des Demandes
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;