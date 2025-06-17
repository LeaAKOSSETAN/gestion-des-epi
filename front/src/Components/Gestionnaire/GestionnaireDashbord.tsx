// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {Package, ClipboardList, Truck, History, LogOut, UserCircle, PlusCircle} from "lucide-react";

// export default function GestionnaireDashboard() {
//   const [showMenu, setShowMenu] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Nettoyage session ou token
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-500 to-blue-600 shadow p-6 flex justify-between items-center relative">
//         <h1 className="text-3xl font-bold text-white">Tableau de bord Gestionnaire</h1>
//         <div className="flex items-center space-x-6">
//           <nav className="space-x-6">
//             <Link to="/gestionnaire" className="text-white hover:text-yellow-200 font-medium">
//               Dashboard
//             </Link>
//             <Link to="/gestionnaire/stock" className="text-white hover:text-yellow-200 font-medium">
//               Stock
//             </Link>
//             <Link to="/gestionnaire/reapprovisionnement" className="text-white hover:text-yellow-200 font-medium">
//               Réapprovisionnement
//             </Link>
//             <Link to="/gestionnaire/livraison" className="text-white hover:text-yellow-200 font-medium">
//               Livraisons
//             </Link>
//           </nav>
//           <div className="relative">
//             <button onClick={() => setShowMenu(!showMenu)} className="text-white hover:text-yellow-300">
//               <UserCircle className="w-8 h-8" />
//             </button>
//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Déconnexion
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="p-10">
        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        //   {/* Cartes */}
        //   <Link
        //     to="/gestionnaire/stock"
        //     className="bg-white border-l-4 border-blue-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
        //   >
        //     <div className="flex items-center gap-4">
        //       <Package className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
        //       <div>
        //         <h3 className="text-gray-600 text-sm uppercase font-semibold">Stock</h3>
        //         <p className="text-2xl font-bold text-gray-800">235 produits</p>
        //       </div>
        //     </div>
        //   </Link>

        //   <Link
        //     to="/gestionnaire/reapprovisionnement"
        //     className="bg-white border-l-4 border-yellow-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
        //   >
        //     <div className="flex items-center gap-4">
        //       <ClipboardList className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform" />
        //       <div>
        //         <h3 className="text-gray-600 text-sm uppercase font-semibold">Réapprovisionnement</h3>
        //         <p className="text-2xl font-bold text-gray-800">8 demandes</p>
        //       </div>
        //     </div>
        //   </Link>

        //   <Link
        //     to="/gestionnaire/livraison"
        //     className="bg-white border-l-4 border-green-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
        //   >
        //     <div className="flex items-center gap-4">
        //       <Truck className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
        //       <div>
        //         <h3 className="text-gray-600 text-sm uppercase font-semibold">Livraisons</h3>
        //         <p className="text-2xl font-bold text-gray-800">3 en cours</p>
        //       </div>
        //     </div>
        //   </Link>

        //   <Link
        //     to="/gestionnaire/historique"
        //     className="bg-white border-l-4 border-gray-700 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
        //   >
        //     <div className="flex items-center gap-4">
        //       <History className="w-8 h-8 text-gray-800 group-hover:scale-110 transition-transform" />
        //       <div>
        //         <h3 className="text-gray-600 text-sm uppercase font-semibold">Historique</h3>
        //         <p className="text-2xl font-bold text-gray-800">+ de 120 logs</p>
        //       </div>
        //     </div>
        //   </Link>
        // </div>
//       </main>
//     </div>
//   );
// }









import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package, ClipboardList, Truck, History,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import GestionnaireLayout from "./GestionnaireLayout";

const epiData = [
  { month: "Jan", Casques: 40, Gants: 24, Bottes: 12 },
  { month: "Feb", Casques: 30, Gants: 13, Bottes: 22 },
  { month: "Mar", Casques: 20, Gants: 98, Bottes: 30 },
  { month: "Apr", Casques: 27, Gants: 39, Bottes: 20 },
  { month: "May", Casques: 18, Gants: 48, Bottes: 21 },
  { month: "Jun", Casques: 23, Gants: 38, Bottes: 25 },
  { month: "Jul", Casques: 34, Gants: 43, Bottes: 19 },
];

export default function GestionnaireDashboard() {
  const [collapsed] = useState(false);
  const [showMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");

  return (

    <GestionnaireLayout>

      <div className="flex min-h-screen bg-gray-100"> 

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <CardStat
            title="Stock"
            value="235 produits"
            color="blue"
            icon={<Package className="text-blue-600 w-8 h-8" />}
            to="/gestionnaire/stock"
          />
          <CardStat
            title="Réapprovisionnement"
            value="8 demandes"
            color="yellow"
            icon={<ClipboardList className="text-yellow-500 w-8 h-8" />}
            to="/gestionnaire/reapprovisionnement"
          />
          <CardStat
            title="Livraisons"
            value="3 en cours"
            color="green"
            icon={<Truck className="text-green-600 w-8 h-8" />}
            to="/gestionnaire/livraison"
          />
          <CardStat
            title="Historique"
            value="+ de 120 logs"
            color="gray"
            icon={<History className="text-gray-700 w-8 h-8" />}
            to="/gestionnaire/historique"
          />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribution des EPI par mois</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={epiData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Casques" fill="#3B82F6" />
              <Bar dataKey="Gants" fill="#10B981" />
              <Bar dataKey="Bottes" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
    </GestionnaireLayout>
  );
}


function CardStat({ title, value, color, icon, to }: { title: string; value: string; color: string; icon: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className={`group p-6 bg-white rounded-2xl shadow hover:shadow-lg border-l-4 border-${color}-500 transition-all`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </Link>
  );
}
