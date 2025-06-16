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







import React, { useState } from "react";
import AdminLayout from "./AdminLayout"; // Ou DashboardLayout si tu préfères
import { UserCheck, UserX, Users, PlusCircle, Search } from "lucide-react";

export default function AdminDashboard() {
  const users = [
    { id: 1, firstName: "Alice", lastName: "Doe", email: "alice@example.com", department: "RH", role: "Utilisateur", status: "Active" },
    { id: 2, firstName: "Bob", lastName: "Smith", email: "bob@example.com", department: "Logistique", role: "Administrateur", status: "Inactive" },
    { id: 3, firstName: "Charlie", lastName: "Rose", email: "charlie@example.com", department: "Maintenance", role: "Utilisateur", status: "Inactive" },
    { id: 4, firstName: "Diane", lastName: "Dupont", email: "diane@example.com", department: "Sécurité", role: "Utilisateur", status: "Active" },
    { id: 5, firstName: "Émile", lastName: "Durand", email: "emile@example.com", department: "RH", role: "Inactif", status: "Inactive" }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer en cherchant dans TOUTES les propriétés de chaque utilisateur
  const filteredUsers = users.filter(user => {
    // Récupérer toutes les valeurs, les mettre en string et minuscules
    const values = Object.values(user).map(val => String(val).toLowerCase());
    // Vérifier si le terme de recherche est présent dans au moins une valeur
    return values.some(val => val.includes(searchTerm.toLowerCase()));
  });

  const getStatusClass = (status: string) =>
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <AdminLayout>
      <div className="p-6 space-y-8 w-full background-gray-100" >

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={<UserCheck className="text-green-500 w-7 h-7" />}
            label="Comptes actifs"
            value={users.filter(u => u.status === "Active").length.toString()}
            color="green"
          />
          <StatCard
            icon={<UserX className="text-red-500 w-7 h-7" />}
            label="Comptes inactifs"
            value={users.filter(u => u.status !== "Active").length.toString()}
            color="red"
          />
          <StatCard
            icon={<Users className="text-blue-500 w-7 h-7" />}
            label="Tous les utilisateurs"
            value={users.length.toString()}
            color="blue"
          />
          <StatCard
            icon={<PlusCircle className="text-gray-800 w-7 h-7" />}
            label="Créer un compte"
            value="+ Ajouter"
            color="gray"
          />
        </div>

        {/* Recherche + Tableau */}
        <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Liste des utilisateurs</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className=" border-gray-500 px-3 py-1 rounded-md  px-6 py-1 text-sm bg-gray-100 text-gray-800 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <table className="min-w-full table-auto text-left text-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Nom</th>
                <th className="px-6 py-3 text-sm font-semibold">Prénom</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Département</th>
                <th className="px-6 py-3 text-sm font-semibold">Poste</th>
                <th className="px-6 py-3 text-sm font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`bg-white shadow-md rounded-xl p-6 border-t-4 border-${color}-400`}>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
    </div>
  );
}
