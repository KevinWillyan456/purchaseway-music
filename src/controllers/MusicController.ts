import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Music } from '../models/Music'
import { User } from '../models/User'

async function indexMusic(req: Request, res: Response) {
    try {
        const songs = await Music.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })
        return res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeMusic(req: Request, res: Response) {
    const { videoId, gender, theme } = req.body

    if (!videoId || !gender || !theme) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const music = new Music({
        _id: uuid(),
        videoId,
        gender,
        theme,
        additionDate: new Date(),
    })

    try {
        const songs = await Music.find({ videoId })
        const songAlreadyExists = songs.find(
            (song) => song.videoId === videoId && song.gender === gender
        )

        if (songAlreadyExists) {
            return res.status(400).json({ error: 'Music already exists' })
        }

        await music.save()

        return res.status(201).json({ message: 'Music added successfully!' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function updateMusic(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { audioUrl, coverUrl, title, gender, isVideo, theme } = req.body
    const { id } = req.params

    const currentCoverUrl = coverUrl
        ? coverUrl
        : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'

    if (
        !audioUrl &&
        !currentCoverUrl &&
        !title &&
        !gender &&
        !isVideo &&
        !theme
    ) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            audioUrl,
            coverUrl: currentCoverUrl,
            title,
            gender,
            isVideo,
            theme,
        },
    }

    try {
        const songs = await Music.find({ title })
        const songAlreadyExists = songs.find(
            (song) => song.videoId === title && song.gender === gender
        )

        if (songAlreadyExists) {
            return res.status(400).json({ error: 'Music cannot be updated' })
        }
        await Music.updateOne(filter, updateDoc)

        return res.status(200).json({ message: 'Music updated successfully!' })
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

    async function updatePlaylistTotalSongs(
        userId: string,
        playlistId: string
    ) {
        try {
            const user = await User.findOne({
                _id: userId,
                myPlaylists: { $exists: true },
            })

            if (!user) return

            const playlistIndex = user.myPlaylists.findIndex(
                (playlist) => playlist._id == playlistId
            )

            if (playlistIndex == -1) return

            const playlist = user.myPlaylists[playlistIndex]
            const songs = playlist.songs || []

            const totalSongs = songs.length

            await User.updateOne(
                {
                    _id: userId,
                    'myPlaylists._id': playlistId,
                },
                {
                    $set: {
                        'myPlaylists.$.totalSongs': totalSongs,
                    },
                }
            )
        } catch (err) {
            console.error(err)
        }
    }

    try {
        await User.updateMany(
            {},
            {
                $pull: {
                    favoriteSongs: { musicId: id },
                    musicHistory: { musicId: id },
                },
            }
        )
        await User.updateMany(
            { myPlaylists: { $exists: true } },
            {
                $pull: {
                    'myPlaylists.$[].songs': { musicId: id },
                },
            }
        )
        const users = await User.find({ myPlaylists: { $exists: true } })
        users.forEach((user) => {
            user.myPlaylists.forEach(async (playlist) => {
                await updatePlaylistTotalSongs(user._id, playlist._id)
            })
        })

        await Music.deleteOne(filter)
        return res.status(200).json({ message: 'Music removed successfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

export { indexMusic, storeMusic, updateMusic, deleteMusic }
