const pool = require("../config/db");

//class utilisateur pour toutes les interaction avec la base de donnée lié à l'utilisateur
class User {

    static async addUser(nom, email, mot_de_passe_hash) {
        const [result] = await pool.execute(
            "INSERT INTO users (nom, email, mot_de_passe_hash) VALUES (?,?,?)",
            [nom, email, mot_de_passe_hash]
        );
        return result.insertId;
    }

    
    static async findByEmail(email){
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0];
    }

}

module.exports = User;