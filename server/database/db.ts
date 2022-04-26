import pg from 'pg';

export let db: any;
if (process.env.NODE_ENV === 'production') {
    console.log('prod');
    db = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    console.log('not prod');
    db = new pg.Pool({
        database: 'band_bookie',
        ssl: false,
    });
}
