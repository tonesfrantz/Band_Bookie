export {};

import { db } from '../database/db';

export const Users = {
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
