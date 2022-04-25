export {};

import { db } from '../database/db';

export const Events = {
    getAll: () => {
        const query =
            'SELECT events.*,singers.fullname as singer_name FROM events INNER JOIN singers ON singers.id = events.singer_id ORDER BY events.id';
        return db.query(query).then((response: any) => {
            return response.rows;
        });
    },
    getById: (id: number) => {
        const query = `SELECT events.*,singers.fullname as singer_name FROM events INNER JOIN singers ON singers.id = events.singer_id WHERE events.id = $1`;
        return db.query(query, [id]).then((response: any) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    create: ({ singer_id, name, date }) => {
        const query = `INSERT INTO events (singer_id,  name, date) VALUES ($1, $2, $3 ) RETURNING *`;
        return db
            .query(query, [singer_id, name, date])
            .then((response: any) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    update: (
        id: number,
        singer_id: number,

        name: string,
        date: Date
    ) => {
        const query = `UPDATE events SET singer_id= $1,  name = $2, date=$3 WHERE id = $4 RETURNING *`;
        return db
            .query(query, [singer_id, name, date, id])
            .then((response: any) => {
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

// module.exports = Events;
