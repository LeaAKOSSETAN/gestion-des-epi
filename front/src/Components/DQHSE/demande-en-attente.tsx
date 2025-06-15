import DqhseLayout from "./DqhseLayout";

function DqhseDemandesEnAttente() {
    const demandes = [
      {
        id: 1,
        nom: "Jean Houngbédji",
        email: "jean@port.com",
        departement: "Maintenance",
        objet: "Demande de casque",
        statutChef: "Validé",
        statutDqhse: "En attente",
        date: "2025-05-08",
      },
      {
        id: 2,
        nom: "Sandra Zinsou",
        email: "sandra@port.com",
        departement: "Sécurité",
        objet: "Demande de bottes",
        statutChef: "Validé",
        statutDqhse: "En attente",
        date: "2025-05-07",
      },
    ];
  
    return (
     <div>
  <DqhseLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Demandes en attente de validation finale</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-yellow-200">
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Département</th>
              <th className="p-2">Objet</th>
              <th className="p-2">Statut Chef</th>
              <th className="p-2">Statut DQHSE</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id} className="border-t text-center">
                <td className="p-2">{demande.nom}</td>
                <td className="p-2">{demande.email}</td>
                <td className="p-2">{demande.departement}</td>
                <td className="p-2">{demande.objet}</td>
                <td className="p-2 text-green-600">{demande.statutChef}</td>
                <td className="p-2 text-yellow-600">{demande.statutDqhse}</td>
                <td className="p-2">{demande.date}</td>
                <td className="p-2 space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Valider</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Rejeter</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </DqhseLayout>
    
     </div>
    );
  }
  
  export default DqhseDemandesEnAttente;
  