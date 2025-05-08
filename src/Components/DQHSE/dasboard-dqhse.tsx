import DQHSENavbar from "./Navbar";

function DqhseDashboard() {
    const totalDemandes = 50;
    const demandesValidees = 30;
    const demandesEnAttente = 20;
    const historiques = 75;
  
    return (
    <div>
<DQHSENavbar/>
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
    </div>
    );
  }
  
  export default DqhseDashboard;
  