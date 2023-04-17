import express from 'express'

import {
    deleteMusic,
    indexMusic,
    storeMusic,
    updateMusic,
} from './controllers/MusicController'

import {
    deleteUser,
    indexUserById,
    loginUser,
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

routes.post('/users', storeUser)
routes.post('/login', loginUser)
routes.get('/users/:id', getUser, indexUserById)
routes.put('/users/:id', getUser, updateUser)
routes.delete('/users/:id', getUser, deleteUser)
