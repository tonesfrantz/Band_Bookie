import express from 'express';
import { Users } from '../../models/user';
import bcrypt from 'bcrypt';
import errorHandler from '../../middleware/error_handler';
import { isLoggedIn } from '../../middleware/is_logged_in';

const router = express.Router();

router.post('/', errorHandler, (req: any, res: any, next: any) => {
    const user = req.body;
    // Note that the asynchronous version is preferred but we use Sync here for ease

    // Check here if ADMIN is True and only then can set admin.

    if (req.body.is_admin == true) {
        return res.status(500).json({
            message: 'You are not Admin.. Go away!',
        });
    }
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    Users.create(user)
        .then((user: any) => {
            if (!user) {
                return res.status(500).json({
                    message:
                        'Something went wrong creating the user. Please try again.',
                });
            }
            req.session.userId = user.id;
            req.session.username = user.username;
            return res.json(user);
        })
        .catch((error: any) => {
            // When in an asynchronous code block, we have to call the next function
            // to handle the error
            next(error);
        });
});
// UPdate/PATCH
router.patch('/:id([0-9]+)', isLoggedIn, (req: any, res: any) => {
    const { id, username, is_admin } = req.body;
    Users.update(id, username, is_admin).then((response: any) => {
        res.json({ message: 'Item updated' });
    });
});

// Check if user is admin... Front end error hadler
router.get('/', (req: any, res: any) => {
    Users.getAll().then((response: any) => {
        res.json(response);
    });
});
router.get('/:id([0-9]+)', (req: any, res: any) => {
    Users.getById(req.params.id).then((response: any) => {
        res.json(response);
    });
});
router.delete('/:id([0-9]+)', (req: any, res: any) => {
    Users.delete(req.params.id).then((response: any) => {
        res.json(response);
    });
});
export default router;
