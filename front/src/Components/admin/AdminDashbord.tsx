import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, UserX } from "lucide-react";

function StatCard({ icon, title, value, color, onClick }: any) {
  return (
    <div
      className={`cursor-pointer rounded-xl shadow p-5 flex items-center gap-4 ${color} text-white transition hover:scale-105`}
      onClick={onClick}
    >
      <div className="bg-white bg-opacity-20 rounded-full p-2">{icon}</div>
      <div>
        <h3 className="text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashbord() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord Administrateur</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-white" />}
          title="Tous les comptes"
          value="10"
          color="bg-blue-500"
          onClick={() => navigate("/admin/users")}
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6 text-white" />}
          title="Comptes actifs"
          value="6"
          color="bg-green-500"
          onClick={() => navigate("/admin/users/actifs")}
        />
        <StatCard
          icon={<UserX className="w-6 h-6 text-white" />}
          title="Comptes inactifs"
          value="4"
          color="bg-red-500"
          onClick={() => navigate("/admin/users/inactifs")}
        />
      </div>
    </div>
  );
}
