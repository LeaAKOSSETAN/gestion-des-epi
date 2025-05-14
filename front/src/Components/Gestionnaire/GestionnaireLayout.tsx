// src/layouts/GestionnaireLayout.tsx
import React, {useState} from "react";
import {NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import {LayoutDashboard, Package, ClipboardList, Truck, History, LogOut, UserCircle} from "lucide-react";

export default function GestionnaireLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      to: "/gestionnaire",
      label: "Tableau de bord",
      icon: <LayoutDashboard size={18} />,
    },
    {
      to: "/gestionnaire/stock",
      label: "Gérer le stock",
      icon: <Package size={18} />,
    },
    {
      to: "/gestionnaire/reapprovisionnement",
      label: "Réapprovisionnement",
      icon: <ClipboardList size={18} />,
    },
    {
      to: "/gestionnaire/livraison",
      label: "Livraisons",
      icon: <Truck size={18} />,
    },
    {
      to: "/gestionnaire/historique",
      label: "Historique",
      icon: <History size={18} />,
    },
  ];

    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Nettoyage session ou token
      navigate("/login");
    };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 shadow p-6 flex justify-between items-center relative">
        <h1 className="text-3xl font-bold text-white">Tableau de bord Gestionnaire</h1>
        <div className="flex items-center space-x-6">
          <nav className="space-x-6">
            <Link to="/gestionnaire" className="text-white hover:text-yellow-200 font-medium">
              Dashboard
            </Link>
            <Link to="/gestionnaire/stock" className="text-white hover:text-yellow-200 font-medium">
              Stock
            </Link>
            <Link to="/gestionnaire/reapprovisionnement" className="text-white hover:text-yellow-200 font-medium">
              Réapprovisionnement
            </Link>
            <Link to="/gestionnaire/livraison" className="text-white hover:text-yellow-200 font-medium">
              Livraisons
            </Link>
          </nav>
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="text-white hover:text-yellow-300">
              <UserCircle className="w-8 h-8" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="p-8">{children}</main>

      {/* Navbar */}
      {/* <nav className="bg-blue-700 text-white px-4 py-2 flex gap-4 overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md whitespace-nowrap transition ${
                isActive ? "bg-blue-500" : "hover:bg-blue-600"
              }`
            }
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Contenu de la page actuelle */}
      {/* <main className="flex-1 p-6"> */}
        {/* <Outlet /> */}
      {/* </main> */} 
    </div>
  );
}
