import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import { Music } from '../models/Music'
import { Playlist } from '../models/Playlist'
import { IUser, User } from '../models/User'

async function indexPlaylist(req: Request, res: Response) {
    try {
        const playlists = await Playlist.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })

        return res.status(200).json({ playlists })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storePlaylist(req: Request, res: Response) {
    const { title, coverUrl, description, gender } = req.body

    if (!title || !description || !gender) {
        return res.status(400).json({ error: 'data is missing' })
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

        return res.status(201).json({ message: 'Playlist added successfully!' })
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

    const currentCoverUrl = coverUrl
        ? coverUrl
        : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'

    if (!title && !currentCoverUrl && !description && !gender) {
        return res.status(400).json({ error: 'You must enter a new data' })
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

        return res
            .status(200)
            .json({ message: 'Playlist updated successfully!' })
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
            .json({ message: 'Playlist removed successfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

async function deletePlaylistAndSongs(
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
        return res
            .status(200)
            .json({ message: 'Playlist and songs removed successfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

async function selectPlaylist(req: Request, res: Response) {
    const { playlist } = req.query
    const { id } = req.params

    if (!playlist) {
        return res.status(200).json({ songs: [] })
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

            return res.status(200).json({ songs })
        }

        const songs = await Music.find({ gender: playlist })
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })

        return res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export {
    indexPlaylist,
    storePlaylist,
    updatePlaylist,
    deletePlaylist,
    deletePlaylistAndSongs,
    selectPlaylist,
}
