import React from "react";
import EmployeNavbar from "./EmployeNavbar";

export default function Notifications() {
  const alerts = [
    { message: "Votre demande de gilet a été approuvée.", date: "2025-06-15" },
    { message: "Stock faible pour les lunettes de protection.", date: "2025-06-14" },
  ];

  return (
    <div>
      <EmployeNavbar >
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-sky-900 mb-4">Notifications</h2>
      <ul className="space-y-3">
        {alerts.map((notif, idx) => (
          <li key={idx} className="p-3 bg-sky-50 border-l-4 border-sky-700 rounded">
            <p className="text-sky-900 text-sm">{notif.message}</p>
            <span className="text-xs text-gray-500">{notif.date}</span>
          </li>
        ))}
      </ul>
    </div>
      </EmployeNavbar>
    </div>
  );


}