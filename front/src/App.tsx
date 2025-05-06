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
import ListeUsers from './Components/admin/ListeUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EpiDashboard />} />
        <Route path="/stock" element={<Reapprovisionnement />} />
        <Route path="/provision" element={<LivraisonSave />} />
        <Route path="/historique" element={<Historique />}/>
        <Route path="/ajouter" element={<AjouterEPI />} />
        <Route path="/modifier/:id" element={<ModifierEPI />} />
        <Route path="/admin" element={<ComptesGestion />}/>
        <Route path="/admin/ajouter-utilisateur" element={<AjouterUsers />} />
        <Route path="/admin/users" element={<ListeUsers />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <StockPage/>
    // </div>
  );
}

export default App;
