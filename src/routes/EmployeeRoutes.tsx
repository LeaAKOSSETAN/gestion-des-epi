import { Routes, Route } from 'react-router-dom'

import DemandeEPI from '../Components/employe/page/DemandeEpi'
import Dashboard from '../Components/employe/page/Dashboard'
import Historique from '../Components/employe/page/historique'
import ListeDispo from '../Components/employe/page/listedispo'
import HistoriqueDemandes from '../Components/employe/page/historiqueDemande'

 function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/demande-epi" element={<DemandeEPI/>} />
      <Route path="/historique" element={<Historique />} />
      <Route path="//ListeDispo" element={<ListeDispo />} />
      <Route path="/historique-demandes" element={<HistoriqueDemandes/>} />


    </Routes>
  )
}
export default EmployeeRoutes;
