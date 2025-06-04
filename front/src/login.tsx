import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nom = formData.get("nom")?.toString() || "";
    const motDePasse = formData.get("motDePasse")?.toString() || "";

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, motDePasse }),
      });

      if (!response.ok) {
        alert("Identifiants invalides");
        return;
      }

      const data = await response.json();
      const typeCompte = data.typeCompte;

      if (typeCompte === "ADMIN") {
        navigate("/admin");
      } else if (typeCompte === "GESTIONNAIRE") {
        navigate("/gestionnaire");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur serveur");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-6">Connexion</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="nom"
                    name="nom"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                    placeholder="Nom d'utilisateur"
                    required
                  />
                  <label
                    htmlFor="nom"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Nom d'utilisateur
                  </label>
                </div>

                <div className="relative">
                  <input
                    autoComplete="on"
                    id="motDePasse"
                    name="motDePasse"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                    placeholder="Mot de passe"
                    required
                  />
                  <label
                    htmlFor="motDePasse"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Mot de passe
                  </label>
                </div>

                <div className="relative">
                  <button type="submit" className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full">
                    Se connecter
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full flex justify-center mt-4">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                {/* Icône Google (facultatif) */}
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Color-" transform="translate(-401.000000, -860.000000)">
                      <g id="Google" transform="translate(401.000000, 860.000000)">
                        <path d="M9.82727273,24 ..." fill="#FBBC05"></path>
                        <path d="M23.7136364,10.1333333 ..." fill="#EB4335"></path>
                        <path d="M23.7136364,37.8666667 ..." fill="#34A853"></path>
                        <path d="M46.1454545,24 ..." fill="#4285F4"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Se connecter avec Google</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
