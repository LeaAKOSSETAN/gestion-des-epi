import { useState, useEffect } from "react";
import { PlusCircle, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 Ajout ici

type Epi = { id: number; nom: string };

function DemandeEPIForm() {
  const [epis, setEpis] = useState<Epi[]>([]);
  const [besoins, setBesoins] = useState([{ epiId: "", quantite: "" }]);
  const navigate = useNavigate(); // 👈 Hook pour redirection

  useEffect(() => {
    setEpis([
      { id: 1, nom: "Casque de sécurité" },
      { id: 2, nom: "Gants" },
      { id: 3, nom: "Chaussures de sécurité" },
      { id: 4, nom: "Gilet réfléchissant" },
    ]);
  }, []);

  const handleBesoinsChange = (index: number, field: keyof typeof besoins[0], value: string) => {
    const newBesoins = [...besoins];
    newBesoins[index][field] = value;
    setBesoins(newBesoins);
  };

  const ajouterBesoin = () => {
    setBesoins([...besoins, { epiId: "", quantite: "" }]);
  };

  const supprimerBesoin = (index: number) => {
    const newBesoins = [...besoins];
    newBesoins.splice(index, 1);
    setBesoins(newBesoins);
  };

  const getEpiOptions = (selectedIndex: number) => {
    const selectedIds = besoins
      .filter((_, i) => i !== selectedIndex)
      .map((b) => b.epiId);
    return epis.filter((epi) => !selectedIds.includes(epi.id.toString()));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Demande envoyée :", besoins);
    // Appel API futur
  };

  const annulerDemande = () => {
          navigate("/demande-dashboard");
    // Redirection vers le dashboard des demandes
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-6 text-center">
          Formulaire de Demande d’EPI
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {besoins.map((besoin, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-sky-50 p-4 rounded-xl border border-sky-200"
            >
              <div>
                <label className="block text-sm font-medium text-sky-800 mb-1">Type d’EPI</label>
                <select
                  className="w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm text-gray-900 focus:ring-sky-500 focus:border-sky-500"
                  value={besoin.epiId}
                  onChange={(e) => handleBesoinsChange(index, "epiId", e.target.value)}
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  {getEpiOptions(index).map((epi) => (
                    <option key={epi.id} value={epi.id}>
                      {epi.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-800 mb-1">Quantité</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm text-center text-gray-900 focus:ring-sky-500 focus:border-sky-500"
                  value={besoin.quantite}
                  onChange={(e) => handleBesoinsChange(index, "quantite", e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                {besoins.length > 1 && (
                  <button
                    type="button"
                    onClick={() => supprimerBesoin(index)}
                    className="inline-flex items-center text-sm text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="w-5 h-5 mr-1" />
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-start">
            <button
              type="button"
              onClick={ajouterBesoin}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 border border-sky-300 rounded-md text-sm text-sky-800 hover:bg-sky-200"
            >
              <PlusCircle className="w-4 h-4" />
              Ajouter un EPI
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={annulerDemande}
              className="inline-flex items-center px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Annuler la demande
            </button>

            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-md transition"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Soumettre la demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DemandeEPIForm;
