import React from "react";
import AdminLayout from "./AdminLayout";

export default function AdminRoles() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Rôles</h2>
        <p className="text-gray-600">Vous pouvez ajouter, modifier ou supprimer les rôles et leurs permissions.</p>
      </div>
    </AdminLayout>
  );
}