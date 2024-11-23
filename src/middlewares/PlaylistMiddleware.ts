import { Request, Response, NextFunction } from 'express'
import { validate as isUuid } from 'uuid'
import { Playlist } from '../models/Playlist'

async function getPlaylist(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params

    if (!isUuid(id)) {
        res.status(400).json({ error: 'Invalid ID' })
        return
    }

    try {
        const playlist = await Playlist.findById(id)

        if (!playlist) {
            res.status(404).json({ error: 'Playlist not found' })
            return
        }
    } catch (err) {
        res.status(500).json({ error: err })
        return
    }

    next()
}

export { getPlaylist }
