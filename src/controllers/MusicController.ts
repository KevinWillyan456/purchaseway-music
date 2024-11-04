import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Music } from '../models/Music'
import { User } from '../models/User'
import MusicHandlers from '../utils/MusicHandlers'

async function indexMusic(req: Request, res: Response) {
    try {
        const songs = await Music.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })
            .select('-__v')
        return res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeMusic(req: Request, res: Response) {
    const { videoId, gender } = req.body

    if (!videoId || !gender) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const music = new Music({
        _id: uuid(),
        videoId,
        gender,
        coverUrl: await MusicHandlers.getVideoCover(videoId),
        title: await MusicHandlers.getVideoTitle(
            videoId,
            process.env.API_YOUTUBE_KEY || ''
        ),
        additionDate: new Date(),
    })

    if (!music.title) {
        return res.status(400).json({ error: 'Invalid videoId' })
    }

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

async function updateMusic(req: Request<{ id: string }>, res: Response) {
    const { videoId } = req.body
    const { id } = req.params

    if (!videoId) {
        return res.status(400).json({ error: 'VideoId is missing' })
    }

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            videoId,
            coverUrl: await MusicHandlers.getVideoCover(videoId),
            title: await MusicHandlers.getVideoTitle(
                videoId,
                process.env.API_YOUTUBE_KEY || ''
            ),
        },
    }

    if (!updateDoc.$set.title) {
        return res.status(400).json({ error: 'Invalid videoId' })
    }

    try {
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

async function incrementViewCount(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params
    const userId = req.body.userId

    if (!userId) {
        return res.status(400).json({ error: 'UserId is missing' })
    }

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const music = await Music.findById(id)
        if (!music) {
            return res.status(404).json({ error: 'Music not found' })
        }

        music.viewCount += 1
        await music.save()

        return res
            .status(200)
            .json({ message: 'View count incremented successfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

export { indexMusic, storeMusic, updateMusic, deleteMusic, incrementViewCount }
