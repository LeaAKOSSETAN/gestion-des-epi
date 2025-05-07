CREATE DATABASE gestion_des_epi;

CREATE TABLE departements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'CHEF_DEPT', 'GESTIONNAIRE', 'EMPLOYE') NOT NULL,
    statut BOOLEAN DEFAULT TRUE,
    departement_id INT DEFAULT NULL,
    FOREIGN KEY (departement_id) REFERENCES departements(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE epis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    quantite_en_stock INT DEFAULT 0,
    seuil_alerte INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE demandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employe_id INT NOT NULL,
    date_demande DATE NOT NULL,
    statut_validation ENUM('EN_ATTENTE', 'VALIDEE', 'REFUSEE') DEFAULT 'EN_ATTENTE',
    statut_livraison ENUM('NON_LIVREE', 'LIVREE') DEFAULT 'NON_LIVREE',
    FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE demande_epi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    demande_id INT NOT NULL,
    epi_id INT NOT NULL,
    quantite INT NOT NULL,
    FOREIGN KEY (demande_id) REFERENCES demandes(id) ON DELETE CASCADE,
    FOREIGN KEY (epi_id) REFERENCES epis(id) ON DELETE CASCADE
);

CREATE TABLE livraisons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    demande_id INT NOT NULL,
    date_livraison DATE NOT NULL,
    livreur VARCHAR(100) NOT NULL,
    remarque TEXT,
    FOREIGN KEY (demande_id) REFERENCES demandes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

