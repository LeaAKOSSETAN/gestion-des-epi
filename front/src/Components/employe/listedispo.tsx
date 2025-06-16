import { useState } from "react";
import EmployeNavbar from "./EmployeNavbar";

const stock = [
  {
    id: 1,
    type: "Casque",
    quantite: 14,
    image: "/images/casque.png",
    renouvellement: "2025-06-30",
    departement: "Maintenance",
    postes: ["Technicien", "Chef d'équipe"]
  },
  {
    id: 2,
    type: "Gants",
    quantite: 20,
    image: "/images/gants.png",
    renouvellement: "2025-07-15",
    departement: "Sécurité",
    postes: ["Agent de sécurité", "Surveillant"]
  },
  {
    id: 3,
    type: "Lunettes",
    quantite: 10,
    image: "/images/lunettes.png",
    renouvellement: "2025-05-20",
    departement: "Laboratoire",
    postes: ["Chimiste", "Technicien"]
  }
];

function ListeDispo() {
  const [departement, setDepartement] = useState("");
  const [poste, setPoste] = useState("");

  const postesDisponibles = Array.from(
    new Set(
      stock
        .filter((e) => departement === "" || e.departement === departement)
        .flatMap((e) => e.postes)
    )
  );

  const epiFiltres = stock.filter(
    (item) =>
      (departement === "" || item.departement === departement) &&
      (poste === "" || item.postes.includes(poste))
  );

  return (
    <div>
      <EmployeNavbar>
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-400"> Liste des EPI disponibles</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={departement}
            onChange={(e) => {
              setDepartement(e.target.value);
              setPoste(""); // Reset poste
            }}
            className="border-2 border-gray-300 p-3 rounded-lg w-full md:w-1/2 transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Filtrer par département --</option>
            {Array.from(new Set(stock.map((e) => e.departement))).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={poste}
            onChange={(e) => setPoste(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-lg w-full md:w-1/2 transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!departement}
          >
            <option value="">-- Filtrer par poste --</option>
            {postesDisponibles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {epiFiltres.length === 0 ? (
          <div className="text-gray-500 italic text-center">Aucun EPI disponible pour cette sélection.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {epiFiltres.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl p-6 transition-transform transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-full h-40 object-contain mb-4 rounded-lg transition-all"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.type}</h3>
                <p className="text-sm text-gray-500">
                  Renouvellement : <em>{item.renouvellement}</em>
                </p>
                <p className="text-sm text-blue-400 mt-2">
                  Département : <span className="font-medium">{item.departement}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      </EmployeNavbar>
    </div>
  );
}

export default ListeDispo;