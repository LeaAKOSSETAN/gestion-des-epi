// import { JSX, useState } from "react";
// import EmployeNavbar from "./EmployeNavbar";
// import {
//   CheckCircle,
//   Clipboard,
//   Clock,
//   XCircle,
//   Search,
//   Truck,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// function Dashboard() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const [demandes, setDemandes] = useState<any[]>(() => {
//     const data = localStorage.getItem("demandes");
//     if (data) return JSON.parse(data);

//     const fakeDemandes = [
//       {
//         id: 1,
//         dateDemande: "2025-06-15",
//         statutDemande: "En attente",
//         statutLivraison: "Non livrée",
//       },
//       {
//         id: 2,
//         dateDemande: "2025-06-10",
//         statutDemande: "Validée",
//         statutLivraison: "En cours",
//       },
//       {
//         id: 3,
//         dateDemande: "2025-06-05",
//         statutDemande: "Refusée",
//         statutLivraison: "Non livrée",
//       },
//       {
//         id: 4,
//         dateDemande: "2025-06-01",
//         statutDemande: "Validée",
//         statutLivraison: "Livrée",
//       },
//     ];

//     localStorage.setItem("demandes", JSON.stringify(fakeDemandes));
//     return fakeDemandes;
//   });

//   const countStatutDemande = (statut: string) =>
//     demandes.filter((d) => d.statutDemande === statut).length;

//   const countStatutLivraison = (statut: string) =>
//     demandes.filter((d) => d.statutLivraison === statut).length;

//   const totalDemandes = demandes.length;

//   const filteredUsers = demandes.filter((demande) => {
//     const values = Object.values(demande).map((val) =>
//       String(val).toLowerCase()
//     );
//     return values.some((val) => val.includes(searchTerm.toLowerCase()));
//   });

//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case "Livrée":
//         return "bg-green-100 text-green-700";
//       case "En cours":
//         return "bg-blue-100 text-blue-700";
//       case "Non livrée":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const navigate = useNavigate();

//   const handleModifier = (id: number) => {
//     navigate(`/modifier-demande/${id}`);
//   };

//   const handleSupprimer = (id: number) => {
//     const confirmDelete = window.confirm("Supprimer cette demande ?");
//     if (confirmDelete) {
//       const nouvelles = demandes.filter((d) => d.id !== id);
//       setDemandes(nouvelles);
//       localStorage.setItem("demandes", JSON.stringify(nouvelles));
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <EmployeNavbar>
//         <div className="p-8 max-w-7xl mx-auto">
//           {/* Statistiques */}
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          //   <StatCard
          //     icon={<Clipboard size={28} />}
          //     label="Demandes"
          //     count={totalDemandes}
          //     color="bg-orange-100 text-orange-600"
          //   />
          //   <StatCard
          //     icon={<Clock size={28} />}
          //     label="En attente"
          //     count={countStatutDemande("En attente")}
          //     color="bg-yellow-100 text-yellow-700"
          //   />
          //   <StatCard
          //     icon={<CheckCircle size={28} />}
          //     label="Validées"
          //     count={countStatutDemande("Validée")}
          //     color="bg-green-100 text-green-700"
          //   />
          //   <StatCard
          //     icon={<XCircle size={28} />}
          //     label="Refusées"
          //     count={countStatutDemande("Refusée")}
          //     color="bg-rose-100 text-rose-700"
          //   />
          //   <StatCard
          //     icon={<Truck size={28} />}
          //     label="Livrées"
          //     count={countStatutLivraison("Livrée")}
          //     color="bg-green-100 text-green-700"
          //   />
          //   <StatCard
          //     icon={<Truck size={28} />}
          //     label="En cours"
          //     count={countStatutLivraison("En cours")}
          //     color="bg-blue-100 text-blue-700"
          //   />
          //   <StatCard
          //     icon={<Truck size={28} />}
          //     label="Non livrées"
          //     count={countStatutLivraison("Non livrée")}
          //     color="bg-red-100 text-red-700"
          //   />
          // </div>

//           {/* Barre de recherche + bouton */}
//           <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
//             <h3 className="text-xl font-semibold text-gray-900">Liste des Demandes</h3>
//             <div className="flex items-center space-x-2 w-full md:w-auto">
//               <div className="relative w-full md:w-72">
//                 <input
//                   type="text"
//                   placeholder="Rechercher..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-700 focus:outline-none"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
//               </div>
//               <Link
//                 to="/demande-epi"
//                 className="bg-orange-600 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 +Demande
//               </Link>
//             </div>
//           </div>

//           {/* Tableau */}
//           <div className="bg-white mt-8 shadow-xl rounded-xl overflow-hidden border border-gray-100">
//             <table className="min-w-full table-auto text-sm text-left">
//               <thead className="bg-orange-600 text-gray-800">
//                 <tr>
//                   <th className="px-6 py-4 font-medium">Date de Demande</th>
//                   <th className="px-6 py-4 font-medium">Statut de Demande</th>
//                   <th className="px-6 py-4 font-medium">Statut de Livraison</th>
//                   <th className="px-6 py-4 font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((demande) => (
//                     <tr key={demande.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">{demande.dateDemande}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{demande.statutDemande}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(demande.statutLivraison)}`}
//                         >
//                           {demande.statutLivraison}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap space-x-2">
//                         <button
//                           onClick={() => handleModifier(demande.id)}
//                           className="text-blue-700 hover:underline font-medium"
//                         >
//                           Modifier
//                         </button>
//                         <button
//                           onClick={() => handleSupprimer(demande.id)}
//                           className="text-rose-600 hover:underline font-medium"
//                         >
//                           Supprimer
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       Aucune Demande trouvée.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </EmployeNavbar>
//     </div>
//   );
// }

// function StatCard({
//   icon,
//   count,
//   label,
//   color,
// }: {
//   icon: JSX.Element;
//   label: string;
//   count: number;
//   color: string;
// }) {
//   return (
//     <div
//       className={`flex items-center p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 gap-4`}
//     >
//       <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}>{icon}</div>
//       <div>
//         <p className="text-2xl font-semibold text-gray-900">{count}</p>
//         <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">{label}</p>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;











import { JSX } from "react";
import EmployeNavbar from "./EmployeNavbar";
import { Search, XCircle, CheckCircle, Clipboard, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Fonction simulée pour compter les statuts
function countStatutDemande(statut: string): number {
  const dataSimulee = [
    { statut: "En attente" },
    { statut: "Validée" },
    { statut: "Refusée" },
    { statut: "Validée" },
  ];
  return dataSimulee.filter(d => d.statut === statut).length;
}

// Composant StatCard
function StatCard({
  icon,
  count,
  label,
  color,
}: {
  icon: JSX.Element;
  label: string;
  count: number;
  color: string;
}): JSX.Element {
  return (
    <div className={`flex items-center p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 gap-4`}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-gray-900">{count}</p>
        <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}

// Composant principal
function Dashboard() {
  const totalDemandes = 4;

  return (
    <div className="bg-gray-50 min-h-screen">
      <EmployeNavbar>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Statistiques */}
          <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={<Clipboard size={28} />}
              label="Demandes"
              count={totalDemandes}
              color="bg-orange-100 text-orange-600"
            />
            <StatCard
              icon={<Clock size={28} />}
              label="En attente"
              count={countStatutDemande("En attente")}
              color="bg-yellow-100 text-yellow-700"
            />
            <StatCard
              icon={<CheckCircle size={28} />}
              label="Validées"
              count={countStatutDemande("Validée")}
              color="bg-green-100 text-green-700"
            />
            <StatCard
              icon={<XCircle size={28} />}
              label="Refusées"
              count={countStatutDemande("Refusée")}
              color="bg-rose-100 text-rose-700"
            />
          </div>

          {/* En-tête et recherche */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Liste des Demandes</h3>
            <div className="flex items-center space-x-2">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
              </div>
              <Link
                to="/demande-epi"
                className="bg-orange-600 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                +Demande
              </Link>
            </div>
          </div>

          {/* Tableau statique */}
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-orange-600 text-gray-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Date de Demande</th>
                  <th className="px-6 py-4 font-medium">Statut de Demande</th>
                  <th className="px-6 py-4 font-medium">Statut de Livraison</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2025-06-15</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      En attente
                    </span>
                  </td> 
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Non livrée
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-700 hover:underline font-medium">Modifier</button>
                    <button className="text-rose-600 hover:underline font-medium">Supprimer</button>
                  </td>
                </tr>
                                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2025-06-15</td>
                 <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      En attente
                    </span>
                  </td>                   <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Non livrée
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-700 hover:underline font-medium">Modifier</button>
                    <button className="text-rose-600 hover:underline font-medium">Supprimer</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2025-06-10</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Validée
                    </span>
                  </td>                  
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      En cours
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-700 hover:underline font-medium">Modifier</button>
                    <button className="text-rose-600 hover:underline font-medium">Supprimer</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2025-06-05</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Refusée
                    </span>
                  </td>                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Non livrée
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-700 hover:underline font-medium">Modifier</button>
                    <button className="text-rose-600 hover:underline font-medium">Supprimer</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">2025-06-01</td>
                                    <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Validée
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Livrée
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-700 hover:underline font-medium">Modifier</button>
                    <button className="text-rose-600 hover:underline font-medium">Supprimer</button>
                  </td>
                </tr>
                {/* Autres lignes */}
              </tbody>
            </table>
          </div>
        </div>
      </EmployeNavbar>
    </div>
  );
}

export default Dashboard;
