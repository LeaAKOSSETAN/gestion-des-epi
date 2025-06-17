import React, { useState } from "react";
import AdminLayout from "./AdminLayout";

export default function AdminAddUser() {
  const [form, setForm] = useState({ nom: "", prenoms: "", email: "", role: "GESTIONNAIRE" });
  const handleChange = (e: { target: { name: any; value: any; }; }) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: { preventDefault: () => void; }) => { e.preventDefault(); alert("Utilisateur ajouté"); };

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ajouter un utilisateur</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nom" placeholder="Nom" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
          <input name="prenoms" placeholder="Prénoms" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded-lg" />
          <select name="role" onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="GESTIONNAIRE">Gestionnaire</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="bg-gray-800 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">Créer</button>
        </form>
      </div>
    </AdminLayout>
  );
}

