import { Request, Response, NextFunction } from 'express'
import { validate as isUuid } from 'uuid'
import { Playlist } from '../models/Playlist'

async function getPlaylist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!isUuid(id)) {
        return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
        const music = await Playlist.findById(id)

        if (!music) {
            return res.status(404).json({ error: 'Playlist not found' })
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }

    next()
}

export { getPlaylist }
