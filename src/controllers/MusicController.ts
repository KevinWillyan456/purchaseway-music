import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Music } from '../models/Music'

async function index(req: Request, res: Response) {
    try {
        const songs = await Music.find()
        return res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function store(req: Request, res: Response) {
    const { audioUrl, coverUrl, title, gender, theme } = req.body

    if (!audioUrl || !coverUrl || !title || !gender || !theme) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const music = new Music({
        _id: uuid(),
        audioUrl,
        coverUrl,
        title,
        gender,
        theme,
        additionDate: new Date()
    })

    try {
        await music.save()

        return res.status(201).json({ message: 'Music added succesfully!' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function update(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { audioUrl, coverUrl, title, gender, theme } = req.body
    const { id } = req.params

    if (!audioUrl && !coverUrl && !title && !gender && !theme) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            audioUrl,
            coverUrl,
            title,
            gender,
            theme,
        },
    }

    try {
        await Music.updateOne(filter, updateDoc)

        return res.status(200).json({ message: 'Music updated succesfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteMusic(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params
    const filter = { _id: id }

    try {
        await Music.deleteOne(filter)
        return res.status(200).json({ message: 'Music removed succesfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

export { index, store, update, deleteMusic }
