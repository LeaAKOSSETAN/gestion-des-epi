import React from 'react';
import AdminLayout from './DashboardLayout'; 

const UserList = ({ users }) => {
  // Si users est undefined ou pas un tableau, on l'initialise à un tableau vide
  if (!Array.isArray(users)) {
    users = [];
  }

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Utilisateurs enregistrés</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">Aucun utilisateur ajouté pour le moment.</p>
        ) : (
          <table className="w-full text-left border-t">
            <thead>
              <tr className="border-b">
                <th className="py-2">Nom</th>
                <th>Email</th>
                <th>Poste</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{user.nom}</td>
                  <td>{user.email}</td>
                  <td>{user.poste}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
    

  );
};

export default UserList;
