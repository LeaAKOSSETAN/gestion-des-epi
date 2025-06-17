import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  UserCircle,
  LogOut,
  FileText,
  ClipboardList,
  ListChecks,
  LayoutDashboard,
  ChevronRight,
  FileBarChart,
  Users,
} from "lucide-react";

export default function DqshseLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] text-gray-800">
      {/* Top nav */}
      <header className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white shadow">
        <div className="flex items-center gap-4">
          <button onClick={() => setCollapsed(!collapsed)} className="text-white">
            {collapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
          <h1 className="text-lg font-semibold">Chef de Service - DQHSE</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:bg-indigo-500 px-3 py-2 rounded transition"
          >
            <UserCircle className="w-6 h-6" />
            <span className="text-sm">Profil</span>
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5 text-red-500" /> Se déconnecter
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Contenu global avec sidebar + page */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? "w-16" : "w-64"
          } bg-white text-gray-800 border-r border-gray-200 transition-all duration-300 flex flex-col justify-between shadow-sm`}
        >
          <div className="p-4">
            <nav className="flex flex-col space-y-3">
              <NavItem
                to="/DQHSE-Dashboard"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                collapsed={collapsed}
              />
              <NavItem
                to="/DQHSE-Validation"
                icon={<ListChecks size={20} />}
                label="Demandes à valider"
                collapsed={collapsed}
              />
              <NavItem
                to="/DQHSE/Historique"
                icon={<FileText size={20} />}
                label="Historique"
                collapsed={collapsed}
              />
              <NavItem
                to="/DQHSE/Rapports"
                icon={<FileBarChart size={20} />}
                label="Rapports"
                collapsed={collapsed}
              />
              <NavItem
                to="/DQHSE/Transactions-plateforme"
                icon={<ClipboardList size={20} />}
                label="Transactions"
                collapsed={collapsed}
              />
  
              <NavItem
                to="/Dashboard"
                icon={<UserCircle size={20} />}
                label="Espace Employé"
                collapsed={collapsed}
              />
            </nav>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
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
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-indigo-100 text-sm font-medium transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && <ChevronRight size={16} />}
    </Link>
  );
}
