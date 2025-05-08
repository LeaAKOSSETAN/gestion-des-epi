import { useEffect, useState } from "react"
import ChefNavbar from "./Navbarchef"

type Employee = {
  id: number
  nom: string
  poste: string
  email: string
}

const chefId = 1 // Remplacer par l’ID réel du chef connecté

 function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    // Simulation d’appel API
    const fetchEmployees = async () => {
      const data: Employee[] = [
        { id: 1, nom: "Chef Besi", poste: "Chef", email: "besi@port.bj" },
        { id: 2, nom: "Toto", poste: "Manutentionnaire", email: "toto@port.bj" },
        { id: 3, nom: "Sika", poste: "Technicien", email: "sika@port.bj" }
      ]
      const filtered = data.filter(emp => emp.id !== chefId)
      setEmployees(filtered)
    }

    fetchEmployees()
  }, [])

  return (
   <div>
<ChefNavbar/>
<div className="bg-white shadow-md rounded-xl p-4">
        
        <h3 className="text-lg font-bold mb-2">Employés du département</h3>
        <ul className="space-y-2">
          {employees.map(emp => (
            <li key={emp.id} className="border p-3 rounded-lg">
              <div className="font-semibold">{emp.nom}</div>
              <div className="text-sm text-gray-600">{emp.poste}</div>
              <div className="text-sm text-gray-500">{emp.email}</div>
            </li>
          ))}
        </ul>
      </div>
   </div>
  )
}
export default EmployeeList;