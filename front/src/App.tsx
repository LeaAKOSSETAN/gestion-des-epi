import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ComptesGestion from './Components/admin/AdminDashbord';
import AjouterUsers from './Components/admin/AjouterUsers';
import AdminRole from './Components/admin/AdminRole';
import AdminUsers from './Components/admin/AdminUsers';
import AdminHelp from './Components/admin/AdminHelp';
import AdminJournal from './Components/admin/AdminJournal';
import AdminSettings from './Components/admin/AdminSetting';

import DqhseValidationDemandes from './Components/DQHSE/validation-demandes'
import DqhseHistoriqueTransactions from './Components/DQHSE/historique-transactions'
import DqhseDemandesEnAttente from './Components/DQHSE/demande-en-attente'
import DqhseDashboard from './Components/DQHSE/dasboard-dqhse'

import Login from './login'
import Dashboard from './Components/employe/Dashboard'
import DemandeEPI from './Components/employe/DemandeForm'
import HistoriqueDemandes from './Components/employe/HistoriqueDemande';
import Dotations from './Components/employe/Dotations';
import RefaireDemande from './Components/employe/RefaireDemande';
import Notifications from './Components/employe/Notifications';
import Aide from './Components/employe/Aide';

import GestionnaireDashboard from './Components/Gestionnaire/GestionnaireDashbord';
import EpiDashboard from './Components/Gestionnaire/EpiDashbord';
import AjouterEPI from './Components/Gestionnaire/AjouterEPI';
import ModifierEPI from './Components/Gestionnaire/ModifierEPI';
import LivraisonSave from './Components/Gestionnaire/LivraisonSave';
import RestockRequest from './Components/Gestionnaire/Reapprovisionnement';
import Historique from './Components/Gestionnaire/Historique';

export default function App() {
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
        <Route path="/admin/role" element={<AdminRole />} />
        <Route path="/admin/utilisateurs" element={<AdminUsers />} />
        <Route path="/admin/journal" element={<AdminJournal />} />
        <Route path="/admin/parametres" element={<AdminSettings />} />
        <Route path="/admin/aide" element={<AdminHelp />} />


        {/* Routes pour les employés */}
        <Route path="/" element={<Login />} />
        <Route path="/demande-dashboard" element={<Dashboard />} />
        <Route path="/demande-epi" element={<DemandeEPI />} />
        <Route path="/dotation" element={<Dotations />} />
        <Route path="/historique-demandes" element={<HistoriqueDemandes />} />
        <Route path="/dotation" element={<Dotations />} />
        <Route path="/refaire-demande" element={<RefaireDemande />} />
        <Route path="/notifications" element={<Notifications />} /> 
        <Route path="/aide" element={<Aide />} />

        {/* Route pour la page de connexion */}
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

 