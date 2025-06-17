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







import React from "react";
import AdminLayout from "./AdminLayout";
import { Users, Settings, FileText, Shield, HelpCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Utilisateurs", value: 124, icon: <Users className="text-orange-500" /> },
    { title: "Rôles", value: 6, icon: <Shield className="text-orange-500" /> },
    { title: "Journaux", value: 189, icon: <FileText className="text-orange-500" /> },
    { title: "Paramètres", value: "OK", icon: <Settings className="text-orange-500" /> },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord Administrateur</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-5 flex items-center space-x-4 border border-gray-100"
            >
              <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}