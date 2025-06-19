import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  Menu, X, UserCheck, LogOut, LayoutDashboard, ClipboardList, FileText,
  HardHat, Truck, HelpCircle, Bell, ChevronRight, Search, UserCircle, Settings
} from "lucide-react";

export default function GestionnaireLayout({ children }: { children?: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleLogout = () => {
    alert("Déconnexion réussie !");
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !(profileRef.current as any).contains(event.target)) {
        setShowProfileCard(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className={`${collapsed ? "w-16" : "w-64"} bg-white text-gray-600 transition-all duration-300 flex flex-col justify-between shadow-lg`}>
        <div>
          <div className="pt-1 flex items-center justify-between gap-3 text-gray-800 font-medium">
            <div
              className="flex items-center gap-0.5 cursor-pointer"
              onClick={() => collapsed && setCollapsed(false)}
            >
              <img src="/images/port-re.png" alt="Logo" className="h-16" />

            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-1 px-2 py- text-gray-400 hover:bg-orange-600 rounded-md transition group"
            >
              {collapsed ? <Menu size={24} /> : <X size={24} />}
            </button>
          </div>

          <nav className="mt-4 space-y-1 px-2">
            <NavItem to="/gestionnaire" icon={<LayoutDashboard size={20} />} label="Tableau de bord" collapsed={collapsed} />
            <NavItem to="/gestionnaire/ajouter" icon={<HardHat size={20} />} label="Ajouter EPI" collapsed={collapsed} />
            <NavItem to="/gestionnaire/livraisons" icon={<Truck size={20} />} label="Livraisons" collapsed={collapsed} />
            <NavItem to="/gestionnaire/demandes" icon={<ClipboardList size={20} />} label="Demandes reçues" collapsed={collapsed} />
            <NavItem to="/gestionnaire/dotations" icon={<FileText size={20} />} label="Historique Dotations " collapsed={collapsed} />
            <NavItem to="/gestionnaire/reapprovinnement" icon={<FileText size={20} />} label="Reapprovisionnement " collapsed={collapsed} />
            <NavItem to="/admin/aide" icon={<UserCheck size={20} />} label="Espace Employe" collapsed={collapsed} />
            <NavItem to="/admin/parametres" icon={<Settings size={20} />} label="Paramètres" collapsed={collapsed} />
            
          
          </nav>
        </div>

        {/* PROFIL (Menu bas) */}
        <div className="relative p-4 border-t border-gray-300">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-2 py-2 w-full text-sm hover:bg-orange-600 rounded-md transition"
          >
            <UserCheck size={20} />
            {!collapsed && <span>Profil</span>}
          </button>

          {!collapsed && showMenu && (
            <div className="absolute bottom-14 left-4 w-48 bg-white text-gray-700 rounded shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-orange-600 hover:text-white transition rounded"
              >
                <LogOut className="inline-block mr-2" size={16} /> Se déconnecter
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-1 flex flex-col relative">
        {/* TOPBAR */}
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
          <div className="flex items-center gap-4 text-gray-800 font-medium">
            <span className="text-lg hidden md:inline">Espace Gestionnaire</span>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-gray-100 border border-gray-300 rounded-md pl-8 pr-3 py-1 text-sm focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-500" />
            </div>

            <Link to="/notifications">
              <Bell className="text-gray-600 hover:text-orange-600 w-5 h-5 cursor-pointer" />
            </Link>

            <button onClick={() => setShowProfileCard(!showProfileCard)}>
              <UserCircle className="text-gray-700 hover:text-orange-600 w-7 h-7 cursor-pointer" />
            </button>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>

        {/* CARTE PROFIL */}
        {showProfileCard && (
          <div
            ref={profileRef}
            className="absolute top-20 right-6 w-80 bg-orange-200 rounded-lg shadow-xl border border-gray-200 z-50 p-5"
          >
            <div className="flex flex-col items-center cursor-pointer group">
              <img
                src="/images/logoCo2.png"
                alt="Profil"
                className="w-20 h-30 rounded-full group-hover:border-orange-800 transition"
              />
              <span className="text-xs text-gray-700 group-hover:text-gray-600">Mon Profil</span>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Nom :</strong> Doe</p>
              <p><strong>Prénom :</strong> Jean</p>
              <p><strong>Email :</strong> gestionnaire@port.com</p>
              <p><strong>Poste :</strong> Gestionnaire EPI</p>
              <p><strong>Service :</strong> Logistique</p>
            </div>
          </div>
        )}
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition group
         ${
           isActive
             ? "bg-orange-600 text-gray-700"
             : "text-gray-600 hover:bg-orange-600 hover:text-gray-800"
         }`
      }
    >
      <span className="w-5 h-5">{icon}</span>
      {!collapsed && <span className="group-hover:font-semibold">{label}</span>}
      {!collapsed && <ChevronRight className="ml-auto opacity-30" size={14} />}
    </NavLink>
  );
}
