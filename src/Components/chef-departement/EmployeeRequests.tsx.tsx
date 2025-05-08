import { useEffect, useState } from "react"
import ChefNavbar from "./Navbarchef"

type Request = {
  id: number
  employeNom: string
  typeEPI: string
  statut: "en_attente" | "valide" | "refuse"
}

 function EmployeeRequests() {
  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    const data: Request[] = [
      { id: 1, employeNom: "Adé", typeEPI: "Casque", statut: "en_attente" },
      { id: 2, employeNom: "Kossi", typeEPI: "Gilet", statut: "en_attente" },
      { id: 3, employeNom: "Tida", typeEPI: "Gants", statut: "refuse" },
      { id: 4, employeNom: "Ali", typeEPI: "Bottes", statut: "valide" }
    ]
    setRequests(data)
  }, [])

  const updateStatus = (id: number, newStatus: "valide" | "refuse") => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, statut: newStatus } : req))
    )
  }

  const transmettreAuDQHSE = () => {
    const demandesValidees = requests.filter(req => req.statut === "valide")
    console.log("Transmis au DQHSE :", demandesValidees)
    // API: POST /api/dqhse/demandes
  }

  const hasValid = requests.some(req => req.statut === "valide")

  return (
    <div>
<ChefNavbar/>

<div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">📋 Demandes des employés</h2>

      {requests.length === 0 ? (
        <p>Aucune demande trouvée.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{req.employeNom}</div>
                <div className="text-sm text-gray-600">Équipement : {req.typeEPI}</div>
                <div className={`text-sm font-bold ${
                  req.statut === "valide" ? "text-green-600" :
                  req.statut === "refuse" ? "text-red-600" : "text-yellow-600"
                }`}>
                  Statut : {req.statut}
                </div>
              </div>

              {req.statut === "en_attente" && (
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => updateStatus(req.id, "valide")}
                  >
                    ✅ Valider
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => updateStatus(req.id, "refuse")}
                  >
                    ❌ Refuser
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {hasValid && (
        <div className="mt-6 text-right">
          <button
            className="bg-blue-400 hover:bg-blue-400 text-white px-5 py-2 rounded-lg"
            onClick={transmettreAuDQHSE}
          >
            📤 Transmettre au DQHSE
          </button>
        </div>
      )}
    </div>
    </div>
  )
}
export default EmployeeRequests;