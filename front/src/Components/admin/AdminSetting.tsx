import React from "react";
import AdminLayout from "./AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Paramètres</h2>
        <p className="text-gray-600">Modifier les paramètres généraux de la plateforme.</p>
        <form className="mt-6 space-y-4">
          <input placeholder="Nom de la plateforme" className="w-full p-2 border rounded-lg" />
          <input placeholder="Email support" type="email" className="w-full p-2 border rounded-lg" />
          <button className="bg-gray-800 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">Enregistrer</button>
        </form>
      </div>
    </AdminLayout>
  );
}