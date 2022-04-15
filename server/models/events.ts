export {};

const db: any = require('../database/db');

const Events = {
    getAll: () => {
        const query = 'SELECT * FROM events';
        return db.query(query).then((response) => {
            return response.rows;
        });
    },
    getById: (id: number) => {
        const query = `SELECT * FROM events WHERE id = $1`;
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    create: ({ name, date }) => {
        const query = `INSERT INTO events (name, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        return db.query(query, [name, date]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    update: (id: number, name: string, date: Date) => {
        const query = `UPDATE events SET name = $1, date=$2 WHERE id = $3 RETURNING *`;
        return db.query(query, [name, date, id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    delete: (id: number) => {
        const query = `DELETE FROM events WHERE id = $1`;
        return db.query(query, [id]).then(() => {
            return true;
        });
    },
};

module.exports = Events;
