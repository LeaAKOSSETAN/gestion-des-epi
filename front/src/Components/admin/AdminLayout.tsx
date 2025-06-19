import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  UserCheck,
  LogOut,
  LayoutDashboard,
  UserPlus,
  Users,
  ChevronRight,
  Search,
  Bell,
  UserCircle,
  Settings,
  FileText,
  HelpCircle,
  Activity
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-300">
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-60"
        } bg-gray-300 text-white transition-all duration-300 flex flex-col justify-between shadow-lg`}
      >
        <div>
          <div className="pt-1 flex items-center justify-between">
            <img src="/images/port-re.png" alt="Logo" style={{ height: "65px", width: "auto" }} />
            <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 hover:text-orange-600 transition">
              {collapsed ? <Menu size={24} /> : <X size={24} />}
            </button>
          </div>

          <nav className="mt-4 space-y-1 px-2">
            <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Tableau de bord" collapsed={collapsed} />
            <NavItem to="/admin/utilisateurs" icon={<Users size={20} />} label="Comptes" collapsed={collapsed} />
            <NavItem to="/admin/ajouter-utilisateur" icon={<UserPlus size={20} />} label="Creer un compte" collapsed={collapsed} />
            <NavItem to="/admin/role" icon={<Settings size={20} />} label="Rôles & Permissions" collapsed={collapsed} />
            <NavItem to="/admin/Departements" icon={<FileText size={20} />} label="Departements" collapsed={collapsed} />

            <NavItem to="/admin/journal" icon={<Activity size={20} />} label="Journal d'activites" collapsed={collapsed} />

            <NavItem to="/admin/aide" icon={<UserCheck size={20} />} label="Espace Employe" collapsed={collapsed} />
            
            <NavItem to="/admin/parametres" icon={<Settings size={20} />} label="Parametres" collapsed={collapsed} />
          </nav>
        </div>

        {/* PROFIL */}
        <div className="relative p-4 pt-2 border-t border-gray-700 text-gray-800">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-2 py-2 w-full text-sm hover:bg-orange-600 rounded-md transition"
          >
            <UserCheck size={20} />
            {!collapsed && <span>Profil</span>}
          </button>

          {!collapsed && showMenu && (
            <div className="absolute bottom-14 left-4 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-orange-300 hover:text-gray-800 transition rounded"
              >
                <LogOut className="inline-block mr-2" size={16} /> Se déconnecter
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="flex justify-between items-center px-6 py-4 bg-gray-300 border-b shadow-sm">
          <div className="flex items-center gap-6 text-gray-800 font-medium">
            <span className="text-lg hidden md:inline">Espace Administrateur</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-gray-100 border border-gray-300 rounded-md pl-8 pr-3 py-1 text-sm focus:ring-gray-600 focus:outline-none"
              />
              <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-500" />
            </div>
            <Bell className="text-gray-600 hover:text-orange-700 w-5 h-5 cursor-pointer" />
            <UserCircle className="text-gray-700 hover:text-orange-700 w-7 h-7 cursor-pointer" />
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-300">{children}</main>
      </div>
    </div>
  );
}



function NavItem({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  const isExact = to === "/admin"; // Pour n'appliquer `end` qu'à la route d'accueil

  return (
    <NavLink
      to={to}
      end={isExact}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition group ${
          isActive
            ? "bg-gray-400 text-gray-800 font-semibold"
            : "text-gray-600 hover:bg-orange-200 hover:text-gray-800"
        }`
      }
    >
      <span className="w-5 h-5">{icon}</span>
      {!collapsed && <span>{label}</span>}
      {!collapsed && <ChevronRight className="ml-auto opacity-30" size={14} />}
    </NavLink>
  );
}

