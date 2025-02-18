import express from 'express'

import {
    deleteMusic,
    incrementViewCount,
    indexMusic,
    indexMusicById,
    storeMusic,
    updateMusic,
} from './controllers/MusicController'

import {
    allSongAndPlaylistData,
    deleteUser,
    deleteUserPlaylist,
    deleteUserPlaylistSongs,
    indexUser,
    indexUserById,
    indexUserPlaylist,
    loginUser,
    logoutUser,
    requestPasswordReset,
    resetPassword,
    storeUser,
    storeUserPlaylist,
    storeUserPlaylistSongs,
    updateUser,
    updateUserFavoriteSongs,
    updateUserMusicHistoric,
    updateUserPlaylist,
    updateUserPlaylistSelected,
    updateUserProfilePicture,
    updateUserTheme,
} from './controllers/UserController'

import {
    deletePlaylist,
    deletePlaylistAndSongs,
    indexPlaylist,
    selectPlaylist,
    storePlaylist,
    updatePlaylist,
} from './controllers/PlaylistController'

import { eAdminManagerRequest } from './middlewares/AuthAdminMiddleware'
import { getMusic } from './middlewares/MusicMiddleware'
import { getPlaylist } from './middlewares/PlaylistMiddleware'
import { getUser } from './middlewares/UserMiddleware'

export const routes = express.Router()

routes.get('/songs', indexMusic)
routes.get('/song/:id', indexMusicById)
routes.post('/songs', eAdminManagerRequest, storeMusic)
routes.put('/songs/:id', eAdminManagerRequest, getMusic, updateMusic)
routes.delete('/songs/:id', eAdminManagerRequest, getMusic, deleteMusic)
routes.put('/songs-view-count/:id', incrementViewCount)

routes.get('/users', eAdminManagerRequest, indexUser)
routes.get('/users/:id', getUser, indexUserById)
routes.post('/users', storeUser)
routes.post('/login', loginUser)
routes.post('/logout/:id', logoutUser)
routes.put('/users/:id', getUser, updateUser)
routes.delete('/users/:id', getUser, deleteUser)
routes.post('/request-reset', requestPasswordReset)
routes.post('/reset-password', resetPassword)

routes.put('/songs-favorite/:id', getUser, updateUserFavoriteSongs)
routes.put('/songs-historic/:id', getUser, updateUserMusicHistoric)
routes.put('/playlists-historic/:id', getUser, updateUserPlaylistSelected)

routes.get('/users-playlist/:id', getUser, indexUserPlaylist)
routes.post('/users-playlist/:id', getUser, storeUserPlaylist)
routes.put('/users-playlist/:id/:pid', getUser, updateUserPlaylist)
routes.delete('/users-playlist/:id/:pid', getUser, deleteUserPlaylist)
routes.post('/users-playlist-song/:id/:pid', getUser, storeUserPlaylistSongs)
routes.delete(
    '/users-playlist-song/:id/:pid/:sid',
    getUser,
    deleteUserPlaylistSongs,
)
routes.patch('/users-theme/:id', getUser, updateUserTheme)
routes.put('/users-profile-picture/:id', updateUserProfilePicture)

routes.get('/playlists/:id', getUser, indexPlaylist)
routes.get('/playlists-select/:id', getUser, selectPlaylist)
routes.post('/playlists', eAdminManagerRequest, storePlaylist)
routes.put('/playlists/:id', eAdminManagerRequest, getPlaylist, updatePlaylist)
routes.delete(
    '/playlists/:id',
    eAdminManagerRequest,
    getPlaylist,
    deletePlaylist,
)
routes.delete(
    '/songs-playlists/:id',
    eAdminManagerRequest,
    getPlaylist,
    deletePlaylistAndSongs,
)

routes.get('/songs-playlists/:userId', allSongAndPlaylistData)
