const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

async function register(req, res) {
    const { nom, email, mot_de_passe } = req.body;
    const mot_de_passe_hash = await bcrypt.hash(mot_de_passe, 10);
    try {
        console.log("Tentative d'ajout de l'utilisateur:", { nom, email, mot_de_passe_hash });
        const userId = await User.addUser(nom, email, mot_de_passe_hash);
        console.log("Utilisateur créé avec ID:", userId);
        const token = jwt.sign({ id: userId, role: "user" }, process.env.JWT_SECRET, { expiresIn: "8h" });
        console.log("Token généré avec succès:", token);
        res.status(201).json({ token });
    } catch (error) {
        console.error("Détails de l'erreur lors de l'inscription :", error);
        res.status(400).json({ message: "Erreur lors de l'inscription", erreur: error.message });
    }
}

async function login(req, res) {
    const { email, mot_de_passe } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (user && (await bcrypt.compare(mot_de_passe, user.mot_de_passe_hash))) {
            const token = jwt.sign({ id: user.id, nom: user.nom, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
            res.status(200).json({ 
                nom: user.nom,
                email: user.email,
                token 
            });
        } else {
            res.status(401).json({ message: "Identifiants invalides" });
        }
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la connexion" });
    }
}

module.exports = { register, login };
