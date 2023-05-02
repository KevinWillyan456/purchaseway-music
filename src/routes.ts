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
    indexUserById,
    loginUser,
    storeUser,
    updateUser,
    updateUserFavoriteSongs,
    updateUserMusicHistoric,
} from './controllers/UserController'

import {
    deletePlaylist,
    indexPlaylist,
    storePlaylist,
    updatePlaylist,
} from './controllers/PlaylistController'

import { getMusic } from './middlewares/MusicMiddleware'
import { getUser } from './middlewares/UserMiddleware'
import { getPlaylist } from './middlewares/PlaylistMiddleware'

export const routes = express.Router()

routes.get('/songs', indexMusic)
routes.post('/songs', storeMusic)
routes.put('/songs/:id', getMusic, updateMusic)
routes.delete('/songs/:id', getMusic, deleteMusic)

routes.get('/users', indexUser)
routes.post('/users', storeUser)
routes.post('/login', loginUser)
routes.get('/users/:id', getUser, indexUserById)
routes.put('/users/:id', getUser, updateUser)
routes.delete('/users/:id', getUser, deleteUser)

routes.post('/songs-favorite/:id', getUser, updateUserFavoriteSongs)
routes.post('/songs-historic/:id', getUser, updateUserMusicHistoric)

routes.get('/playlists', indexPlaylist)
routes.post('/playlists', storePlaylist)
routes.put('/playlists/:id', getPlaylist, updatePlaylist)
routes.delete('/playlists/:id', getPlaylist, deletePlaylist)
