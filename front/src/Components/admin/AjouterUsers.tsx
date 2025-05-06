import React, { useState } from "react";

export default function AjouterUtilisateur() {
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
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Créer un nouvel utilisateur</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom complet"
          value={form.nom}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="gestionnaire">Gestionnaire</option>
          <option value="chef_departement">Chef de département</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Créer le compte
        </button>
      </form>
    </div>
  );
}
