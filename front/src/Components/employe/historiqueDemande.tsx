import { useEffect, useState } from "react";
import { Edit, Trash2, Save, X } from "lucide-react";
import EmployeeNavbar from "./navbar";

type Demande = {
  poste: string,
  departement:string,
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
function HistoriqueDemandes() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [demandeEnCours, setDemandeEnCours] = useState<number | null>(null);
  const [formModif, setFormModif] = useState<Partial<Demande>>({});
  const [filtreStatut, setFiltreStatut] = useState<string>("Tous");
  const episDisponibles = formModif.poste ? EPI_PAR_POSTE[formModif.poste] || [] : [];

  useEffect(() => {
    const data = localStorage.getItem("demandes");
    if (data) setDemandes(JSON.parse(data));
  }, []);

  const supprimerDemande = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette demande ?")) {
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

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-400">
           Historique des Demandes
        </h2>

        <div className="mb-6 flex justify-end">
          <select
            className="border px-3 py-2 rounded-lg shadow text-gray-700"
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
          >
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">🕒 En attente</option>
            <option value="Validée">✅ Validée</option>
            <option value="Refusée">❌ Refusée</option>
          </select>
        </div>

        {demandesFiltrees.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune demande trouvée.</p>
        ) : (
          <div className="space-y-6">
            {demandesFiltrees.map((demande) => (
              <div
                key={demande.id}
                className="relative border-l-4 border-indigo-300 pl-6 py-4 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="absolute left-[-10px] top-5 w-5 h-5 rounded-full bg-indigo-300"></div>

                {demandeEnCours === demande.id ? (
                  <div className="space-y-3">

            <input
            type="text"
            name="departement"
            placeholder="Département"
            value={formModif.departement}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />

       <select
            name="poste"
            value={formModif.poste}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
          >
            <option value="">-- Sélectionner un poste --</option>
            {Object.keys(EPI_PAR_POSTE).map((poste) => (
              <option key={poste} value={poste}>
                {poste}
              </option>
            ))}
          </select>
                    <select
                      name="type"
                      value={formModif.type }
                      
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    >
                      
                      <option value="Casque">Casque</option>
                      <option value="Gants">Gants</option>
                      <option value="Chaussures">Chaussures</option>
                    </select>

                    <input
                      type="number"
                      name="quantite"
                      value={formModif.quantite || 1}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    />

                    <textarea
                      name="note"
                      value={formModif.note}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                      placeholder="Ajouter une note..."
                    />

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={enregistrerModification}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition"
                      >
                        <Save size={18} /> Enregistrer
                      </button>
                      <button
                        onClick={() => setDemandeEnCours(null)}
                        className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg transition"
                      >
                        <X size={18} /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    
                    <p><strong> departement :</strong> {demande.departement}</p>
                    <p><strong> Poste :</strong> {demande.poste}</p>
                    <p><strong> Type :</strong> {demande.type}</p>
                    <p><strong>Quantité :</strong> {demande.quantite}</p>
                    <p><strong> Note :</strong> {demande.note || "Aucune"}</p>
                    <p><strong> Date :</strong> {demande.date}</p>
                    <p>
                      <strong> Statut :</strong>{" "}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                          demande.statut === "Validée"
                            ? "bg-green-300"
                            : demande.statut === "Refusée"
                            ? "bg-red-300"
                            : "bg-yellow-300 animate-pulse"
                        }`}
                      >
                        {demande.statut}
                      </span>
                    </p>

                    {demande.statut === "En attente" && (
                      <div className="flex gap-3 mt-3 justify-end">
                        <button
                          onClick={() => lancerModification(demande)}
                          className="flex items-center gap-1 bg-blue-400 hover:bg-blue-400 text-white px-3 py-1.5 rounded-lg transition"
                        >
                          <Edit size={18} /> Modifier
                        </button>
                        <button
                          onClick={() => supprimerDemande(demande.id)}
                          className="flex items-center gap-1 bg-red-400 hover:bg-red-400 text-white px-3 py-1.5 rounded-lg transition"
                        >
                          <Trash2 size={18} /> Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoriqueDemandes;