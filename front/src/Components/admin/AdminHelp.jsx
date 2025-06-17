import React from "react";
import AdminLayout from "./AdminLayout";

export default function AdminHelp() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Aide & Support</h2>
        <p className="text-gray-600 mb-4">
          Pour toute assistance, veuillez contacter l'administrateur ou consulter la documentation technique.
        </p>
        <ul className="list-disc ml-5 text-gray-700">
          <li>FAQ</li>
          <li>Guide utilisateur</li>
          <li>Contacter le support</li>
        </ul>
      </div>
    </AdminLayout>
  );
}