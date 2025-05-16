import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle } from "lucide-react";
import EmployeeNavbar from "./navbar";

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

function DemandeEPI() {
  const [form, setForm] = useState({
    departement: "",
    poste: "",
    type: "",
    quantite: 1,
    note: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "quantite" ? parseInt(value) : value,
      ...(name === "poste" && { type: "" }),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nouvelleDemande = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString(),
      statut: "En attente",
    };

    const demandes = JSON.parse(localStorage.getItem("demandes") || "[]");
    demandes.push(nouvelleDemande);
    localStorage.setItem("demandes", JSON.stringify(demandes));

    navigate("/historique-demandes");
  };

  const episDisponibles = form.poste ? EPI_PAR_POSTE[form.poste] || [] : [];

  return (
    <div>
      <EmployeeNavbar />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl space-y-6 mt-6">
        <div className="flex items-center gap-3 text-blue-400">
          <Sparkles size={28} />
          <h2 className="text-2xl font-bold">Faire une demande d’EPI</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="departement"
            placeholder="Département"
            value={form.departement}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />

          <select
            name="poste"
            value={form.poste}
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

          {form.poste && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {episDisponibles.map((epi) => (
                <label
                  key={epi.name}
                  className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center gap-2 transition-all ${
                    form.type === epi.name ? "bg-blue-100 border-blue-400" : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={epi.name}
                    checked={form.type === epi.name}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <img src={epi.image} alt={epi.name} className="w-12 h-12 object-contain" />
                  <span className="font-medium">{epi.name}</span>
                  {form.type === epi.name && <CheckCircle className="text-blue-400" size={20} />}
                </label>
              ))}
            </div>
          )}

          <input
            type="number"
            name="quantite"
            min={1}
            value={form.quantite}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
            required
          />

          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Remarques (facultatif)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-300 text-white py-3 px-6 rounded-lg hover:scale-105 transition-transform"
          >
            Envoyer la demande
          </button>
        </form>
      </div>
    </div>
  );
}

export default DemandeEPI;