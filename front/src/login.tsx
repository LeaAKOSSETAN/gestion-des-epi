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
      style={{ backgroundImage: "url('/images/Epi_5.jpg')" }}
    >
      <div className="bg-white bg-opacity-70 shadow-2xl rounded-2xl w-full max-w-md p-10">
        {/* Logo centré au-dessus du formulaire */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logoCo3.png"
            alt="Logo"
            className="h-20"
          />
        </div>

        <p className="text-center text-sm text-gray-800 mb-6">
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
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
              name="motDePasse"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Mot de passe"
              required
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="flex justify-between items-center text-sm text-blue-600">
              <label className="flex items-center">
               <input type="checkbox" className="mr-2 accent-blue-700" />
                Se souvenir de moi
              </label>
              <a href="#" className="hover:underline text-blue-700">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600  hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition"
            >
              Connexion
            </button>
          </form>
      </div>
    </div>
  );
}








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [nom, setNom] = useState("");
//   const [motDePasse, setMotDePasse] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nom, motDePasse }),
//       });

//       if (!response.ok) {
//         alert("Identifiants invalides");
//         return;
//       }

//       const data = await response.json();
//       const typeCompte = data.typeCompte;

//       if (typeCompte === "ADMIN") navigate("/admin");
//       else if (typeCompte === "GESTIONNAIRE") navigate("/gestionnaire");
//       else navigate("/demande-dashboard");
//     } catch (error) {
//       console.error("Erreur de connexion :", error);
//       alert("Erreur serveur");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/Epi_5.jpg')" }}
//     >
//       <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img src="/images/logoCo.png" alt="Logo" className="h-20" />
//         </div>

//         <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
//           Bienvenue
//         </h2>
//         <p className="text-center text-sm text-gray-600 mb-6">
//           Connectez-vous pour continuer
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="nom"
//             value={nom}
//             onChange={(e) => setNom(e.target.value)}
//             placeholder="Nom d'utilisateur"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
//           />
//           <input
//             type="password"
//             name="motDePasse"
//             value={motDePasse}
//             onChange={(e) => setMotDePasse(e.target.value)}
//             placeholder="Mot de passe"
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
//           />

//           <div className="flex justify-between items-center text-sm">
//             <label className="flex items-center text-sky-600">
//               <input type="checkbox" className="mr-2 accent-sky-600" />
//               Se souvenir de moi
//             </label>
//             <a href="#" className="text-sky-600 hover:underline">
//               Mot de passe oublié ?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-sky-500 to-orange-500 hover:opacity-90 text-white py-3 rounded-lg font-semibold transition duration-300"
//           >
//             Connexion
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// export default function Login() {
//   const navigate = useNavigate();
//   const [nom, setNom] = useState("");
//   const [motDePasse, setMotDePasse] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nom, motDePasse }),
//       });

//       if (!response.ok) {
//         alert("Identifiants invalides");
//         return;
//       }

//       const data = await response.json();
//       const typeCompte = data.typeCompte;

//       if (typeCompte === "ADMIN") navigate("/admin");
//       else if (typeCompte === "GESTIONNAIRE") navigate("/gestionnaire");
//       else navigate("/demande-dashboard");
//     } catch (error) {
//       console.error("Erreur de connexion :", error);
//       alert("Erreur serveur");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-sky-600 px-4">
//       <div className="bg-white shadow-2xl rounded-2xl flex w-full max-w-3xl overflow-hidden h-[80vh]">
//         {/* Image à gauche */}
//         <div className="hidden md:block w-1/2 h-full">
//           <img
//             src="/images/Epi_5.jpg"
//             alt=""
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Formulaire à droite */}
//         <div className="w-full md:w-1/2 p-10 overflow-y-auto">

//           {/* Logo centré au-dessus du formulaire */}
//           <div className="flex justify-center mb-6">
//             <img
//               src="/images/logoCo.png" // Remplace par le bon chemin de ton logo
//               alt=""
//               className="h-20 "
//             />
//           </div>
//           <p className="flex justify-center text-sm text-gray-700 mb-6">
//             Connectez-vous pour continuer
//           </p>

          // <form onSubmit={handleSubmit} className="space-y-5">
          //   <input
          //     type="text"
          //     name="nom"
          //     value={nom}
          //     onChange={(e) => setNom(e.target.value)}
          //     placeholder="Nom d'utilisateur"
          //     required
          //     className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //   />
          //   <input
          //     type="password"
          //     name="motDePasse"
          //     value={motDePasse}
          //     onChange={(e) => setMotDePasse(e.target.value)}
          //     placeholder="Mot de passe"
          //     required
          //     className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //   />

          //   <div className="flex justify-between items-center text-sm text-sky-600">
          //     <label className="flex items-center">
          //      <input type="checkbox" className="mr-2 accent-sky-600" />
          //       Se souvenir de moi
          //     </label>
          //     <a href="#" className="hover:underline text-sky-600">
          //       Mot de passe oublié ?
          //     </a>
          //   </div>

          //   <button
          //     type="submit"
          //     className="w-full bg-gradient-to-r from-orange-500 to-sky-700 hover:bg-sky-700 text-white py-2 rounded-md font-semibold transition"
          //   >
          //     Connexion
          //   </button>
          // </form>
//         </div>
//       </div>
//     </div>

//   );
// }


