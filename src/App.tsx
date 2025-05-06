import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/login'
import Dashboard from './Components/employe/page/Dashboard'
import DemandeEPI from './Components/employe/page/DemandeEpi'
import Historique from './Components/employe/page/historique'
import ListeDispo from './Components/employe/page/listedispo'
import HistoriqueDemandes from './Components/employe/page/historiqueDemande'
import DashboardChef from './Components/chef-departement/dashbordChef'

function App() {
  return (
<div>

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demande-epi" element={<DemandeEPI />} />
        <Route path="//historique" element={<Historique />} />
        <Route path="//ListeDispo" element={<ListeDispo/>} />
        <Route path="/historique-demandes" element={<HistoriqueDemandes/>} />


      </Routes>
    </Router>
    </div>
  )
}

export default App
