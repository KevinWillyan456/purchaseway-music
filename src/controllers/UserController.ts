import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser, User } from '../models/User'
import { Music } from '../models/Music'
import { Playlist } from '../models/Playlist'

async function indexUser(req: Request, res: Response) {
    try {
        const users = await User.find({}, '-password')
        return res.status(200).json({ users })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function indexUserById(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params

    try {
        const user = await User.findById(id, '-password')
        return res.status(200).json({ user })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeUser(req: Request, res: Response) {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const encryptedPassword = await bcrypt.hash(password, 8)

    const lastAccessedPlaylist = await Playlist.find()
        .sort({ title: 1 })
        .collation({ locale: 'pt', strength: 2 })
        .select('title gender')
        .lean()
        .then((data) => {
            if (data.length === 0) {
                return {
                    title: '',
                    gender: '',
                }
            }

            const randomIndex = Math.floor(Math.random() * data.length)
            return {
                title: data[randomIndex].title,
                gender: data[randomIndex].gender,
            }
        })

    const user = new User({
        _id: uuid(),
        name,
        password: encryptedPassword,
        additionDate: new Date(),
        lastAccessedPlaylist: lastAccessedPlaylist.gender,
        lastAccessedPlaylistName: lastAccessedPlaylist.title,
    })

    try {
        await user.save()

        return res.status(201).json({ message: 'User added successfully!' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function loginUser(req: Request, res: Response) {
    const { name, password, hasConnect } = req.body

    if (!name || !password) {
        return res.status(400).json({ error: 'data is missing' })
    }

    try {
        const user = await User.findOne({ name })
        let dateTokenExpires: string | number
        let dateCookieExpires: number

        if (!user) {
            return res.status(400).json({ error: 'wrong name or password' })
        }

        if (!(await bcrypt.compare(password, user?.password))) {
            return res.status(400).json({ error: 'wrong name or password' })
        }

        if (hasConnect) {
            dateTokenExpires = '7d'
            dateCookieExpires = 604800000
        } else {
            dateTokenExpires = 600
            dateCookieExpires = 600000
        }

        const token = jwt.sign({ id: user?._id }, `${process.env.JWT_SECRET}`, {
            expiresIn: dateTokenExpires,
        })

        res.cookie('token', `Bearer ${token}`, {
            maxAge: dateCookieExpires,
        })
        return res.status(200).json({
            erro: false,
            mensagem: 'Login',
            token,
        })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

async function updateUser(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { name, password } = req.body
    const { id } = req.params

    if (!name && !password) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const encryptedPassword = await bcrypt.hash(password, 8)

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            name,
            password: encryptedPassword,
        },
    }

    try {
        await User.updateOne(filter, updateDoc)

        return res.status(200).json({ message: 'User updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteUser(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params
    const filter = { _id: id }

    try {
        await User.deleteOne(filter)
        return res.status(200).json({ message: 'User removed successfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

async function updateUserFavoriteSongs(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { musicId, musicGender } = req.body
    const { id } = req.params

    if (!musicId || !musicGender) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const user: IUser | null = await User.findById(id, '-password')
    const musicGenderUser: string[] = await Music.distinct('gender')

    if (!musicGenderUser.includes(musicGender)) {
        return res.status(400).json({ error: 'You must enter valid values' })
    }

    interface Contador {
        name: string
        count: number
    }

    const counterDistinctPlaylists = (
        musicGender: string[],
        user: IUser | null
    ) => {
        const countsPre: Contador[] = []

        for (let i = 0; i < musicGender.length; i++) {
            countsPre.push({ name: musicGender[i], count: 0 })
        }

        if (user != null) {
            for (let j = 0; j < user.favoriteSongs.length; j++) {
                for (let k = 0; k < countsPre.length; k++) {
                    if (
                        user.favoriteSongs[j].musicGender == countsPre[k].name
                    ) {
                        countsPre[k].count++
                    }
                }
            }
        }
        const counts = countsPre.filter((item) => item.count > 0)

        return counts
    }

    const favoriteSizes = counterDistinctPlaylists(musicGenderUser, user)

    const favoriteSizeDefinition = () => {
        if (favoriteSizes.length <= 0) {
            return 0
        }

        const finded = favoriteSizes.find((item) => item.name == musicGender)

        if (finded == undefined) {
            return 0
        }

        return finded?.count
    }

    const favoriteSize = favoriteSizeDefinition()

    const updateDoc1 = {
        $push: { favoriteSongs: { musicId, musicGender } },
    }
    const updateDoc2 = {
        $pull: { favoriteSongs: { musicId } },
    }

    const filter = { _id: id }

    try {
        const [...favoriteSongs] = user?.favoriteSongs || []
        const musicExists = favoriteSongs.find(
            (music) => music.musicId == musicId
        )

        const maxSizeFavorite = 20

        if (musicExists) {
            await User.updateOne(filter, updateDoc2)
            return res
                .status(200)
                .json({ message: 'User updated successfully!' })
        }
        if (favoriteSize >= maxSizeFavorite) {
            return res.status(200).json({ message: 'limit reached' })
        }
        if (!musicExists) {
            await User.updateOne(filter, updateDoc1)
            return res
                .status(200)
                .json({ message: 'User updated successfully!' })
        }

        return res.status(200).json({ message: 'User updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserMusicHistoric(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { musicId, musicGender } = req.body
    const { id } = req.params
    const maxSizeHistoric = 10

    if (!musicId || !musicGender) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const user: IUser | null = await User.findById(id, '-password')
    const musicGenderUser: string[] = await Music.distinct('gender')

    if (!musicGenderUser.includes(musicGender)) {
        return res.status(400).json({ error: 'You must enter valid values' })
    }

    interface Contador {
        name: string
        count: number
    }

    const counterDistinctPlaylists = (
        musicGender: string[],
        user: IUser | null
    ) => {
        const countsPre: Contador[] = []

        for (let i = 0; i < musicGender.length; i++) {
            countsPre.push({ name: musicGender[i], count: 0 })
        }

        if (user != null) {
            for (let j = 0; j < user.musicHistory.length; j++) {
                for (let k = 0; k < countsPre.length; k++) {
                    if (user.musicHistory[j].musicGender == countsPre[k].name) {
                        countsPre[k].count++
                    }
                }
            }
        }
        const counts = countsPre.filter((item) => item.count > 0)

        return counts
    }

    const checkArrayExceedsSize = (
        user: IUser | null,
        tamanhoMaximoDeHistorico: number,
        currentGender: string
    ): string[] => {
        const historyExeceeds: string[] = []
        if (user != null) {
            const currentHistoric = user.musicHistory.filter(
                (music) => music.musicGender == currentGender
            )

            currentHistoric.reverse()

            if (currentHistoric.length <= tamanhoMaximoDeHistorico) {
                return historyExeceeds
            }

            if (currentHistoric.length > tamanhoMaximoDeHistorico) {
                for (
                    let i = currentHistoric.length;
                    i > tamanhoMaximoDeHistorico;
                    i--
                ) {
                    const exced = currentHistoric[i - 1].musicId
                    historyExeceeds.push(exced)
                }
            }

            historyExeceeds.reverse()
        }

        return historyExeceeds
    }

    const historicSizes = counterDistinctPlaylists(musicGenderUser, user)

    const historicSizeDefinition = () => {
        if (historicSizes.length <= 0) {
            return 0
        }

        const finded = historicSizes.find((item) => item.name == musicGender)

        if (finded == undefined) {
            return 0
        }

        return finded?.count
    }

    const historySize = historicSizeDefinition()

    const checkArrayExceedsSizeResult = checkArrayExceedsSize(
        user,
        maxSizeHistoric,
        musicGender
    )

    const maxSizeHistoricOneLess = maxSizeHistoric - 1

    const checkArrayExceedsSizeResultA = checkArrayExceedsSize(
        user,
        maxSizeHistoricOneLess,
        musicGender
    )

    const updateDoc1 = {
        $push: { musicHistory: { musicId, musicGender } },
    }
    const updateDoc2 = {
        $pull: {
            musicHistory: { musicId: { $in: checkArrayExceedsSizeResult } },
        },
    }
    const updateDoc2a = {
        $pull: {
            musicHistory: { musicId: { $in: checkArrayExceedsSizeResultA } },
        },
    }
    const updateDoc3 = {
        $pull: { musicHistory: { musicId } },
    }
    const updateDoc4 = {
        $pull: { musicHistory: { musicGender } },
    }

    const filter = { _id: id }

    try {
        if (musicId == 'clear') {
            await User.updateOne(filter, updateDoc4)
            return res
                .status(200)
                .json({ message: 'User updated successfully!' })
        }

        const [...musicHistory] = user?.musicHistory || []
        const musicExists = musicHistory.find(
            (music) => music.musicId == musicId
        )

        if (musicExists && historySize <= 1) {
            return res
                .status(200)
                .json({ message: 'User updated successfully!' })
        }
        if (musicExists) {
            await User.updateOne(filter, updateDoc3)
            await User.updateOne(filter, updateDoc1)

            if (historySize > maxSizeHistoric) {
                await User.updateOne(filter, updateDoc2)
            }
            return res
                .status(200)
                .json({ message: 'User updated successfully!' })
        }
        if (historySize < maxSizeHistoric) {
            await User.updateOne(filter, updateDoc1)

            return res
                .status(200)
                .json({ message: 'User updated successfully!' })
        }
        if (historySize >= maxSizeHistoric) {
            await User.updateOne(filter, updateDoc2a)
            await User.updateOne(filter, updateDoc1)

            return res
                .status(200)
                .json({ message: 'User updated successfully!' })
        }

        return res.status(200).json({ message: 'User updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserPlaylistSelected(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { lastAccessedPlaylist, lastAccessedPlaylistName } = req.body
    const { id } = req.params

    if (!lastAccessedPlaylist || !lastAccessedPlaylistName) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const updateDoc1 = {
        $set: { lastAccessedPlaylist, lastAccessedPlaylistName },
    }

    const filter = { _id: id }

    try {
        await User.updateOne(filter, updateDoc1)
        return res.status(200).json({ message: 'User updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function allSongAndPlaylistData(req: Request, res: Response) {
    try {
        const playlists = await Playlist.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })

        const songs = await Music.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })

        return res.status(200).json({ playlists, songs })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserProfilePicture(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { profilePicture } = req.body
    const { id } = req.params

    let updateDoc = {
        $set: { profilePicture },
    }

    if (!profilePicture) {
        updateDoc = {
            $set: { profilePicture: '' },
        }
    }

    const filter = { _id: id }

    try {
        await User.updateOne(filter, updateDoc)
        return res.status(200).json({ message: 'User updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function indexUserPlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params

    try {
        const user: IUser | null = await User.findById(id)

        if (!user) {
            return res.status(404).json({ error: 'User playlist not found' })
        }

        return res.status(200).json({ myPlaylists: user.myPlaylists })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeUserPlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { title } = req.body
    const { id } = req.params

    if (!title) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const filter = { _id: id }
    const updateDoc = {
        $push: {
            myPlaylists: {
                _id: uuid(),
                title,
                currentCoverUrl:
                    'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg',
                totalSongs: 0,
                additionDate: new Date(),
            },
        },
    }

    try {
        await User.updateOne(filter, updateDoc)
        return res
            .status(201)
            .json({ message: 'User playlist added successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserPlaylist(
    req: Request<{
        id?: UpdateWithAggregationPipeline
        pid?: UpdateWithAggregationPipeline
    }>,
    res: Response
) {
    const { title, currentCoverUrl } = req.body
    const { id, pid } = req.params

    if (!title && !currentCoverUrl) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const filter = { _id: id, 'myPlaylists._id': pid }
    const updateDoc = {
        $set: {
            'myPlaylists.$.title': title,
            'myPlaylists.$.currentCoverUrl': currentCoverUrl,
        },
    }

    try {
        const result = await User.updateOne(filter, updateDoc)

        if (result.matchedCount < 1) {
            return res.status(404).json({ error: 'User playlist not found' })
        }

        return res
            .status(200)
            .json({ message: 'User playlist updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteUserPlaylist(
    req: Request<{
        id?: UpdateWithAggregationPipeline
        pid?: UpdateWithAggregationPipeline
    }>,
    res: Response
) {
    const { id, pid } = req.params

    const filter = { _id: id }
    const updateDoc = {
        $pull: {
            myPlaylists: { _id: pid },
        },
    }

    try {
        const result = await User.updateOne(filter, updateDoc)
        if (result.modifiedCount < 1) {
            return res.status(404).json({ error: 'User playlist not found' })
        }

        return res
            .status(200)
            .json({ message: 'User playlist removed successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeUserPlaylistSongs(
    req: Request<{
        id?: UpdateWithAggregationPipeline
        pid?: UpdateWithAggregationPipeline
    }>,
    res: Response
) {
    const { musicIds } = req.body
    const { id, pid } = req.params

    if (!musicIds || !Array.isArray(musicIds)) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const lastMusicId = musicIds[musicIds.length - 1]
    const music = await Music.findOne({ _id: lastMusicId })
    if (!music) {
        return res.status(404).json({ error: 'Music not found' })
    }
    const user = await User.findOne({ _id: id, 'myPlaylists._id': pid })
    if (!user) {
        return res.status(404).json({ error: 'User playlist not found' })
    }

    const filter = { _id: id, 'myPlaylists._id': pid }
    const updateDoc = {
        $push: {
            'myPlaylists.$[playlist].songs': {
                $each: musicIds.map((musicId: string) => ({
                    _id: uuid(),
                    musicId,
                })),
            },
        },
        $set: {
            'myPlaylists.$[playlist].currentCoverUrl': music.coverUrl,
        },
    }
    const options = {
        arrayFilters: [{ 'playlist._id': pid }],
    }

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
        await User.updateOne(filter, updateDoc, options)
        user.myPlaylists.forEach(async (playlist) => {
            await updatePlaylistTotalSongs(user._id, playlist._id)
        })
        return res
            .status(201)
            .json({ message: 'User playlist songs added successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteUserPlaylistSongs(
    req: Request<{
        id?: UpdateWithAggregationPipeline
        pid?: UpdateWithAggregationPipeline
        sid?: UpdateWithAggregationPipeline
    }>,
    res: Response
) {
    const { id, pid, sid } = req.params

    const filter = { _id: id, 'myPlaylists._id': pid }
    const updateDoc = {
        $pull: {
            'myPlaylists.$[playlist].songs': { _id: sid },
        },
    }
    const options = {
        arrayFilters: [{ 'playlist._id': pid }],
    }

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
        const result = await User.updateOne(filter, updateDoc, options)
        if (result.modifiedCount < 1) {
            return res
                .status(404)
                .json({ error: 'User playlist song not found' })
        }
        const user = await User.findOne({ _id: id, 'myPlaylists._id': pid })
        if (!user) {
            return res.status(404).json({ error: 'User playlist not found' })
        }
        user.myPlaylists.forEach(async (playlist) => {
            await updatePlaylistTotalSongs(user._id, playlist._id)
        })

        const userLastPlaylistSongCover = user?.myPlaylists.find(
            (playlist) => playlist._id === (pid as unknown as string)
        )?.songs

        if (
            !userLastPlaylistSongCover ||
            userLastPlaylistSongCover.length < 1
        ) {
            await User.updateOne(
                filter,
                {
                    $set: {
                        'myPlaylists.$[playlist].currentCoverUrl':
                            'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg',
                    },
                },
                {
                    arrayFilters: [{ 'playlist._id': pid }],
                }
            )

            return res
                .status(200)
                .json({ message: 'User playlist song deleted successfully!' })
        }

        const music = await Music.findOne({
            _id: user?.myPlaylists.find(
                (playlist) => playlist._id === (pid as unknown as string)
            )?.songs[userLastPlaylistSongCover?.length - 1].musicId,
        })

        if (!music) {
            return res.status(404).json({ error: 'Music not found' })
        }

        await User.updateOne(
            filter,
            {
                $set: {
                    'myPlaylists.$[playlist].currentCoverUrl': music.coverUrl,
                },
            },
            {
                arrayFilters: [{ 'playlist._id': pid }],
            }
        )

        return res
            .status(200)
            .json({ message: 'User playlist song deleted successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export {
    indexUser,
    indexUserById,
    storeUser,
    loginUser,
    updateUser,
    deleteUser,
    updateUserFavoriteSongs,
    updateUserMusicHistoric,
    updateUserPlaylistSelected,
    allSongAndPlaylistData,
    updateUserProfilePicture,
    indexUserPlaylist,
    storeUserPlaylist,
    updateUserPlaylist,
    deleteUserPlaylist,
    storeUserPlaylistSongs,
    deleteUserPlaylistSongs,
}
