import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AjouterEPI from "./Components/gestionnaire/AjouterEPI";
import ModifierEPI from "./Components/gestionnaire/ModifierEPI";
import EpiDashboard from './Components/gestionnaire/EpiDashbord';
import Reapprovisionnement from './Components/gestionnaire/Reapprovisionnement';
import LivraisonSave from './Components/gestionnaire/LivraisonSave';
import Historique from './Components/gestionnaire/Historique';
import ComptesGestion from './Components/admin/AdminDashbord';
import AjouterUsers from './Components/admin/AjouterUsers';
import GestionnaireDashbord from './Components/gestionnaire/GestionnaireDashbord';
import ListeComptes from './Components/admin/ListeComptes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/gestionnaire" element={<GestionnaireDashbord />} />
        <Route path="/gestionnaire/stock" element={<EpiDashboard />} />
        <Route path="/gestionnaire/ajouter" element={<AjouterEPI />} />
        <Route path="/gestionnaire/modifier/:id" element={<ModifierEPI />} />
        <Route path="/gestionnaire/reapprovisionnement" element={<Reapprovisionnement />} />
        <Route path="/gestionnaire/livraison" element={<LivraisonSave />} />
        <Route path="/gestionnaire/historique" element={<Historique />}/>

        <Route path="/admin" element={<ComptesGestion />}/>
        <Route path="/admin/ajouter-utilisateur" element={<AjouterUsers />} />
        <Route path="/admin/utilisateurs" element={<ListeComptes />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <StockPage/>
    // </div>
  );
}

export default App;
