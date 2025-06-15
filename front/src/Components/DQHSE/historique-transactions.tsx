import DqhseLayout from "./DqhseLayout";

function DqhseHistoriqueTransactions() {
    const historique = [
      {
        id: 1,
        nom: "Agossou Noël",
        email: "noel@port.com",
        departement: "Technique",
        objet: "Demande de gilet",
        statutFinal: "Validé",
        validePar: "Chef + DQHSE",
        date: "2025-05-07",
      },
      {
        id: 2,
        nom: "Yao Célestine",
        email: "celestine@port.com",
        departement: "Sécurité",
        objet: "Demande de gant",
        statutFinal: "Rejeté",
        validePar: "Chef uniquement",
        date: "2025-05-06",
      },
    ];
  
    return (
    <div>
    <DqhseLayout >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Historique des transactions</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-200">
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Département</th>
              <th className="p-2">Objet</th>
              <th className="p-2">Statut Final</th>
              <th className="p-2">Validé Par</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {historique.map((entry) => (
              <tr key={entry.id} className="border-t text-center">
                <td className="p-2">{entry.nom}</td>
                <td className="p-2">{entry.email}</td>
                <td className="p-2">{entry.departement}</td>
                <td className="p-2">{entry.objet}</td>
                <td className={`p-2 ${entry.statutFinal === "Validé" ? "text-green-600" : "text-red-600"}`}>
                  {entry.statutFinal}
                </td>
                <td className="p-2">{entry.validePar}</td>
                <td className="p-2">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </DqhseLayout>
    
    </div>
    );
  }
  
  export default DqhseHistoriqueTransactions;
