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
  UserCheck,
  UserX,
  Users,
  PlusCircle,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const epiData = [
  { month: "Jan", Casques: 40, Gants: 24, Bottes: 12 },
  { month: "Feb", Casques: 30, Gants: 13, Bottes: 22 },
  { month: "Mar", Casques: 20, Gants: 98, Bottes: 30 },
  { month: "Apr", Casques: 27, Gants: 39, Bottes: 20 },
  { month: "May", Casques: 18, Gants: 48, Bottes: 21 },
  { month: "Jun", Casques: 23, Gants: 38, Bottes: 25 },
  { month: "Jul", Casques: 34, Gants: 43, Bottes: 19 },
];

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };


  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f8]">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-60"} bg-blue-600 text-white transition-all duration-300 flex flex-col justify-between`}
      >
        <div className="p-4">
          <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
            {collapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
          {!collapsed && <h1 className="text-xl font-bold mb-8">Admin EPI</h1>}

          <nav className="flex flex-col space-y-5">
            <NavLink to="" icon={<UserCircle size={20} />} label="Dashboard" collapsed={collapsed} />
            <NavLink to="" icon={<UserCheck size={20} />} label="Actifs" collapsed={collapsed} />
            <NavLink to="" icon={<UserX size={20} />} label="Inactifs" collapsed={collapsed} />
            <NavLink to="" icon={<Users size={20} />} label="Approvisonnement" collapsed={collapsed} />
            <NavLink to="" icon={<PlusCircle size={20} />} label="Ajouter" collapsed={collapsed} />
          </nav>
        </div>

        <div className="relative p-4">
          <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2">
            <UserCircle className="w-6 h-6" />
            {!collapsed && <span>Profil</span>}
          </button>

          {showMenu && !collapsed && (
            <div className="absolute bottom-12 left-4 bg-white text-gray-800 rounded shadow w-48 z-30">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <LogOut className="inline mr-2" /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cartes */}
          <Link
            to="/gestionnaire/stock"
            className="bg-white border-l-4 border-blue-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Stock</h3>
                <p className="text-2xl font-bold text-gray-800">235 produits</p>
              </div>
            </div>
          </Link>

          <Link
            to="/gestionnaire/reapprovisionnement"
            className="bg-white border-l-4 border-yellow-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <ClipboardList className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Réapprovisionnement</h3>
                <p className="text-2xl font-bold text-gray-800">8 demandes</p>
              </div>
            </div>
          </Link>

          <Link
            to="/gestionnaire/livraison"
            className="bg-white border-l-4 border-green-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <Truck className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Livraisons</h3>
                <p className="text-2xl font-bold text-gray-800">3 en cours</p>
              </div>
            </div>
          </Link>

          <Link
            to="/gestionnaire/historique"
            className="bg-white border-l-4 border-gray-700 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <History className="w-8 h-8 text-gray-800 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Historique</h3>
                <p className="text-2xl font-bold text-gray-800">+ de 120 logs</p>
              </div>
            </div>
          </Link>
        </div>
        <br />
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-500 mb-4">Distribution des EPI par mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={epiData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Casques" fill="#4F46E5" />
              <Bar dataKey="Gants" fill="#10B981" />
              <Bar dataKey="Bottes" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

function NavLink({ to, icon, label, collapsed }: { to: string; icon: React.ReactNode; label: string; collapsed: boolean }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all"
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
} 