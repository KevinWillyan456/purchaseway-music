import express from 'express'

import { index } from './controllers/MusicController'

export const routes = express.Router()

routes.get('/songs', index)
