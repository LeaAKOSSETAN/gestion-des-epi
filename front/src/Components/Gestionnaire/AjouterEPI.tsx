import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GestionnaireLayout from "./GestionnaireLayout";

const AjouterEPI = () => {
  const [form, setForm] = useState({
    nom: "",
    categorie: "",
    quantite: "",
    seuil: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("EPI ajouté :", form);
    // Envoyer les données au backend ici
    navigate("/gestionnaire"); // Redirection après ajout
  };

  return (
    <GestionnaireLayout>
    <div className="min-h-screen bg-gray-50 px-4 py-4 flex items-start justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl mt-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-1">Ajouter un nouvel EPI</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nom" className="block text-gray-700 font-medium mb-1">
                Nom de l’EPI
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                value={form.nom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex : Casque de sécurité"
              />
            </div>

            <div>
              <label htmlFor="categorie" className="block text-gray-700 font-medium mb-1">
                Catégorie
              </label>
              <input
                type="text"
                name="categorie"
                id="categorie"
                value={form.categorie}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex : Protection tête"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="quantite" className="block text-gray-700 font-medium mb-1">
                  Quantité en stock
                </label>
                <input
                  type="number"
                  name="quantite"
                  id="quantite"
                  value={form.quantite}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex : 50"
                />
              </div>

              <div>
                <label htmlFor="seuil" className="block text-gray-700 font-medium mb-1">
                  Seuil critique
                </label>
                <input
                  type="number"
                  name="seuil"
                  id="seuil"
                  value={form.seuil}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex : 10"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => navigate("/gestionnaire")}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg shadow-md transition"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="bg-sky-700 hover:bg-sky-500 text-white px-6 py-2 rounded-lg shadow-md transition"
              >
                Enregistrer
              </button>
            </div>

          </form>
        </div>
      </div>
    </GestionnaireLayout>
  );
};

export default AjouterEPI;
