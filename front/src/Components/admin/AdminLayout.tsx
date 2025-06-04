import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
      const [showMenu, setShowMenu] = useState(false);
      const navigate = useNavigate();
    
      const handleLogout = () => {
        // Ici tu peux nettoyer les données d'authentification
        // ex : localStorage.removeItem("token");
        navigate("/login"); // Redirection après déconnexion
      };
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow p-6 flex justify-between items-center relative">
        <h1 className="text-3xl font-bold text-white">Tableau de bord Administrateur</h1>
        <div className="flex items-center space-x-6">
          <nav className="space-x-6">
            <Link to="/admin" className="text-white hover:text-yellow-200 font-medium">Dashboard</Link>
            <Link to="/admin/utilisateurs" className="text-white hover:text-yellow-200 font-medium">Comptes</Link>
            <Link to="/admin/ajouter-utilisateur" className="text-white hover:text-yellow-200 font-medium">Créer un compte</Link>
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
    </div>
  );
}
