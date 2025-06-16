import { useEffect, useState } from "react";
import { Edit, Trash2, Save, X } from "lucide-react";
import EmployeeNavbar from "./EmployeNavbar";

type Demande = {
  poste: string;
  departement: string;
  id: number;
  type: string;
  quantite: number;
  note: string;
  date: string;
  statut: "En attente" | "Validée" | "Refusée";
};

const EPI_PAR_POSTE: Record<string, { name: string; image: string }[]> = {
  Soudeur: [
    { name: "Gants", image: "/img/gants.png" },
    { name: "Masque de soudure", image: "/img/masque.png" },
    { name: "Tablier ignifuge", image: "/img/tablier.png" },
  ],
  Électricien: [
    { name: "Gants isolants", image: "/img/gants-isolants.png" },
    { name: "Chaussures de sécurité", image: "/img/chaussures.png" },
    { name: "Casque isolant", image: "/img/casque.png" },
  ],
  Chauffeur: [
    { name: "Gilet réfléchissant", image: "/img/gilet.png" },
    { name: "Chaussures de sécurité", image: "/img/chaussures.png" },
  ],
  Magasinier: [
    { name: "Gants", image: "/img/gants.png" },
    { name: "Chaussures de sécurité", image: "/img/chaussures.png" },
    { name: "Casque", image: "/img/casque.png" },
  ],
};

export default function HistoriqueDemandes() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [demandeEnCours, setDemandeEnCours] = useState<number | null>(null);
  const [formModif, setFormModif] = useState<Partial<Demande>>({});
  const [filtreStatut, setFiltreStatut] = useState<string>("Tous");

  useEffect(() => {
    const data = localStorage.getItem("demandes");
    if (data) setDemandes(JSON.parse(data));
  }, []);

  const supprimerDemande = (id: number) => {
    if (window.confirm("Confirmer la suppression de cette demande ?")) {
      const updated = demandes.filter((d) => d.id !== id);
      setDemandes(updated);
      localStorage.setItem("demandes", JSON.stringify(updated));
    }
  };

  const lancerModification = (demande: Demande) => {
    setDemandeEnCours(demande.id);
    setFormModif({ ...demande });
  };

  const enregistrerModification = () => {
    const updated = demandes.map((d) =>
      d.id === demandeEnCours ? { ...d, ...(formModif as Demande) } : d
    );
    setDemandes(updated);
    localStorage.setItem("demandes", JSON.stringify(updated));
    setDemandeEnCours(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormModif((prev) => ({
      ...prev,
      [name]: name === "quantite" ? parseInt(value) : value,
    }));
  };

  const demandesFiltrees =
    filtreStatut === "Tous"
      ? demandes
      : demandes.filter((d) => d.statut === filtreStatut);

  return (
    <div className="min-h-screen bg-gray-100">
      <EmployeeNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Historique des Demandes</h1>
          <select
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm text-gray-700"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">🕒 En attente</option>
            <option value="Validée">✅ Validée</option>
            <option value="Refusée">❌ Refusée</option>
          </select>
        </header>

        {demandesFiltrees.length === 0 ? (
          <p className="text-center text-gray-500 italic">Aucune demande trouvée.</p>
        ) : (
          <div className="space-y-6">
            {demandesFiltrees.map((demande) => (
              <div
                key={demande.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200"
              >
                {demandeEnCours === demande.id ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      name="departement"
                      value={formModif.departement}
                      onChange={handleChange}
                      placeholder="Département"
                      className="input"
                    />
                    <select name="poste" value={formModif.poste} onChange={handleChange} className="input">
                      <option value="">-- Poste --</option>
                      {Object.keys(EPI_PAR_POSTE).map((poste) => (
                        <option key={poste}>{poste}</option>
                      ))}
                    </select>
                    <select name="type" value={formModif.type} onChange={handleChange} className="input">
                      <option value="Casque">Casque</option>
                      <option value="Gants">Gants</option>
                      <option value="Chaussures">Chaussures</option>
                    </select>
                    <input
                      type="number"
                      name="quantite"
                      value={formModif.quantite || 1}
                      onChange={handleChange}
                      className="input"
                    />
                    <textarea
                      name="note"
                      value={formModif.note}
                      onChange={handleChange}
                      placeholder="Note (facultatif)"
                      className="input col-span-2"
                    />
                    <div className="col-span-2 flex justify-end gap-2">
                      <button
                        onClick={enregistrerModification}
                        className="btn btn-success"
                      >
                        <Save size={18} className="mr-2" /> Enregistrer
                      </button>
                      <button
                        onClick={() => setDemandeEnCours(null)}
                        className="btn btn-secondary"
                      >
                        <X size={18} className="mr-2" /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-700">
                    <p><strong>📅 Date :</strong> {demande.date}</p>
                    <p><strong>🔢 Quantité :</strong> {demande.quantite}</p>
                    <p><strong>📝 Justification :</strong> {demande.note || "Aucune"}</p>
                    <p>
                      <strong>🔖 Statut Demande:</strong>{" "}
                      <span
                        className={`inline-block px- py-1 text-sm font-medium rounded-full ${
                          demande.statut === "Validée"
                            ? "bg-green-100 text-green-700"
                            : demande.statut === "Refusée"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-800 animate-pulse"
                        }`}
                      >
                        {demande.statut}
                      </span>
                    </p>
                    <p>
                      <strong>🔖 Statut Livraison :</strong>{" "}
                      <span
                        className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                          demande.statut === "Validée"
                            ? "bg-green-100 text-green-700"
                            : demande.statut === "Refusée"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-800 animate-pulse"
                        }`}
                      >
                        {demande.statut}
                      </span>
                    </p>

                    {demande.statut === "En attente" && (
                      <div className="col-span-1 sm:col-span-3 flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => lancerModification(demande)}
                          className="btn btn-primary"
                        >
                          <Edit size={18} className="mr-2" /> Modifier
                        </button>
                        <button
                          onClick={() => supprimerDemande(demande.id)}
                          className="btn btn-danger"
                        >
                          <Trash2 size={18} className="mr-2" /> Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
