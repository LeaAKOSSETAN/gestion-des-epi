import React from "react";
import EmployeNavbar from "./EmployeNavbar";

export default function Dotations() {
  const dotations = [
    { date: "2025-06-01", epi: "Casque", quantite: 1 },
    { date: "2025-05-20", epi: "Gants de sécurité", quantite: 2 },
  ];

  return (
    <EmployeNavbar>
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-sky-900 mb-4">Mes Dotations</h2>
      <table className="w-full text-sm">
        <thead className="bg-sky-100 text-sky-900">
          <tr>
            <th className="text-left px-3 py-2">Date</th>
            <th className="text-left px-3 py-2">EPI</th>
            <th className="text-left px-3 py-2">Quantité</th>
          </tr>
        </thead>
        <tbody>
          {dotations.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-3 py-2">{item.date}</td>
              <td className="px-3 py-2">{item.epi}</td>
              <td className="px-3 py-2">{item.quantite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </EmployeNavbar>
  );
}