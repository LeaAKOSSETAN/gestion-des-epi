import { Layout } from "lucide-react";
import DqhseLayout from "./DqhseLayout";

function DqhseValidationDemandes() {
    const demandes = [
      {
        id: 1,
        nom: "Agossou Noël",
        departement: "Technique",
        objet: "Demande de casque",
        statutChef: "Validé",
        statutDqhse: "En attente",
      },
      // autres données...
    ];
  
    const valider = (id: number) => {
      alert(`Demande ${id} validée par le DQHSE`);
    };
  
    const rejeter = (id: number) => {
      alert(`Demande ${id} rejetée par le DQHSE`);
    };
  
    return (
      <div>
        <DqhseLayout>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Demandes à valider</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Employé</th>
                  <th className="p-2">Département</th>
                  <th className="p-2">Objet</th>
                  <th className="p-2">Statut Chef</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-2">{d.nom}</td>
                    <td className="p-2">{d.departement}</td>
                    <td className="p-2">{d.objet}</td>
                    <td className="p-2">{d.statutChef}</td>
                    <td className="p-2 space-x-2">
                      <button onClick={() => valider(d.id)} className="bg-green-600 text-white px-3 py-1 rounded">
                        Valider
                      </button>
                      <button onClick={() => rejeter(d.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                        Rejeter
                      </button>
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
  export default DqhseValidationDemandes