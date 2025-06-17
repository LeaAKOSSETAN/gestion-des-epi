import React from "react";
import EmployeNavbar from "./EmployeNavbar";

export default function Aide() {
  return (
    <EmployeNavbar>
    <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-sky-900 mb-4">Centre d'aide</h2>
      <div className="space-y-4 text-sm text-gray-700">
        <p>
          <strong>Comment faire une demande d'EPI ?</strong><br />
          Allez dans le menu "Faire une demande", sélectionnez un EPI et la quantité souhaitée puis validez.
        </p>
        <p>
          <strong>Comment voir mes demandes passées ?</strong><br />
          Rendez-vous dans la section "Historique des demandes" pour consulter vos anciennes requêtes.
        </p>
        <p>
          <strong>Qui contacter en cas de problème ?</strong><br />
          Si vous avez un souci technique, contactez l'assistance informatique à <a href="mailto:support@portcotonou.bj" className="text-sky-700 hover:underline">support@portcotonou.bj</a>.
        </p>
      </div>
    </div>
    </EmployeNavbar>
  );
}
