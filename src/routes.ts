import express from 'express';

import { deleteMusic, index, store, update } from './controllers/MusicController';
import { getMusic } from './middlewares/MusicMiddleware';

export const routes = express.Router();

routes.get('/songs', index);
routes.post('/songs', store);
routes.put("/songs/:id", getMusic, update);
routes.delete("/songs/:id", getMusic, deleteMusic);