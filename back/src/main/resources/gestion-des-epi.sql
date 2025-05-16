CREATE DATABASE gestion_des_epi;

CREATE TABLE departements (
    id integer AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE postes (
    id integer AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    departement_id INT DEFAULT NULL,
    FOREIGN KEY (departement_id) REFERENCES departements(id) ON DELETE SET NULL,    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE utilisateurs (
    id integer AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    typeCompte ENUM('ADMIN', 'CHEF_DEPT', 'GESTIONNAIRE', 'EMPLOYE') NOT NULL,
    actif BOOLEAN DEFAULT TRUE,
    poste_id integer DEFAULT NULL,
    FOREIGN KEY (poste_id) REFERENCES postes(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE epis (
    id integer AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    quantite_en_stock Integer DEFAULT 0,
    seuil_alerte integer DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posteEpis (
    id integer AUTO_INCREMENT PRIMARY KEY,
    poste_id integer,
    epi_id integer,
    quantite integer DEFAULT 0,
    FOREIGN KEY (poste_id) REFERENCES postes(id) ON DELETE SET NULL,
    FOREIGN KEY (epi_id) REFERENCES epis(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE demandeEpis (
    id integer AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id integer NOT NULL,
    epi_id integer NOT NULL,
    date_demande DATE NOT NULL,
    quantite integer NOT NULL
    statut_validation ENUM('EN_ATTENTE', 'VALIDEE', 'REFUSEE') DEFAULT 'EN_ATTENTE',
    statut_livraison ENUM('NON_LIVREE', 'LIVREE') DEFAULT 'NON_LIVREE',
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (epi_id) REFERENCES epis(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE livraisons (
    id integer AUTO_INCREMENT PRIMARY KEY,
    demandeEpi_id integer NOT NULL,
    date_livraison DATE NOT NULL,
    livreur VARCHAR(100) NOT NULL,
    FOREIGN KEY (demandeEpi_id) REFERENCES demandes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

