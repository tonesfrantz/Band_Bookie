if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import express, { Request, Response } from 'express';
import path from 'path';

const PORT =
    process.env.PORT || (process.env.NODE_ENV === 'production' && 3000) || 3001;
const app = express();

// App requirements
import { db } from './database/db';
import expressSession from 'express-session';
const pgSession = require('connect-pg-simple')(expressSession);

// // Controller imports
import eventController from './controllers/event/index';
import sessionsController from './controllers/session/index';
import usersController from './controllers/user/index';
// const contactController = require('./controllers/contact');
// const errorHandler = require('./middleware/error_handler');
// const logger = require('./middleware/logger');

// Handlers
app.use(
    expressSession({
        store: new pgSession({
            pool: db, // Connects to our postgres db
            createTableIfMissing: true, // Creates a session table in your database (go look at it!)
        }),
        secret: process.env.SESSION_SECRET, // Needs a secret key to keep session data secure
        resave: false,
        saveUninitialized: false,
    })
);

app.set('trust proxy', 1);

app.get('/api/test', (req: Request<any, any, any, any>, res: Response<any>) => {
    res.json({ date: new Date().toString() });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(
            path.join(__dirname, '..', 'client', 'build', 'index.html')
        );
    });
}

// Other pre-request middleware
// app.use(logger);
app.use(express.json()); // support json encoded bodies
// app.use(express.static('client'));

// // Controllers
app.use('/api/events', eventController);
app.use('/api/sessions', sessionsController);
app.use('/api/users', usersController);
// app.use('/api/contact', contactController);

// Post-request middleware
// app.use(errorHandler);

app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
