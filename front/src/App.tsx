import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ComptesGestion from './Components/admin/AdminDashbord';
import AjouterUsers from './Components/admin/AjouterUsers';
import ComptesInactifs from './Components/admin/ComptesInactifs';
import ComptesActifs from './Components/admin/ComptesActifs';
import List from './Components/admin/UserList';

import DqhseValidationDemandes from './Components/DQHSE/validation-demandes'
import DqhseHistoriqueTransactions from './Components/DQHSE/historique-transactions'
import DqhseDemandesEnAttente from './Components/DQHSE/demande-en-attente'
import DqhseDashboard from './Components/DQHSE/dasboard-dqhse'

import Login from './login'
import Dashboard from './Components/employe/Dashboard'
import DemandeEPI from './Components/employe/DemandeForm'
import Historique from './Components/employe/historique'
import ListeDispo from './Components/employe/listedispo'
import HistoriqueDemandes from './Components/employe/historiqueDemande'

import GestionnaireDashboard from './Components/Gestionnaire/GestionnaireDashbord';
import EpiDashboard from './Components/Gestionnaire/EpiDashbord';
import AjouterEPI from './Components/Gestionnaire/AjouterEPI';
import ModifierEPI from './Components/Gestionnaire/ModifierEPI';
import LivraisonSave from './Components/Gestionnaire/LivraisonSave';
import RestockRequest from './Components/Gestionnaire/Reapprovisionnement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes pour les gestionnaires */}
        <Route path="/gestionnaire" element={<GestionnaireDashboard />} />
        <Route path="/gestionnaire/stock" element={<EpiDashboard />} />
        <Route path="/gestionnaire/ajouter" element={<AjouterEPI/>} />
        <Route path="/gestionnaire/modifier/:id" element={<ModifierEPI/>} />
        <Route path="/gestionnaire/reapprovisionnement" element={<RestockRequest/>} />
        <Route path="/gestionnaire/livraison" element={<LivraisonSave />} />
        <Route path="/gestionnaire/historique" element={<Historique />}/>

        {/* Routes pour les administrateurs */}
        <Route path="/admin" element={<ComptesGestion />}/>
        <Route path="/admin/ajouter-utilisateur" element={<AjouterUsers />} />
        <Route path="/admin/comptes-actifs" element={<ComptesActifs />} />
        <Route path="/admin/comptes-inactifs" element={<ComptesInactifs />} />
        <Route path="/admin/list" element={<List users={undefined}/>} />

        {/* Routes pour les employés */}
        <Route path="/" element={<Login />} />
        <Route path="/demande-dashboard" element={<Dashboard />} />
        <Route path="/demande-epi" element={<DemandeEPI />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/listeDispo" element={<ListeDispo />} />
        <Route path="/historique-demandes" element={<HistoriqueDemandes />} />

        {/* Routes pour le dqhse de Département */}
        <Route path="/DQHSE-Dashboard" element={<DqhseDashboard/>} /> 
        <Route path="/DQHSE-Validation" element={<DqhseValidationDemandes/>} />
        <Route path="/DQHSE-Transactions" element={<DqhseHistoriqueTransactions />} />
        <Route path="/DQHSE-Historique" element={<DqhseDemandesEnAttente />} />
        {/* <Route path="/historique-demandes" element={<HistoriqueDemandes/>} />  */}
      </Routes>
    </Router>

  );
   

}

export default App