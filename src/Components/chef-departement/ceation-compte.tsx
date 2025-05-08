import { useState } from "react";
import ChefNavbar from "./Navbarchef";

function CreateEmployeeAccount() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    departement: "",
    poste: "",
    password: "",
  });

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const generatedPassword = generatePassword();

    const completeData = { ...formData, password: generatedPassword };
    console.log("Données employé à enregistrer :", completeData);

    // Simule l'envoi d'un mail
    console.log(
      `Email envoyé à ${completeData.email} :
      Bonjour ${completeData.prenom},
      Votre compte a été créé avec succès.
      Identifiants :
      Email : ${completeData.email}
      Mot de passe : ${completeData.password}
      `
    );

    alert("Compte créé et email envoyé à l'employé !");

    setFormData({
      nom: "",
      prenom: "",
      email: "",
      departement: "",
      poste: "",
      password: "",
    });
  };

  return (
   <div>
<ChefNavbar/>

<div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Création d’un compte employé
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email professionnel"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="departement"
          value={formData.departement}
          onChange={handleChange}
          placeholder="Département"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="poste"
          value={formData.poste}
          onChange={handleChange}
          placeholder="Poste"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-400"
        >
          Créer le compte et envoyer l’email
        </button>
      </form>
    </div>
   </div>
  );
}

export default CreateEmployeeAccount;
