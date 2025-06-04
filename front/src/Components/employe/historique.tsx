import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react"; // pour l’icône
import EmployeeNavbar from "./navbar";

type Demande = {
  id: number;
  type: string;
  quantite: number;
  note: string;
  date: string;
  statut: string;
  heure?: string;
};

function Historique() {
  const [epiRecus, setEpiRecus] = useState<Demande[]>([]);

  useEffect(() => {
    const toutesDemandes = JSON.parse(localStorage.getItem("demandes") || "[]") as Demande[];
    const recues = toutesDemandes
      .filter((demande) => demande.statut === "Reçu")
      .map((demande) => ({
        ...demande,
        heure: demande.heure || new Date().toLocaleTimeString(),
      }));
    setEpiRecus(recues);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <EmployeeNavbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-400 mb-6">Historique des EPI reçus</h2>

        {epiRecus.length === 0 ? (
          <div className="text-center text-gray-500 italic">Aucun EPI reçu pour le moment.</div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {epiRecus.map((item) => (
              <li
                key={item.id}
                className="bg-white border-l-4 border-green-500 p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.type}</h3>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={16} /> Reçu
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  Quantité : <strong>{item.quantite}</strong>
                </p>

                <p className="text-sm text-gray-600">
                  Date : {item.date} à <span className="italic">{item.heure}</span>
                </p>

                {item.note && (
                  <p className="mt-2 text-sm italic text-gray-500 border-t pt-2">
                    Note : “{item.note}”
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Historique;