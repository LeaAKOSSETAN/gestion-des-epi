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









import React, {JSX} from "react";
import {
  ClipboardList,
  Package,
  Truck,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";
import GestionnaireLayout from "./GestionnaireLayout";

const demandesMensuelles = [
  { mois: "Jan", demandes: 22 },
  { mois: "Fév", demandes: 35 },
  { mois: "Mar", demandes: 18 },
  { mois: "Avr", demandes: 40 },
  { mois: "Mai", demandes: 9 },
  { mois: "Juin", demandes: 25 },
];

const repartitionEPI = [
  { name: "Casques", value: 40 },
  { name: "Gants", value: 30 },
  { name: "Bottes", value: 20 },
  { name: "Gilets", value: 10 },
];

const COLORS = ["#f97316", "#facc15", "#4ade80", "#60a5fa"];

export default function DashboardGestionnaire() {
  return (
    <GestionnaireLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord du gestionnaire</h1>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<ClipboardList size={28} />} title="Demandes en attente" value="28" bgColor="bg-orange-100 text-orange-500" />
          <StatCard icon={<Truck size={28} />} title="Livraisons en cours" value="5" bgColor="bg-green-100 text-green-500" />
          <StatCard icon={<Package size={28} />} title="Stock disponible" value="1 240 articles" bgColor="bg-blue-100 text-blue-500" />
          <StatCard icon={<AlertCircle size={28} />} title="Produits critiques" value="3 alertes" bgColor="bg-rose-100 text-rose-500" />
        </div>


        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Histogramme demandes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold mb-4 text-gray-800">Evolution des demandes mensuelles</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={demandesMensuelles}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="demandes" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Répartition EPI */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold mb-4 text-gray-800">Répartition des EPI distribués</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={repartitionEPI}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {repartitionEPI.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </GestionnaireLayout>
  );
}

function StatCard({ icon, title, value, bgColor}: { icon: JSX.Element; title: string; value: string; bgColor: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 h-24 hover:shadow-md transition-all duration-300`}>
      <div className={`w-14 h-12 flex items-center justify-center rounded-full  ${bgColor}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
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
