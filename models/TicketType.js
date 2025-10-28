const pool = require('../config/db');

class TicketType {
    static async addTicketType(event_id, nom, prix, quantité_totale, quantité_restante) {
        const [result] = await pool.execute(
            'INSERT INTO ticket_types (event_id, nom, prix, quantité_totale, quantité_restante) VALUES (?, ?, ?, ?, ?)',
            [event_id, nom, prix, quantité_totale, quantité_restante]
        );
        return result.insertId;
    }

    static async findByEventId(event_id) {
        const [rows] = await pool.execute('SELECT * FROM ticket_types WHERE event_id = ?', [event_id]);
        return rows;
    }
}

module.exports = TicketType;