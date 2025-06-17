import React from "react";
import AdminLayout from "./AdminLayout";

export default function AdminJournal() {
  const logs = [
    { date: "2025-06-17", action: "Connexion", user: "admin" },
    { date: "2025-06-16", action: "Ajout utilisateur", user: "dqse1" },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Journal des Activités</h2>
        <table className="w-full bg-white border rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Utilisateur</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{log.date}</td>
                <td className="p-3">{log.action}</td>
                <td className="p-3">{log.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
