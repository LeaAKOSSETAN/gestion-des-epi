import React from "react";
import AdminLayout from "./AdminLayout";

export default function AdminUsers() {
  const users = [
    { id: 1, nom: "Doe", prenoms: "John", email: "john@example.com", role: "Admin" },
    { id: 2, nom: "Smith", prenoms: "Anna", email: "anna@example.com", role: "Gestionnaire" },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comptes Utilisateurs</h2>
        <table className="w-full text-left border border-gray-200 bg-white rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Nom</th>
              <th className="p-3">Prénoms</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rôle</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.nom}</td>
                <td className="p-3">{user.prenoms}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 text-sm text-orange-600 hover:underline cursor-pointer">Modifier</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
