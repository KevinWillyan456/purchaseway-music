import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Playlist } from '../models/Playlist'

async function indexPlaylist(req: Request, res: Response) {
    try {
        const playlists = await Playlist.find()
        return res.status(200).json({ playlists })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storePlaylist(req: Request, res: Response) {
    const { title, coverUrl, description, gender } = req.body

    if (!title || !coverUrl || !description || !gender) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const playlist = new Playlist({
        _id: uuid(),
        title,
        coverUrl,
        description,
        gender,
        additionDate: new Date(),
    })

    try {
        await playlist.save()

        return res.status(201).json({ message: 'Playlist added succesfully!' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function updatePlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { title, coverUrl, description, gender } = req.body
    const { id } = req.params

    if (!title && !coverUrl && !description && !gender) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            title,
            coverUrl,
            description,
            gender,
        },
    }

    try {
        await Playlist.updateOne(filter, updateDoc)

        return res
            .status(200)
            .json({ message: 'Playlist updated succesfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deletePlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params
    const filter = { _id: id }

    try {
        await Playlist.deleteOne(filter)
        return res
            .status(200)
            .json({ message: 'Playlist removed succesfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

export { indexPlaylist, storePlaylist, updatePlaylist, deletePlaylist }