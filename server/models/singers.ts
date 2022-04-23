export {};

import { db } from '../database/db';

export const Singers = {
    // This could be a security issue. (? Check w Alex and Will)
    // CHange to not return Password
    get: () => {
        const query =
            'SELECT id, fullname, profile_photo, instrument FROM singers ORDER BY id';
        return db.query(query).then((response: any) => {
            return response.rows;
        });
    },

    getById: (id: number) => {
        const query = 'SELECT * FROM singers WHERE id = $1';
        return db.query(query, [id]).then((response: any) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    getByFullname: (fullname: string) => {
        const query = 'SELECT * FROM singers WHERE fullname = $1';
        return db.query(query, [fullname]).then((response) => {
            return response.rows[0];
        });
    },
    update: (
        id: number,
        profile_photo: string,
        fullname: string,
        instrument: string
    ) => {
        const query = `UPDATE singers SET profile_photo =$1, fullname = $2, instrument=$3 WHERE id = $4 RETURNING *`;
        return db
            .query(query, [profile_photo, fullname, instrument, id])
            .then((response: any) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    create: ({ profile_photo, fullname, instrument }) => {
        const query =
            'INSERT INTO singers (profile_photo, fullname, instrument) VALUES($1, $2,$3) RETURNING *';
        return db
            .query(query, [profile_photo, fullname, instrument])
            .then((response: any) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            });
    },
    delete: (id: number) => {
        const query = `DELETE FROM singers WHERE id = $1`;
        return db.query(query, [id]).then(() => {
            return true;
        });
    },
};

// module.exports = Users;
