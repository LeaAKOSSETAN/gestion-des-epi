import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComptesGestion from './Components/admin/AdminDashbord';
import AjouterUsers from './Components/admin/AjouterUsers';
import ListeComptes from './Components/admin/ListeComptes';

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
import GestionnaireDashboard from './Components/gestionnaire/GestionnaireDashbord';
import EpiDashboard from './Components/gestionnaire/EpiDashbord';
import AjouterEPI from './Components/gestionnaire/AjouterEPI';
import ModifierEPI from './Components/gestionnaire/ModifierEPI';
import LivraisonSave from './Components/gestionnaire/LivraisonSave';
import RestockRequest from './Components/gestionnaire/Reapprovisionnement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/gestionnaire" element={<GestionnaireDashboard />} />
        <Route path="/gestionnaire/stock" element={<EpiDashboard />} />
        <Route path="/gestionnaire/ajouter" element={<AjouterEPI/>} />
        <Route path="/gestionnaire/modifier/:id" element={<ModifierEPI/>} />
        <Route path="/gestionnaire/reapprovisionnement" element={<RestockRequest/>} />
        <Route path="/gestionnaire/livraison" element={<LivraisonSave />} />
        <Route path="/gestionnaire/historique" element={<Historique />}/>

        <Route path="/admin" element={<ComptesGestion />}/>
        <Route path="/admin/ajouter-utilisateur" element={<AjouterUsers />} />
        <Route path="/admin/utilisateurs" element={<ListeComptes />} />

        
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
    // <div className="App">
    //   <StockPage/>
    // </div>
  );
   

}

export default App