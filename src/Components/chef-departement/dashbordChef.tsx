import { useEffect, useState } from "react";
import { CheckCircle, Clipboard, Clock, XCircle, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardChef() {
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
      {/* <EmployeeNavbar /> */}
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Bienvenue sur votre Espace</h1>
        <p className="text-lg text-center text-gray-700">Voici votre tableau de bord chef departement avec des informations clés.</p>
    </div>
      </div>
  );
}

export default DashboardChef;
