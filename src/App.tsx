import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/login'
import Dashboard from './Components/employe/page/Dashboard'
import DemandeEPI from './Components/employe/page/DemandeEpi'
import Historique from './Components/employe/page/historique'
import ListeDispo from './Components/employe/page/listedispo'
import HistoriqueDemandes from './Components/employe/page/historiqueDemande'

// Chef de département
import MyOwnRequest from './Components/chef-departement/MyOwnRequest'
import ValidateRequest from './Components/chef-departement/ValidateRequest'
import EmployeeRequests from './Components/chef-departement/EmployeeRequests.tsx'
import EmployeeList from './Components/chef-departement/EmployeeList'
import ChefDashboard from './Components/chef-departement/pages/ChefDashboard'
import CreateEmployeeAccount from './Components/chef-departement/ceation-compte'
import DqhseValidationDemandes from './Components/DQHSE/validation-demandes'
import DqhseHistoriqueTransactions from './Components/DQHSE/historique-transactions'
import DqhseDemandesEnAttente from './Components/DQHSE/demande-en-attente'
import DqhseDashboard from './Components/DQHSE/dasboard-dqhse'

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

        {/* Routes pour le Chef de Département */}
        <Route path="/chef-departement/chef-Dashboard" element={<ChefDashboard />} />

        <Route path="/chef-departement/employee-list" element={<EmployeeList />} />
        <Route path="/chef-departement/employee-requests" element={<EmployeeRequests />} />
        <Route path="/chef-departement/validate-requests" element={<ValidateRequest />} />
        <Route path="/chef-departement/creation-comptes" element={<CreateEmployeeAccount />} />

        <Route path="/chef-departement/my-own-request" element={<MyOwnRequest />} />


                {/* Routes pour le Chef de Département */}

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
