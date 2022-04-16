import express from 'express';
import { Users } from '../../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();

// Routes
// 1. Create Session (login)
router.post('/', (req: any, res: any) => {
    const username = req.body.username;
    const password = req.body.password;
    Users.getByUsername(username).then((userNameResponse: any) => {
        // Check the password (and/or email)
        // if it is correct
        const valid =
            userNameResponse &&
            bcrypt.compareSync(password, userNameResponse.password);
        if (username === userNameResponse.username && valid === true) {
            // req.session.id = userNameResponse.id;
            req.session.username = username;
            res.status(200).json({
                id: userNameResponse.id,
                username: username,
            });
        } else {
            res.status(400).json({
                message: 'Incorrect username or password',
            });
        }
    });
});

// 2. Get Session
router.get('/', (req: any, res: any) => {
    // If Logged in Check
    if (req.session.username) {
        res.json({
            username: req.session.username,
        });
    } else {
        // 401 - Unauthorised
        res.status(401).json({
            message: 'Not logged in.',
        });
    }
});

// 3. Delete Sessions (logout)
router.delete('/', (req: any, res: any) => {
    req.session.destroy();
    console.log('Signed out');
    res.json({
        message: 'Logged out.',
    });
});

export default router;
