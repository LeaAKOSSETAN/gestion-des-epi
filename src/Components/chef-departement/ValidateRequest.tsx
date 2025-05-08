import { useState } from "react"
import ChefNavbar from "./Navbarchef"

interface Demande {
  id: number
  employeNom: string
  typeEPI: string
  motif: string
  statut: "en_attente" | "validée" | "refusée"
}

 function ValidateRequest() {
  const [demandes, setDemandes] = useState<Demande[]>([
    {
      id: 1,
      employeNom: "Yèmadjè Saturnin",
      typeEPI: "Casque",
      motif: "Cassé pendant la manutention",
      statut: "en_attente"
    },
    {
      id: 2,
      employeNom: "Adjovi Clarisse",
      typeEPI: "Gants",
      motif: "Déchirés après usage",
      statut: "en_attente"
    }
  ])

  const mettreAJourStatut = (id: number, nouveauStatut: "validée" | "refusée") => {
    setDemandes(prev =>
      prev.map(d =>
        d.id === id ? { ...d, statut: nouveauStatut } : d
      )
    )
  }

  return (
 <div>
<ChefNavbar/>
<div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">📋 Validation des demandes</h2>
      {demandes.length === 0 ? (
        <p>Aucune demande à traiter.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Employé</th>
              <th className="p-2">EPI</th>
              <th className="p-2">Motif</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map(d => (
              <tr key={d.id} className="border-b">
                <td className="p-2">{d.id}</td>
                <td className="p-2">{d.employeNom}</td>
                <td className="p-2">{d.typeEPI}</td>
                <td className="p-2">{d.motif}</td>
                <td className="p-2 font-semibold capitalize">{d.statut}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => mettreAJourStatut(d.id, "validée")}
                    disabled={d.statut !== "en_attente"}
                    className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    ✅ Valider
                  </button>
                  <button
                    onClick={() => mettreAJourStatut(d.id, "refusée")}
                    disabled={d.statut !== "en_attente"}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    ❌ Refuser
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
 </div>
  )
}
export default ValidateRequest;