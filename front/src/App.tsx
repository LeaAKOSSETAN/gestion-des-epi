import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AjouterEPI from "./Components/Gestionnaire/AjouterEPI";
import ModifierEPI from "./Components/Gestionnaire/ModifierEPI";
import EpiDashboard from './Components/Gestionnaire/EpiDashbord';
import Reapprovisionnement from './Components/Gestionnaire/Reapprovisionnement';
import LivraisonSave from './Components/Gestionnaire/LivraisonSave';
import Historique from './Components/Gestionnaire/Historique';

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
      </Routes>
    </Router>
    // <div className="App">
    //   <StockPage/>
    // </div>
  );
}

export default App;
