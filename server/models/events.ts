export {};

import { db } from '../database/db';

export const Events = {
    getAll: () => {
        const query =
            'SELECT events.*,singers.fullname as singer_name, singers.profile_photo as singer_photo FROM events INNER JOIN singers ON singers.id = events.singer_id ORDER BY events.id';
        return db.query(query).then((response: any) => {
            return response.rows;
        });
    },
    getById: (id: number) => {
        const query = `SELECT events.*,singers.fullname as singer_name, singers.profile_photo as singer_photo FROM events INNER JOIN singers ON singers.id = events.singer_id WHERE events.id = $1`;
        return db.query(query, [id]).then((response: any) => {
            return response.rows ? response.rows[0] : {};
        });
    },
    create: ({ singer_id, name, email, phone, band_size, date }) => {
        const query = `INSERT INTO events (singer_id, name, email, phone, band_size, date) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *`;
        return db
            .query(query, [singer_id, name, email, phone, band_size, date])
            .then((response: any) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    update: (
        id: number,
        singer_id: number,
        name: string,
        email: string,
        phone: string,
        band_size: number,
        date: Date
    ) => {
        const query = `UPDATE events SET singer_id= $1,  name = $2, email = $3, phone=$4, band_size=$5, date=$6 WHERE id = $7 RETURNING *`;
        return db
            .query(query, [singer_id, name, email, phone, band_size, date, id])
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
