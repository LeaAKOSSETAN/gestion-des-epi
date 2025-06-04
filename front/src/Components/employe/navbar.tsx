import { NavLink } from "react-router-dom";
import { UserCheck } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/demande-epi", label: "Demande" },
  { to: "/historique-demandes", label: "Historique des demandes" },
  { to: "/ListeDispo", label: "EPI disponibles" },
  { to: "/historique", label: "Historique mise à dispo" },
];

function EmployeeNavbar() {
  const user = {
    name: "John Doe",
    role: "Chef de Département",
  };

  const handleLogout = () => {
    alert("Déconnexion réussie!");
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-400 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Espace Employé</h1>
      <div className="space-x-6 flex items-center">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `hover:underline transition duration-200 ${isActive ? "font-semibold underline" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Profil utilisateur avec UserCheck */}
        <div className="flex items-center ml-6 space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <UserCheck className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm">{user.name}</p>
            <p className="text-xs text-gray-200">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-4 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default EmployeeNavbar;