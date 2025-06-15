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
} from "lucide-react";

export default function DqshseLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f9]">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-60"
        } bg-blue-600 text-white transition-all duration-300 flex flex-col justify-between`}
      >
        <div className="p-4">
          <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
            {collapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
          {!collapsed && <h1 className="text-xl font-bold mb-8">DQHSE</h1>}
          <nav className="flex flex-col space-y-5">
            <NavItem
              to="/DQHSE/DQHSE-Dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              collapsed={collapsed}
            />
            <NavItem
              to="/DQHSE/Validation-demande"
              icon={<ListChecks size={20} />}
              label="Validations"
              collapsed={collapsed}
            />
            <NavItem
              to="/DQHSE/Transactions-plateforme"
              icon={<ClipboardList size={20} />}
              label="Transactions"
              collapsed={collapsed}
            />
            <NavItem
              to="/DQHSE/Historique"
              icon={<FileText size={20} />}
              label="Historique"
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

        {/* Menu Profil */}
        <div className="relative p-4">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-4 py-4 rounded-lg hover:bg-blue-500 transition-all"
          >
            <UserCircle className="w-6 h-6" />
            {!collapsed && <span>Profil</span>}
          </button>
          {showMenu && !collapsed && (
            <div className="absolute bottom-12 left-4 bg-white text-gray-800 rounded shadow w-48 z-30">
              <button
                onClick={handleLogout}
                className="w-full px-0 py-2 text-sm rounded-lg hover:bg-blue-500 transition-all flex items-center gap-2"
              >
                <LogOut className="inline" /> Se Déconnecter
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
      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all"
    >
      <div className="flex items-center gap-2">
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && <ChevronRight size={16} />}
    </Link>
  );
}
