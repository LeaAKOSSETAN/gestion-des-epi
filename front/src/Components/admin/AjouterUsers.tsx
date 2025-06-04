import React, { useState } from "react";
import AdminLayout from "../admin/AdminLayout";

export default function AjouterUsers() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    motDePasse: "",
    typeCompte: "GESTIONNAIRE", // correspond à l'enum Java
    poste: 1,
    status: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? parseInt(value)
        : value;

    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/creer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const message = await response.text();

      if (response.ok) {
        alert("Utilisateur créé avec succès : " + message);
        setForm({
          nom: "",
          email: "",
          motDePasse: "",
          typeCompte: "GESTIONNAIRE",
          poste: 1,
          status: true,
        });
      } else {
        alert("Erreur lors de la création : " + message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur lors de l'envoi des données !");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Créer un nouvel utilisateur
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="exemple@domaine.com"
            />
          </div>


          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Type de compte
            </label>
            <select
              name="typeCompte"
              value={form.typeCompte}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            >
              <option value="GESTIONNAIRE">Gestionnaire</option>
              <option value="ADMIN">Admin</option>
              <option value="DQHSE">DQHSE</option>
              <option value="EMPLOYE_STANDARD">Employé Standard</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              ID du poste
            </label>
            <input
              type="number"
              name="poste"
              value={form.poste}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="1"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700 font-medium">Actif</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Créer le compte
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
