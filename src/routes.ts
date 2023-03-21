import express from 'express';

import { index, store } from './controllers/MusicController';
import { getMusic } from './middlewares/MusicMiddleware';

export const routes = express.Router();

routes.get('/songs', index);
routes.post('/songs', store);
routes.put('/songs:id', getMusic)