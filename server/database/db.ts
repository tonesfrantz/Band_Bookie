

import pg from 'pg';

export let db: any;
if (process.env.NODE_ENV === 'production') {
    db = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    db = new pg.Pool({
        database: 'band_bookie',
    });
}


