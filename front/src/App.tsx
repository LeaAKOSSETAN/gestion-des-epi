import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import DqhseValidationDemandes from './Components/DQHSE/validation-demandes'
import DqhseHistoriqueTransactions from './Components/DQHSE/historique-transactions'
import DqhseDemandesEnAttente from './Components/DQHSE/demande-en-attente'
import DqhseDashboard from './Components/DQHSE/dasboard-dqhse'
import Login from './login'
import Dashboard from './Components/employe/Dashboard'
import DemandeEPI from './Components/employe/DemandeEpi'
import Historique from './Components/employe/historique'
import ListeDispo from './Components/employe/listedispo'
import HistoriqueDemandes from './Components/employe/historiqueDemande'

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes pour les employés */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demande-epi" element={<DemandeEPI />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/listeDispo" element={<ListeDispo />} />
        <Route path="/historique-demandes" element={<HistoriqueDemandes />} />

       

                {/* Routes pour le dqhse de Département */}

                <Route path="/DQHSE/DQHSE-Dashboard" element={<DqhseDashboard/>} /> 
      <Route path="/DQHSE/Validation-demande" element={<DqhseValidationDemandes/>} />
      <Route path="/DQHSE/Transactions-plateforme" element={<DqhseHistoriqueTransactions />} />
      <Route path="/DQHSE/Historique" element={<DqhseDemandesEnAttente />} />
      {/* <Route path="/historique-demandes" element={<HistoriqueDemandes/>} />  */}

      </Routes>
    </Router>
  )
}

export default App