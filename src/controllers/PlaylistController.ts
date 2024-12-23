import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Music } from '../models/Music'
import { Playlist } from '../models/Playlist'
import { IUser, User } from '../models/User'

const MAX_LENGTH_TITLE_PLAYLIST = 50

async function indexPlaylist(req: Request, res: Response): Promise<void> {
    try {
        const playlists = await Playlist.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })
            .select('-__v')

        res.status(200).json({ playlists })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storePlaylist(req: Request, res: Response): Promise<void> {
    const { title, coverUrl, description, gender } = req.body

    if (!title || !description || !gender) {
        res.status(400).json({ error: 'data is missing' })
        return
    }

    if (title.length > MAX_LENGTH_TITLE_PLAYLIST) {
        res.status(400).json({
            error: `The title must have a maximum of ${MAX_LENGTH_TITLE_PLAYLIST} characters`,
        })
        return
    }

    const currentCoverUrl = coverUrl
        ? coverUrl
        : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'

    const playlist = new Playlist({
        _id: uuid(),
        title,
        coverUrl: currentCoverUrl,
        description,
        gender,
        additionDate: new Date(),
    })

    try {
        await playlist.save()

        res.status(201).json({ message: 'Playlist added successfully!' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function updatePlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
): Promise<void> {
    const { title, coverUrl, description, gender } = req.body
    const { id } = req.params

    const currentCoverUrl = coverUrl
        ? coverUrl
        : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'

    if (!title && !currentCoverUrl && !description && !gender) {
        res.status(400).json({ error: 'You must enter a new data' })
        return
    }

    if (title && title.length > MAX_LENGTH_TITLE_PLAYLIST) {
        res.status(400).json({
            error: `The title must have a maximum of ${MAX_LENGTH_TITLE_PLAYLIST} characters`,
        })
        return
    }

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            title,
            coverUrl: currentCoverUrl,
            description,
            gender,
        },
    }

    try {
        const playlist = await Playlist.findById(id)
        await Playlist.updateOne(filter, updateDoc)

        if (gender != playlist?.gender) {
            await Music.updateMany(
                { gender: playlist?.gender },
                {
                    $set: {
                        gender,
                    },
                }
            )
        }

        res.status(200).json({ message: 'Playlist updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deletePlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
): Promise<void> {
    const { id } = req.params
    const filter = { _id: id }

    try {
        await Playlist.deleteOne(filter)
        res.status(200).json({ message: 'Playlist removed successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deletePlaylistAndSongs(
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
        const playlist = await Playlist.findById(id)
        const songs = await Music.find({ gender: playlist?.gender })
        const songIdsToRemove = songs.map((song) => song._id)
        await Music.deleteMany({ gender: playlist?.gender })
        await User.updateMany(
            {},
            {
                $pull: {
                    favoriteSongs: { musicId: { $in: songIdsToRemove } },
                    musicHistory: { musicId: { $in: songIdsToRemove } },
                },
            }
        )
        await User.updateMany(
            {
                myPlaylists: { $exists: true },
            },
            {
                $pull: {
                    'myPlaylists.$[].songs': {
                        musicId: { $in: songIdsToRemove },
                    },
                },
            }
        )
        const users = await User.find({ myPlaylists: { $exists: true } })
        users.forEach((user) => {
            user.myPlaylists.forEach(async (playlist) => {
                await updatePlaylistTotalSongs(user._id, playlist._id)
            })
        })

        await Playlist.deleteOne(filter)
        res.status(200).json({
            message: 'Playlist and songs removed successfully!',
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function selectPlaylist(req: Request, res: Response): Promise<void> {
    const { playlist } = req.query
    const { id } = req.params

    if (!playlist) {
        res.status(200).json({ songs: [] })
        return
    }

    try {
        if (playlist == 'Favorite') {
            const user: IUser | null = await User.findById(
                id,
                '-password -email'
            )
            const userFavoriteSongs: string[] = []

            if (user != null) {
                user.favoriteSongs.forEach((music) => {
                    userFavoriteSongs.push(music.musicId)
                })
            }

            const songs = await Music.find({ _id: { $in: userFavoriteSongs } })
                .sort({ title: 1 })
                .collation({ locale: 'pt', strength: 2 })
                .select('-__v')

            res.status(200).json({ songs })
            return
        }

        const songs = await Music.find({ gender: playlist })
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })
            .select('-__v')

        res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export {
    deletePlaylist,
    deletePlaylistAndSongs,
    indexPlaylist,
    selectPlaylist,
    storePlaylist,
    updatePlaylist,
}
