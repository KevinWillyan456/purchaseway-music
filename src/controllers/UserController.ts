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

    const user = new User({
        _id: uuid(),
        name,
        password: encryptedPassword,
        additionDate: new Date(),
    })

    try {
        await user.save()

        return res.status(201).json({ message: 'User added succesfully!' })
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
            dateTokenExpires = '2d'
            dateCookieExpires = 172800000
        } else {
            dateTokenExpires = 600
            dateCookieExpires = 600000
        }

        const token = jwt.sign({ id: user?._id }, `${process.env.SECRET}`, {
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

        return res.status(200).json({ message: 'User updated succesfully!' })
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
        return res.status(200).json({ message: 'User removed succesfully!' })
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
                .json({ message: 'User updated succesfully!' })
        }
        if (favoriteSize >= maxSizeFavorite) {
            return res.status(200).json({ message: 'limit reached' })
        }
        if (!musicExists) {
            await User.updateOne(filter, updateDoc1)
            return res
                .status(200)
                .json({ message: 'User updated succesfully!' })
        }

        return res.status(200).json({ message: 'User updated succesfully!' })
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
                .json({ message: 'User updated succesfully!' })
        }

        const [...musicHistory] = user?.musicHistory || []
        const musicExists = musicHistory.find(
            (music) => music.musicId == musicId
        )

        if (musicExists && historySize <= 1) {
            return res
                .status(200)
                .json({ message: 'User updated succesfully!' })
        }
        if (musicExists) {
            await User.updateOne(filter, updateDoc3)
            await User.updateOne(filter, updateDoc1)

            if (historySize > maxSizeHistoric) {
                await User.updateOne(filter, updateDoc2)
            }
            return res
                .status(200)
                .json({ message: 'User updated succesfully!' })
        }
        if (historySize < maxSizeHistoric) {
            await User.updateOne(filter, updateDoc1)

            return res
                .status(200)
                .json({ message: 'User updated succesfully!' })
        }
        if (historySize >= maxSizeHistoric) {
            await User.updateOne(filter, updateDoc2a)
            await User.updateOne(filter, updateDoc1)

            return res
                .status(200)
                .json({ message: 'User updated succesfully!' })
        }

        return res.status(200).json({ message: 'User updated succesfully!' })
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
        return res.status(200).json({ message: 'User updated succesfully!' })
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
        return res.status(200).json({ message: 'User updated succesfully!' })
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
}
