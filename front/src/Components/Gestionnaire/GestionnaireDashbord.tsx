import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Package, ClipboardList, Truck, History, LogOut, UserCircle, PlusCircle} from "lucide-react";

export default function GestionnaireDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Nettoyage session ou token
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 shadow p-6 flex justify-between items-center relative">
        <h1 className="text-3xl font-bold text-white">Tableau de bord Gestionnaire</h1>
        <div className="flex items-center space-x-6">
          <nav className="space-x-6">
            <Link to="/gestionnaire" className="text-white hover:text-yellow-200 font-medium">
              Dashboard
            </Link>
            <Link to="/gestionnaire/stock" className="text-white hover:text-yellow-200 font-medium">
              Stock
            </Link>
            <Link to="/gestionnaire/reapprovisionnement" className="text-white hover:text-yellow-200 font-medium">
              Réapprovisionnement
            </Link>
            <Link to="/gestionnaire/livraison" className="text-white hover:text-yellow-200 font-medium">
              Livraisons
            </Link>
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
            to="/gestionnaire/stock"
            className="bg-white border-l-4 border-blue-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Stock</h3>
                <p className="text-2xl font-bold text-gray-800">235 produits</p>
              </div>
            </div>
          </Link>

          <Link
            to="/gestionnaire/reapprovisionnement"
            className="bg-white border-l-4 border-yellow-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <ClipboardList className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Réapprovisionnement</h3>
                <p className="text-2xl font-bold text-gray-800">8 demandes</p>
              </div>
            </div>
          </Link>

          <Link
            to="/gestionnaire/livraison"
            className="bg-white border-l-4 border-green-500 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <Truck className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Livraisons</h3>
                <p className="text-2xl font-bold text-gray-800">3 en cours</p>
              </div>
            </div>
          </Link>

          <Link
            to="/gestionnaire/historique"
            className="bg-white border-l-4 border-gray-700 hover:shadow-lg p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <History className="w-8 h-8 text-gray-800 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-gray-600 text-sm uppercase font-semibold">Historique</h3>
                <p className="text-2xl font-bold text-gray-800">+ de 120 logs</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
