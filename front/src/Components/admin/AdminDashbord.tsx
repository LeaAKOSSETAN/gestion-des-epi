import React,{ useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { UserCheck, UserX, Users, PlusCircle } from "lucide-react";
import { LogOut, UserCircle } from "lucide-react";

export default function AdminDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ici tu peux nettoyer les données d'authentification
    // ex : localStorage.removeItem("token");
    navigate("/login"); // Redirection après déconnexion
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 shadow p-6 flex justify-between items-center relative">
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

      {/* Main content */}
      <main className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cartes */}
          <Link
            to="/admin/comptes-actifs"
            className="bg-white border-l-4 border-green-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <UserCheck className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Comptes actifs</h3>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/comptes-inactifs"
            className="bg-white border-l-4 border-red-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <UserX className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Comptes inactifs</h3>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/utilisateurs"
            className="bg-white border-l-4 border-blue-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Tous les comptes</h3>
                <p className="text-2xl font-bold text-gray-800">17</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/ajouter-utilisateur"
            className="bg-white border-l-4 border-gray-700 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <PlusCircle className="w-8 h-8 text-gray-800 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Créer un compte</h3>
                <p className="text-2xl font-bold text-gray-800">+ Ajouter</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
