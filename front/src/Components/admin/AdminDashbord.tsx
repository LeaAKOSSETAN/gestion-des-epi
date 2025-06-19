// pages/AdminDashboard.tsx
// import React from "react";
// import AdminLayout from "./AdminLayout";
// import { UserCheck, UserX, Users, PlusCircle } from "lucide-react";

// export default function AdminDashboard() {
//   const users = [
//     { id: 1, firstName: "Alice", lastName: "Doe", email: "alice@example.com", department: "RH", role: "Utilisateur" },
//     { id: 2, firstName: "Bob", lastName: "Smith", email: "bob@example.com", department: "Logistique", role: "Administrateur" },
//     { id: 3, firstName: "Charlie", lastName: "Rose", email: "charlie@example.com", department: "Maintenance", role: "Utilisateur" },
//     { id: 4, firstName: "Diane", lastName: "Dupont", email: "diane@example.com", department: "Sécurité", role: "Utilisateur" },
//     { id: 5, firstName: "Émile", lastName: "Durand", email: "emile@example.com", department: "RH", role: "Inactif" }
//   ];

//   return (
//     <AdminLayout>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard icon={<UserCheck className="text-green-500 w-7 h-7" />} label="Comptes actifs" value="12" color="green" />
//         <StatCard icon={<UserX className="text-red-500 w-7 h-7" />} label="Comptes inactifs" value="5" color="red" />
//         <StatCard icon={<Users className="text-blue-500 w-7 h-7" />} label="Tous les utilisateurs" value="17" color="blue" />
//         <StatCard icon={<PlusCircle className="text-gray-800 w-7 h-7" />} label="Créer un compte" value="+ Ajouter" color="gray" />
//       </div>

//       <br />
//       <div className="bg-white shadow rounded-xl overflow-x-auto mb-10">
//         <table className="min-w-full table-auto">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Prénom</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Département</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Poste</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 divide-y divide-gray-200">
//             {users.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{user.department}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </AdminLayout>
//   );
// }

// function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
//   return (
//     <div className={`bg-white shadow-md rounded-xl p-6 border-t-4 border-${color}-400`}>
//       <div className="flex items-center gap-4">
//         <div className="p-3 bg-gray-100 rounded-full">
//           {icon}
//         </div>
//         <div>
//           <p className="text-sm text-gray-600 font-medium">{label}</p>
//           <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, {JSX} from "react";
import {
  ClipboardList,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  Users,
  UserX,
  UserPlus,
  Activity,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const userStats = [
  { title: "Comptes utilisateurs", value: "102", icon: <Users size={28} />, color: "bg-orange-100 text-orange-700" },
  { title: "Comptes actifs", value: "92", icon: <UserCheck size={28} />, color: "bg-green-100 text-green-700" },
  { title: "Comptes inactifs", value: "10", icon: <UserX size={28} />, color: "bg-rose-100 text-rose-700" },
  { title: "Gestionnaires", value: "5", icon: <ShieldCheck size={28} />, color: "bg-blue-100 text-blue-700" },
];

const recentActivity = [
  { user: "Jean Doe", action: "Connexion réussie", date: "2025-06-18 10:30" },
  { user: "Marie Zinsou", action: "Création d’un compte Employé", date: "2025-06-17 14:12" },
  { user: "Admin", action: "Désactivation d’un compte", date: "2025-06-16 09:47" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord de l'administrateur</h1>

        {/* Statistiques utilisateurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {userStats.map((stat, idx) => (
            <StatCard
              key={idx}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>

        {/* Activité récente */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold mb-4 text-gray-800">Activité récente</h2>
          <ul className="divide-y divide-gray-200 text-sm">
            {recentActivity.map((item, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">{item.user}</span>
                  <span className="text-gray-500 text-xs">{item.action}</span>
                </div>
                <span className="text-xs text-gray-400">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ icon, title, value, color }: { icon: JSX.Element; title: string; value: string; color: string }) {
  return (
    <div className={`p-4 rounded-xl shadow bg-white border border-gray-200 hover:shadow-md transition-all duration-300 flex items-center gap-4 h-24`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}>{icon}</div>
      <div>
        <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">{title}</div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
