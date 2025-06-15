import React from "react";
import DqhseLayout from "./DqhseLayout";

function DqhseDashboard() {
    const totalDemandes = 50;
    const demandesValidees = 30;
    const demandesEnAttente = 20;
    const historiques = 75;
  
    return (
        <DqhseLayout>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Tableau de bord DQHSE</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-400 text-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold">Total demandes</h2>
                <p className="text-3xl mt-2">{totalDemandes}</p>
              </div>
      
              <div className="bg-green-400 text-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold">Demandes validées</h2>
                <p className="text-3xl mt-2">{demandesValidees}</p>
              </div>
      
              <div className="bg-yellow-500 text-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold">Demandes en attente</h2>
                <p className="text-3xl mt-2">{demandesEnAttente}</p>
              </div>
      
              <div className="bg-purple-300 text-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold">Historique total</h2>
                <p className="text-3xl mt-2">{historiques}</p>
              </div>
            </div>
          </div>
        </DqhseLayout>
      
    );
  }
  
  export default DqhseDashboard;
  


// import React from "react";
// import Navbar from "./Navbar";

// function DqhseDashboard() {
//   const stats = {
//     totalDemandes: 50,
//     demandesValidees: 30,
//     demandesEnAttente: 20,
//     historiques: 75,
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-6">Tableau de bord DQHSE</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card title="Total demandes" value={stats.totalDemandes} bgColor="bg-blue-400" />
//           <Card title="Demandes validées" value={stats.demandesValidees} bgColor="bg-green-400" />
//           <Card title="Demandes en attente" value={stats.demandesEnAttente} bgColor="bg-yellow-500" />
//           <Card title="Historique total" value={stats.historiques} bgColor="bg-purple-300" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Card({ title, value, bgColor }: { title: string; value: number; bgColor: string }) {
//   return (
//     <div className={`${bgColor} text-white p-6 rounded shadow-md`}>
//       <h2 className="text-xl font-semibold">{title}</h2>
//       <p className="text-3xl mt-2">{value}</p>
//     </div>
//   );
// }

// export default DqhseDashboard;
