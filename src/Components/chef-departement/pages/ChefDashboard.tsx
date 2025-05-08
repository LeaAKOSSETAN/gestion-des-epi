import React, { useState, useEffect } from "react";
import ChefNavbar from "../Navbarchef";

const Dashboard: React.FC = () => {
  // Données internes pour les statistiques (au lieu de props)
  const [employeeStats, setEmployeeStats] = useState({ total: 0 });
  const [requestStats, setRequestStats] = useState({ pending: 0 });
  const [pendingTransfers, setPendingTransfers] = useState({ total: 0 });

  // Utilisation de useEffect pour simuler la récupération de données
  useEffect(() => {
    // Simuler les données (remplacer par une vraie API ou logique si nécessaire)
    setEmployeeStats({ total: 120 });
    setRequestStats({ pending: 30 });
    setPendingTransfers({ total: 10 });
  }, []);

  return (
    <div>
      <ChefNavbar />
      <div className="bg-white shadow-md rounded-xl p-6 m-4">
        <h2 className="text-2xl font-semibold mb-4">📊 Dashboard</h2>

        {/* Cards Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Employee Stats */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Employés</h3>
            <p className="text-2xl font-bold">{employeeStats.total}</p>
          </div>

          {/* Card 2: Request Stats */}
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Demandes en Attente</h3>
            <p className="text-2xl font-bold">{requestStats.pending}</p>
          </div>

          {/* Card 3: Pending Transfers */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Transfert au DQHSE</h3>
            <p className="text-2xl font-bold">{pendingTransfers.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
