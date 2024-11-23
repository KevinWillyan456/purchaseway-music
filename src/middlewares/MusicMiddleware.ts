import { Request, Response, NextFunction } from 'express'
import { validate as isUuid } from 'uuid'
import { Music } from '../models/Music'

async function getMusic(
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
        const music = await Music.findById(id)

        if (!music) {
            res.status(404).json({ error: 'Music not found' })
            return
        }
    } catch (err) {
        res.status(500).json({ error: err })
        return
    }

    next()
}

export { getMusic }
