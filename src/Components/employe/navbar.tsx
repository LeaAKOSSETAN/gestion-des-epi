import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/demande-epi", label: "Demande" },
  { to: "/historique-demandes", label: "Historique des demandes" },
  { to: "/ListeDispo", label: "EPI disponibles" },
  { to: "/historique", label: "Historique mise à dispo" },

];

function EmployeeNavbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Espace Employé</h1>
      <div className="space-x-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `hover:underline transition duration-200 ${isActive ? "font-semibold underline" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default EmployeeNavbar;
