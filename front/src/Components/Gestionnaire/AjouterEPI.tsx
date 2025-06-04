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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("EPI ajouté :", form);
    // Envoie vers le backend ici
    navigate("/"); // Retour à la liste
  };

  return (
    <GestionnaireLayout>
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Ajouter un EPI</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="nom" placeholder="Nom de l'EPI" value={form.nom} onChange={handleChange} required className="w-full border p-2 rounded"/>
          <input type="text" name="categorie" placeholder="Catégorie" value={form.categorie} onChange={handleChange} required className="w-full border p-2 rounded"/>
          <input type="number" name="quantite" placeholder="Quantité" value={form.quantite} onChange={handleChange} required className="w-full border p-2 rounded"/>
          <input type="number" name="seuil" placeholder="Seuil critique" value={form.seuil} onChange={handleChange} required className="w-full border p-2 rounded"/>
          <div className="flex justify-between">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Enregistrer
            </button>
            <button type="button" className="text-gray-600 hover:underline" onClick={() => navigate("/")}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </GestionnaireLayout>
    
  );
};

export default AjouterEPI;
