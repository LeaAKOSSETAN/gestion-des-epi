// import React from "react";
// import { Link } from "react-router-dom";
// import { LayoutDashboard, Users, Folder, DollarSign, HelpCircle } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white shadow h-screen flex flex-col justify-between p-6">
//       <div>
//         <h1 className="text-xl font-bold mb-8">Dashboard</h1>
//         <nav className="flex flex-col space-y-4">
//           <SidebarLink to="#" icon={<LayoutDashboard size={18} />} label="Dashboard" />
//           <SidebarLink to="#" icon={<Users size={18} />} label="Customers" active />
//           <SidebarLink to="#" icon={<Folder size={18} />} label="Products" />
//           <SidebarLink to="#" icon={<DollarSign size={18} />} label="Income" />
//           <SidebarLink to="#" icon={<HelpCircle size={18} />} label="Help" />
//         </nav>
//       </div>
//       <div className="mt-10 text-center text-sm text-gray-600">
//         <p className="mb-2">Upgrade to PRO to get access to all features</p>
//         <button className="bg-purple-500 text-white py-2 px-4 rounded-full text-sm">Get Pro Now!</button>
//         <div className="mt-6 text-left">
//           <p className="font-bold">Evano</p>
//           <p className="text-xs text-gray-400">Project Manager</p>
//         </div>
//       </div>
//     </aside>
//   );
// }

// function SidebarLink({ to, icon, label, active = false }: { to: string; icon: React.ReactNode; label: string; active?: boolean }) {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-purple-100 ${
//         active ? "bg-purple-200 text-purple-700 font-semibold" : "text-gray-700"
//       }`}
//     >
//       {icon}
//       {label}
//     </Link>
//   );
// }







// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, UserCircle, UserCheck, UserX, Users, PlusCircle, LogOut } from "lucide-react";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f0f4f9]">
//       {/* Sidebar */}
//       <aside className={`${collapsed ? "w-6" : "w-60"} bg-blue-600 text-white transition-all duration-300 flex flex-col justify-between`}>
//         <div className="p-4">
//           <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
//             {collapsed ? <Menu size={24} /> : <X size={24} />}
//           </button>
//           {!collapsed && <h1 className="text-xl font-bold mb-8">Admin EPI</h1>}
//           <nav className="flex flex-col space-y-5">
//             <SidebarLink to="/admin" icon={<UserCircle size={20} />} label="Dashboard" collapsed={collapsed} />
//             <NavLink to="/admin/comptes-actifs" icon={<UserCheck size={20} />} label="Actifs" collapsed={collapsed} />
//             <NavLink to="/admin/comptes-inactifs" icon={<UserX size={20} />} label="Inactifs" collapsed={collapsed} />
//             <NavLink to="/admin/list" icon={<Users size={20} />} label="Utilisateurs" collapsed={collapsed} />
//             <NavLink to="/admin/ajouter-utilisateur" icon={<PlusCircle size={20} />} label="Ajouter" collapsed={collapsed} />
//           </nav>
//           <nav className="flex flex-col space-y-4">
//             <SidebarLink to="#" icon={<LayoutDashboard size={18} />} label="Dashboard" />
//             <SidebarLink to="#" icon={<Users size={18} />} label="Customers" active />
//             <SidebarLink to="#" icon={<Folder size={18} />} label="Products" />
//             <SidebarLink to="#" icon={<DollarSign size={18} />} label="Income" />
//             <SidebarLink to="#" icon={<HelpCircle size={18} />} label="Help" />
//          </nav>
          
//         </div>

//         <div className="relative p-4">
//           <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 px-4 py-4 rounded-lg hover:bg-blue-500 transition-all">
//             <UserCircle className="w-6 h-6" />
//             {!collapsed && <span>Profil</span>}
//           </button>
//           {showMenu && !collapsed && (
//             <div className="absolute bottom-12 left-4 bg-white text-gray-800 rounded shadow w-48 z-30">
//               <button onClick={handleLogout} className="w-full px-0 py-2 text-sm rounded-lg hover:bg-blue-500 transition-all">
//                 <LogOut className="inline mr-2" /> Se Déconnecter
//               </button>
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* Contenu principal */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {/* Barre de recherche */}
        // <div className="sticky top-0 z-10 py-0">
        //   <input
        //     type="text"
        //     placeholder="Rechercher..."
        //     className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 shadow-sm"
        //     value={searchTerm}
        //     onChange={(e) => setSearchTerm(e.target.value)}
        //   />
        // </div>
//         {children}
//       </main>
//     </div>
//   );
// }

// function NavLink({ to, icon, label, collapsed }: { to: string; icon: React.ReactNode; label: string; collapsed: boolean }) {
//   return (
//     <Link to={to} className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-blue-500 transition-all">
//       {icon}
//       {!collapsed && <span>{label}</span>}
//     </Link>
//   );
// }






import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle, UserCheck, UserX, Users, PlusCircle, LogOut, ChevronRight } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-60"} bg-blue-500 text-white transition-all duration-300 flex flex-col justify-between`}>
        <div className="p-4">
          <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
            {collapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
          {!collapsed && <h1 className="text-xl font-bold mb-8">Admin EPI</h1>}
          <nav className="flex flex-col space-y-5">
            <NavLink to="/admin" icon={<UserCircle size={20} />} label="Dashboard" collapsed={collapsed} />
            <NavLink to="/admin/comptes-actifs" icon={<UserCheck size={20} />} label="Actifs" collapsed={collapsed} />
            <NavLink to="/admin/comptes-inactifs" icon={<UserX size={20} />} label="Inactifs" collapsed={collapsed} />
            <NavLink to="/admin/list" icon={<Users size={20} />} label="Utilisateurs" collapsed={collapsed} />
            <NavLink to="/admin/ajouter-utilisateur" icon={<PlusCircle size={20} />} label="Ajouter" collapsed={collapsed} />
          </nav>
        </div>

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
      <main className="flex-1 p-5 overflow-y-auto">
        {/* Barre de recherche
        <div className="sticky top-0 z-10 py-0">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
        {children}
      </main>
    </div>
  );
}

function NavLink({ to, icon, label, collapsed }: { to: string; icon: React.ReactNode; label: string; collapsed: boolean }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-blue-500 transition-all text-white"
    >
      <div className="flex items-center gap-2">
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && <ChevronRight size={16} />}
    </Link>
  );
}

