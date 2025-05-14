import { NavLink } from "react-router-dom";
import { UserCheck } from "lucide-react";

const links = [
  { to: "/DQHSE/DQHSE-Dashboard", label: "Dashboard DQHSE" },
  { to: "/DQHSE/Validation-demande", label: "validation des demande" },
  { to: "/DQHSE/Transactions-plateforme", label: "historique des transactions" },
  { to: "/DQHSE/Historique", label: "Historique des Demandes en cours" },
  { to: "/Dashboard", label: " Espaces Employe" },
];

function DQHSENavbar() {
  // Exemple de données utilisateur (à adapter selon ton système d'authentification)
  const user = {
    name: "John Doe",
    role: "Chef de Département",
  };

  const handleLogout = () => {
    // Logique pour déconnexion, par exemple, supprimer le token ou rediriger vers une page de déconnexion
    alert("Déconnexion réussie!");
    // Tu peux utiliser une méthode de ton choix pour gérer la déconnexion, comme clear localStorage ou rediriger.
    window.location.href = "/"; // Rediriger vers la page de login après déconnexion
  };

  return (
    <nav className="bg-blue-400 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Espace DQHSE</h1>
      <div className="space-x-6 flex items-center">
        {/* Liens de navigation */}
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

        {/* Profil utilisateur */}
        <div className="flex items-center ml-6">
          {/* Icône bonhomme */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <UserCheck className="text-blue-600 w-6 h-6" />
          </div>
          <div className="ml-3">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs text-gray-200">{user.role}</p>
          </div>

          {/* Bouton Déconnexion */}
          <button
            onClick={handleLogout}
            className="ml-6 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DQHSENavbar;