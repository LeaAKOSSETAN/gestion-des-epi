import { useState } from "react"
import ChefNavbar from "./Navbarchef"

interface Demande {
  id: number
  employeNom: string
  typeEPI: string
  motif: string
  statut: string
  selectionne: boolean
}

 function TransferToDQHSE() {
  const [demandes, setDemandes] = useState<Demande[]>([
    {
      id: 1,
      employeNom: "Agossou Jules",
      typeEPI: "Gilet",
      motif: "Usé",
      statut: "validée",
      selectionne: false
    },
    {
      id: 2,
      employeNom: "Hounkpè Reine",
      typeEPI: "Gants",
      motif: "Perte",
      statut: "validée",
      selectionne: false
    }
  ])

  const toggleSelection = (id: number) => {
    setDemandes(prev =>
      prev.map(d =>
        d.id === id ? { ...d, selectionne: !d.selectionne } : d
      )
    )
  }

  const envoyerAuDQHSE = () => {
    const selectionnees = demandes.filter(d => d.selectionne && d.statut === "validée")
    if (selectionnees.length === 0) return alert("Aucune demande sélectionnée.")

    console.log("Demandes envoyées au DQHSE :", selectionnees)
    alert("✅ Transfert effectué avec succès !")

    setDemandes(prev =>
      prev.map(d =>
        d.selectionne && d.statut === "validée"
          ? { ...d, statut: "transmise_dqhse", selectionne: false }
          : d
      )
    )
  }

  return (
   <div>

<ChefNavbar/>
<div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">📤 Transférer au DQHSE</h2>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">Employé</th>
            <th className="p-2">EPI</th>
            <th className="p-2">Motif</th>
            <th className="p-2">Sélection</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map(d => (
            <tr key={d.id} className="border-b">
              <td className="p-2">{d.id}</td>
              <td className="p-2">{d.employeNom}</td>
              <td className="p-2">{d.typeEPI}</td>
              <td className="p-2">{d.motif}</td>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={d.selectionne}
                  disabled={d.statut !== "validée"}
                  onChange={() => toggleSelection(d.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 bg-green-400 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
        onClick={envoyerAuDQHSE}
      >
        🚀 Envoyer au DQHSE
      </button>
    </div>
   </div>
  )
}
export default TransferToDQHSE;