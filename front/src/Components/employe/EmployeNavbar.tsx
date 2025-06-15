import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  UserCheck,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  FileText,
  ListChecks,
  ChevronRight,
} from "lucide-react";

export default function EmployeNavbar({ children }: { children?: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f9]">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-blue-600 text-white transition-all duration-300 flex flex-col justify-between`}
      >
        <div className="p-4">
          <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
            {collapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
          {!collapsed && <h1 className="text-xl font-bold mb-8">Espace Employé</h1>}

          <nav className="flex flex-col space-y-4">
            <NavItem
              to="/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              collapsed={collapsed}
            />
            <NavItem
              to="/demande-epi"
              icon={<ListChecks size={20} />}
              label="Demande"
              collapsed={collapsed}
            />
            <NavItem
              to="/historique-demandes"
              icon={<ClipboardList size={20} />}
              label="Historique des demandes"
              collapsed={collapsed}
            />
            <NavItem
              to="/ListeDispo"
              icon={<FileText size={20} />}
              label="EPI disponibles"
              collapsed={collapsed}
            />
            <NavItem
              to="/historique"
              icon={<FileText size={20} />}
              label="Historique mise à dispo"
              collapsed={collapsed}
            />
          </nav>
        </div>

        {/* Menu Profil */}
        <div className="relative p-4">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-blue-500 transition-all w-full"
          >
            <div className="w-6 h-6">
              <UserCheck size={24} />
            </div>
            {!collapsed && <span>Profil</span>}
          </button>

          {showMenu && !collapsed && (
            <div className="absolute bottom-14 left-4 bg-white text-gray-800 rounded shadow w-48 z-30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-blue-500 transition-colors"
              >
                <LogOut size={18} /> Se Déconnecter
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
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
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && <ChevronRight size={16} />}
    </Link>
  );
}
