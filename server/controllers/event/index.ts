import express from 'express';
import { Events } from '../../models/events';
import { isLoggedIn } from '../../middleware/is_logged_in';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    Events.getAll().then((response: any) => {
        res.json(response);
    });
});

router.get('/:id([0-9]+)', (req: any, res: any) => {
    Events.getById(req.params.id).then((response: any) => {
        res.json(response);
    });
});

router.post('/', isLoggedIn, (req: any, res: any) => {
    Events.create(req.body).then((response: any) => {
        res.status(201).json(response);
    });
});

router.patch('/:id([0-9]+)', isLoggedIn, (req: any, res: any) => {
    const { id, singer_id, name, email, phone, band_size, date } = req.body;
    Events.update(id, singer_id, name, email, phone, band_size, date).then(
        (response: any) => {
            res.json({ message: 'Item updated' });
        }
    );
});

router.put('/', isLoggedIn, (req: any, res: any) => {
    const { id, singer_id, name, email, phone, band_size, date } = req.body;
    Events.update(id, singer_id, name, email, phone, band_size, date).then(
        () => {
            res.json({ message: `Item updated` });
        }
    );
});

router.delete('/:id([0-9]+)', isLoggedIn, (req: any, res: any) => {
    Events.delete(req.params.id).then((response: any) => {
        if (response) {
            res.json({ status: true, message: 'Item deleted' });
        }
    });
});
export default router;
