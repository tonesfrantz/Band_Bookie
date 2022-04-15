import express from 'express';
import Users from '../../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();

export default router.post('/', (req, res, next) => {
    const user = req.body;
    // Note that the asynchronous version is preferred but we use Sync here for ease
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    Users.create(user)
        .then((user) => {
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
        .catch((error) => {
            // When in an asynchronous code block, we have to call the next function
            // to handle the error
            next(error);
        });
});

// module.exports = router;
