// import { useState } from "react";
// import { Lock, Mail } from "lucide-react";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [motDePasse, setMotDePasse] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Logique de connexion
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Connexion à la plateforme
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Adresse e-mail
//             </label>
//             <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-gray-50">
//               <Mail className="text-gray-400 mr-2" size={18} />
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="bg-transparent w-full outline-none text-sm"
//                 placeholder="exemple@entreprise.com"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Mot de passe
//             </label>
//             <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-gray-50">
//               <Lock className="text-gray-400 mr-2" size={18} />
//               <input
//                 type="password"
//                 required
//                 value={motDePasse}
//                 onChange={(e) => setMotDePasse(e.target.value)}
//                 className="bg-transparent w-full outline-none text-sm"
//                 placeholder="••••••••"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition duration-300"
//           >
//             Se connecter
//           </button>

//           <p className="text-xs text-center text-gray-500 mt-4">
//             Mot de passe oublié ? <span className="text-blue-600 hover:underline cursor-pointer">Réinitialiser</span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, motDePasse }),
      });

      if (!response.ok) {
        alert("Identifiants invalides");
        return;
      }

      const data = await response.json();
      const typeCompte = data.typeCompte;

      if (typeCompte === "ADMIN") navigate("/admin");
      else if (typeCompte === "GESTIONNAIRE") navigate("/gestionnaire");
      else navigate("/demande-dashboard");
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Erreur serveur");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/Epi_.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 shadow-2xl rounded-2xl w-full max-w-md p-10">
        {/* Logo centré au-dessus du formulaire */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logoCo.png"
            alt="Logo"
            className="h-20"
          />
        </div>

        <p className="text-center text-sm text-gray-700 mb-6">
          Connectez-vous pour continuer
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom d'utilisateur"
            required
            className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="password"
            name="motDePasse"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Mot de passe"
            required
            className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <div className="flex justify-between items-center text-sm text-indigo-700">
            <label className="flex items-center text-sky-600">
              <input type="checkbox" className="mr-2 accent-sky-600" />
              Se souvenir de moi
            </label>
            <a href="#" className="hover:underline text-sky-600">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-sky-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

