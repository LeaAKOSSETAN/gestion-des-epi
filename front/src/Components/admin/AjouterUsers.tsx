import React, { useState } from "react";
import AdminLayout from "../admin/AdminLayout";

export default function AjouterUsers() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    role: "gestionnaire",
    actif: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", form);
    // Appel à l'API Spring Boot ici
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Créer un nouvel utilisateur
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Nom complet</label>
            <input
              type="text"
              name="nom"
              placeholder="Jean Dupont"
              value={form.nom}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Adresse email</label>
            <input
              type="email"
              name="email"
              placeholder="exemple@domaine.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Rôle</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gestionnaire">Gestionnaire</option>
              <option value="chef_departement">Chef de département</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
          >
            Créer le compte
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
