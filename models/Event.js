const pool = require("../config/db");

class Event {

    static async AddEvent(titre, description, date, lieu, image_url, capacité_totale, created_by){
        const [result] = await pool.execute(
            "INSERT INTO events (titre, description, date, lieu, image_url, capacité_totale, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [titre, description, date, lieu, image_url, capacité_totale, created_by]
        );
        return result.insertId;
    }

    static async allEvents() {
        const [rows] = await pool.execute('SELECT * FROM events');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM events WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Event;