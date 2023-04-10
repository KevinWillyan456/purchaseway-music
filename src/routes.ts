import express from 'express'

import {
    deleteMusic,
    indexMusic,
    storeMusic,
    updateMusic,
} from './controllers/MusicController'

import {
    deleteUser,
    indexUser,
    storeUser,
    updateUser,
} from './controllers/UserController'

import { getMusic } from './middlewares/MusicMiddleware'
import { getUser } from './middlewares/UserMiddleware'

export const routes = express.Router()

routes.get('/songs', indexMusic)
routes.post('/songs', storeMusic)
routes.put('/songs/:id', getMusic, updateMusic)
routes.delete('/songs/:id', getMusic, deleteMusic)

routes.get('/users', indexUser)
routes.post('/users', storeUser)
routes.put('/users/:id', getUser, updateUser)
routes.delete('/users/:id', getUser, deleteUser)
