import express from 'express';
import { Singers } from '../../models/singers';
import bcrypt from 'bcrypt';
import errorHandler from '../../middleware/error_handler';
import { isLoggedIn } from '../../middleware/is_logged_in';
import { isAdmin } from '../../middleware/is_admin';

const router = express.Router();

router.post('/', errorHandler, isAdmin, (req: any, res: any, next: any) => {
    const singer = req.body;

    Singers.create(singer)
        .then((singer: any) => {
            if (!singer) {
                return res.status(500).json({
                    message:
                        'Something went wrong creating the singer. Please try again.',
                });
            }
            // req.session.userId = user.id;
            // req.session.username = user.username;
            return res.json(singer);
        })
        .catch((error: any) => {
            // When in an asynchronous code block, we have to call the next function
            // to handle the error
            next(error);
        });
});
// UPdate/PATCH
router.patch('/:id([0-9]+)', isLoggedIn, (req: any, res: any) => {
    const { id, profile_photo, fullname, instrument } = req.body;
    Singers.update(id, profile_photo, fullname, instrument).then(
        (response: any) => {
            res.json({ message: 'Item updated' });
        }
    );
});

// Check if user is admin... Front end error hadler
router.get('/', (req: any, res: any) => {
    Singers.get().then((response: any) => {
        res.json(response);
    });
});
router.get('/:id([0-9]+)', (req: any, res: any) => {
    Singers.getById(req.params.id).then((response: any) => {
        res.json(response);
    });
});
router.delete('/:id([0-9]+)', (req: any, res: any) => {
    Singers.delete(req.params.id).then((response: any) => {
        res.json(response);
    });
});
export default router;
