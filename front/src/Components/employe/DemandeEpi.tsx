import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle, Trash2, Edit2, Plus } from "lucide-react";
import EmployeeNavbar from "./EmployeNavbar";

// Exemple simple d'EPI venant de la base (à remplacer par fetch réel)
const EPI_DISPONIBLES = [
  { id: 1, name: "Gants", image: "/img/gants.png" },
  { id: 2, name: "Masque de soudure", image: "/img/masque.png" },
  { id: 3, name: "Tablier ignifuge", image: "/img/tablier.png" },
  { id: 4, name: "Chaussures de sécurité", image: "/img/chaussures.png" },
  { id: 5, name: "Casque", image: "/img/casque.png" },
];

interface Besoin {
  id: number;
  epiId: number;
  quantite: number;
  note: string;
}

function DemandeEPI() {
  // Besoins ajoutés par l'utilisateur
  const [besoins, setBesoins] = useState<Besoin[]>([]);

  // Contrôle modal formulaire ajout/modification
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBesoin, setEditingBesoin] = useState<Besoin | null>(null);

  // Formulaire ajout/modif dans la modal
  const [formBesoin, setFormBesoin] = useState({
    epiId: 0,
    quantite: 1,
    note: "",
  });

  const navigate = useNavigate();

  // Supposons que poste et département sont connus
  const posteConnecte = "Soudeur"; // exemple
  const departementConnecte = "Maintenance"; // exemple

  // Mise à jour des inputs du modal
  const handleModalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormBesoin((prev) => ({
      ...prev,
      [name]: name === "quantite" ? parseInt(value) : value,
    }));
  };

  // Ouvrir modal pour ajouter un nouveau besoin
  const openAddModal = () => {
    setEditingBesoin(null);
    setFormBesoin({ epiId: 0, quantite: 1, note: "" });
    setModalOpen(true);
  };

  // Ouvrir modal pour modifier un besoin existant
  const openEditModal = (besoin: Besoin) => {
    setEditingBesoin(besoin);
    setFormBesoin({
      epiId: besoin.epiId,
      quantite: besoin.quantite,
      note: besoin.note,
    });
    setModalOpen(true);
  };

  // Enregistrer besoin (ajout ou modification)
  const saveBesoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formBesoin.epiId === 0) {
      alert("Veuillez sélectionner un EPI.");
      return;
    }

    if (editingBesoin) {
      // Modification
      setBesoins((prev) =>
        prev.map((b) =>
          b.id === editingBesoin.id
            ? { ...b, ...formBesoin, id: editingBesoin.id }
            : b
        )
      );
    } else {
      // Ajout
      const newBesoin: Besoin = {
        id: Date.now(),
        epiId: formBesoin.epiId,
        quantite: formBesoin.quantite,
        note: formBesoin.note,
      };
      setBesoins((prev) => [...prev, newBesoin]);
    }

    setModalOpen(false);
  };

  // Supprimer un besoin
  const deleteBesoin = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce besoin ?")) {
      setBesoins((prev) => prev.filter((b) => b.id !== id));
    }
  };

  // Soumettre la demande complète avec tous les besoins
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (besoins.length === 0) {
      alert("Veuillez ajouter au moins un besoin.");
      return;
    }

    // Construire la demande
    const demande = {
      id: Date.now(),
      poste: posteConnecte,
      departement: departementConnecte,
      besoins,
      date: new Date().toLocaleDateString(),
      statut: "En attente",
    };

    // Simuler stockage
    const demandes = JSON.parse(localStorage.getItem("demandes") || "[]");
    demandes.push(demande);
    localStorage.setItem("demandes", JSON.stringify(demandes));

    navigate("/historique-demandes");
  };

  return (
    <div>
      <EmployeeNavbar >
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl space-y-6 mt-6">
        <div className="flex items-center gap-3 text-blue-400">
          <Sparkles size={28} />
          <h2 className="text-2xl font-bold">Faire une demande d’EPI</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Poste : </label>
            <span>{posteConnecte}</span>
          </div>
          <div>
            <label className="font-semibold">Département : </label>
            <span>{departementConnecte}</span>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Besoins :</h3>
            {besoins.length === 0 && <p className="italic text-gray-500">Aucun besoin ajouté</p>}

            <ul className="space-y-2">
              {besoins.map((besoin) => {
                const epi = EPI_DISPONIBLES.find((e) => e.id === besoin.epiId);
                return (
                  <li
                    key={besoin.id}
                    className="flex items-center justify-between border p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={epi?.image}
                        alt={epi?.name}
                        className="w-10 h-10 object-contain"
                      />
                      <div>
                        <div className="font-medium">{epi?.name}</div>
                        <div>Quantité: {besoin.quantite}</div>
                        {besoin.note && (
                          <div className="text-sm italic text-gray-600">{besoin.note}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(besoin)}
                        title="Modifier"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBesoin(besoin.id)}
                        title="Supprimer"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Plus size={18} />
              Ajouter un besoin
            </button>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-300 text-white py-3 px-6 rounded-lg hover:scale-105 transition-transform"
          >
            Envoyer la demande
          </button>
        </form>

        {/* Modal pour ajouter/modifier un besoin */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={saveBesoin}
              className="bg-white p-6 rounded-xl max-w-md w-full space-y-4 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">
                {editingBesoin ? "Modifier un besoin" : "Ajouter un besoin"}
              </h3>

              <select
                name="epiId"
                value={formBesoin.epiId}
                onChange={handleModalChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
              >
                <option value={0}>-- Sélectionner un EPI --</option>
                {EPI_DISPONIBLES.map((epi) => (
                  <option key={epi.id} value={epi.id}>
                    {epi.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="quantite"
                min={1}
                value={formBesoin.quantite}
                onChange={handleModalChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Quantité"
              />

              <textarea
                name="note"
                value={formBesoin.note}
                onChange={handleModalChange}
                placeholder="Remarques (facultatif)"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingBesoin ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      </EmployeeNavbar>
    </div>
  );
}

export default DemandeEPI;
