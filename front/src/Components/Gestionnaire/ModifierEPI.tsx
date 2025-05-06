import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifierEPI = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    categorie: "",
    quantite: "",
    seuil: "",
  });

  useEffect(() => {
    // ✅ Ici on déclare bien epiExistant à l'intérieur du useEffect
    const epiExistant = {
      nom: "Gants anti-coupure",
      categorie: "Protection Mains",
      quantite: "25",
      seuil: "5",
    };

    setForm(epiExistant); // ✅ Cette ligne est correcte maintenant
  }, [id]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("EPI modifié :", { id, ...form });
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Modifier l'EPI</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" placeholder="Nom de l'EPI" value={form.nom} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="text" name="categorie" placeholder="Catégorie" value={form.categorie} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="number" name="quantite" placeholder="Quantité" value={form.quantite} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="number" name="seuil" placeholder="Seuil critique" value={form.seuil} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Mettre à jour
          </button>
          <button type="button" className="text-gray-600 hover:underline" onClick={() => navigate("/")}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifierEPI;
