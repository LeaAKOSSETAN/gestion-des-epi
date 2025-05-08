import { useState } from "react"
import ChefNavbar from "./Navbarchef"

 function MyOwnRequest() {
  const [typeEPI, setTypeEPI] = useState("")
  const [motif, setMotif] = useState("")
  const [message, setMessage] = useState("")

  const submitRequest = () => {
    if (!typeEPI || !motif) {
      setMessage("Veuillez remplir tous les champs.")
      return
    }

    const demande = {
      employeId: 999, // ID du chef/employé connecté (à récupérer dynamiquement)
      typeEPI,
      motif,
      statut: "en_attente"
    }

    console.log("Demande envoyée :", demande)
    setMessage("✅ Demande envoyée avec succès !")
    setTypeEPI("")
    setMotif("")
  }

  return (
    <div>

<ChefNavbar/>
<div className="bg-white rounded-xl shadow-md p-6 max-w-lg">
      <h2 className="text-xl font-bold mb-4">🙋‍♂️ Faire une demande EPI</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Type d’EPI</label>
          <select
            className="w-full border p-2 rounded-lg"
            value={typeEPI}
            onChange={e => setTypeEPI(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="Casque">Casque</option>
            <option value="Gants">Gants</option>
            <option value="Bottes">Bottes</option>
            <option value="Gilet">Gilet</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Motif</label>
          <textarea
            className="w-full border p-2 rounded-lg"
            rows={3}
            value={motif}
            onChange={e => setMotif(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={submitRequest}
        >
          ➕ Envoyer la demande
        </button>

        {message && (
          <p className="text-sm mt-2 text-green-700 font-semibold">{message}</p>
        )}
      </div>
    </div>
    </div>
  )
}
export default MyOwnRequest;