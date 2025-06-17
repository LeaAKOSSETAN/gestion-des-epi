import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Truck,
  History,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";

export default function GestionnaireLayout({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const user = {
    name: "Jean Dupont",
    email: "jean.dupont@entreprise.com",
  };

  const navItems = [
    { to: "/gestionnaire", label: "Tableau de bord", icon: <LayoutDashboard size={18} /> },
    { to: "/gestionnaire/stock", label: "Gérer le stock", icon: <Package size={18} /> },
    { to: "/gestionnaire/reapprovisionnement", label: "Réapprovisionnement", icon: <ClipboardList size={18} /> },
    { to: "/gestionnaire/livraison", label: "Livraisons", icon: <Truck size={18} /> },
    { to: "/gestionnaire/historique", label: "Historique", icon: <History size={18} /> },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    // <div className="min-h-screen flex bg-gray-100">
    <div className="flex min-h-screen bg-gray-500">

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-end px-6 py-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>


          <nav className="flex flex-col space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive ? "bg-sky-100 text-sky-800" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {item.icon}
                {sidebarOpen && item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 py-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800"
          >
            <LogOut size={18} />
            {sidebarOpen && "Déconnexion"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-700">Gestionnaire</h1>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2 text-gray-700 hover:text-Sky-700"
            >
              <UserCircle className="w-8 h-8" />
              <span className="hidden md:inline">Profil</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-md z-20 p-4">
                <div className="mb-3">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
