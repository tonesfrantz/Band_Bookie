export {};

import { db } from '../database/db';

export const Users = {
    // This could be a security issue. (? Check w Alex and Will)
    // CHange to not return Password
    getAll: () => {
        const query = 'SELECT id, username, is_admin FROM users ORDER BY id';
        return db.query(query).then((response: any) => {
            return response.rows;
        });
    },

    getById: (id: number) => {
        const query = 'SELECT * FROM users WHERE id = $1';
        return db.query(query, [id]).then((response: any) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    getByUsername: (username: string) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        return db.query(query, [username]).then((response) => {
            return response.rows[0];
        });
    },
    update: (id: number, username: string, is_admin: boolean) => {
        const query = `UPDATE users SET username = $1, is_admin=$2 WHERE id = $3 RETURNING *`;
        return db
            .query(query, [username, is_admin, id])
            .then((response: any) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    create: ({ username, password, is_admin = false }) => {
        const query =
            'INSERT INTO users (username, password, is_admin) VALUES($1, $2, $3) RETURNING *';
        return db
            .query(query, [username, password, is_admin])
            .then((response: any) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            });
    },
};

// module.exports = Users;
