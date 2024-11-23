import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Music } from '../models/Music'
import { User } from '../models/User'
import MusicHandlers from '../utils/MusicHandlers'

async function indexMusic(req: Request, res: Response): Promise<void> {
    try {
        const songs = await Music.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })
            .select('-__v -viewCount')
        res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function indexMusicById(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {
    const { id } = req.params

    try {
        const music = await Music.findById(id).select('-__v -viewCount')

        if (!music) {
            res.status(404).json({ error: 'Music not found' })
            return
        }

        res.status(200).json({ music })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeMusic(req: Request, res: Response): Promise<void> {
    const { videoId, gender } = req.body

    if (!videoId || !gender) {
        res.status(400).json({ error: 'data is missing' })
        return
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
        res.status(400).json({ error: 'Invalid videoId' })
        return
    }

    try {
        const songs = await Music.find({ videoId })
        const songAlreadyExists = songs.find(
            (song) => song.videoId === videoId && song.gender === gender
        )

        if (songAlreadyExists) {
            res.status(400).json({ error: 'Music already exists' })
            return
        }

        await music.save()

        res.status(201).json({ message: 'Music added successfully!' })
        return
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function updateMusic(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {
    const { videoId } = req.body
    const { id } = req.params

    if (!videoId) {
        res.status(400).json({ error: 'VideoId is missing' })
        return
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
        res.status(400).json({ error: 'Invalid videoId' })
        return
    }

    try {
        await Music.updateOne(filter, updateDoc)

        res.status(200).json({ message: 'Music updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteMusic(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
): Promise<void> {
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
        res.status(200).json({ message: 'Music removed successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function incrementViewCount(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {
    const { id } = req.params
    const userId = req.body.userId

    if (!userId) {
        res.status(400).json({ error: 'UserId is missing' })
        return
    }

    try {
        const user = await User.findById(userId)
        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const music = await Music.findById(id)
        if (!music) {
            res.status(404).json({ error: 'Music not found' })
            return
        }

        if (music.viewCount.length === 1 && !music.viewCount[0].userId) {
            music.viewCount = []
        }

        const lastView = music.viewCount
            .filter((view) => view.userId === userId)
            .sort((a, b) => {
                return (
                    new Date(b.viewDate).getTime() -
                    new Date(a.viewDate).getTime()
                )
            })[0]

        if (lastView) {
            const lastViewDate = new Date(lastView.viewDate)
            const currentDate = new Date()

            const diffInHours = Math.abs(
                (currentDate.getTime() - lastViewDate.getTime()) / 3600000
            )

            if (diffInHours < 6) {
                res.status(200).json({
                    error: 'View not added. You can only view once every 6 hours',
                })
                return
            }
        }

        music.viewCount.push({
            _id: uuid(),
            userId,
            viewDate: new Date(),
        })

        await music.save()

        res.status(200).json({
            message: 'View count incremented successfully!',
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export {
    deleteMusic,
    incrementViewCount,
    indexMusic,
    indexMusicById,
    storeMusic,
    updateMusic,
}
