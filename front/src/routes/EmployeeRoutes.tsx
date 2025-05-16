import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Components/employe/Dashboard';
import DemandeEPI from '../Components/employe/DemandeEpi';
import Historique from '../Components/employe/historique';
import ListeDispo from '../Components/employe/listedispo';
import HistoriqueDemandes from '../Components/employe/historiqueDemande';



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