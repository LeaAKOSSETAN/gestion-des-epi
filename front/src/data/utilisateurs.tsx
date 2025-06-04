export type Utilisateur = {
    id: number;
    nom: string;
    email: string;
    role: "gestionnaire" | "chef département";
    actif: boolean;
  };
  
  export const utilisateursInitial: Utilisateur[] = [
    { id: 1, nom: "Alice", email: "alice@email.com", role: "gestionnaire", actif: true },
    { id: 2, nom: "Bob", email: "bob@email.com", role: "chef département", actif: false },
    { id: 3, nom: "Claire", email: "claire@email.com", role: "chef département", actif: true },
  ];
  