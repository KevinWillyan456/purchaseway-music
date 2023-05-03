import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser, User } from '../models/User'

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

        if (!user) {
            return res
                .status(400)
                .json({ error: 'wrong name or password - Nome' })
        }

        if (!(await bcrypt.compare(password, user?.password))) {
            return res
                .status(400)
                .json({ error: 'wrong name or password - Senha' })
        }

        if (hasConnect) {
            dateTokenExpires = '2d'
        } else {
            dateTokenExpires = 600
        }

        const token = jwt.sign({ id: user?._id }, `${process.env.SECRET}`, {
            expiresIn: dateTokenExpires,
        })

        // Salva o Token
        res.cookie('token', `Bearer ${token}`)
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

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            name,
            password,
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
    const { musicId } = req.body
    const { id } = req.params

    if (!musicId) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const user: IUser | null = await User.findById(id, '-password')

    const favoriteSize = user?.favoriteSongs.length || 0

    const updateDoc1 = {
        $push: { favoriteSongs: { musicId } },
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

        const maxSizeFavorite = 2

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
    const { musicId } = req.body
    const { id } = req.params

    if (!musicId) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const user: IUser | null = await User.findById(id, '-password')

    const historySize = user?.musicHistory.length || 0

    const updateDoc1 = {
        $push: { musicHistory: { musicId } },
    }
    const updateDoc2 = {
        $pop: { musicHistory: -1 },
    }
    const updateDoc3 = {
        $pull: { musicHistory: { musicId } },
    }
    const updateDoc4 = {
        $set: { musicHistory: [] },
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
        const maxSizeHistoric = 10

        if (musicExists && historySize <= 1) {
            return res
                .status(200)
                .json({ message: 'User updated succesfully!' })
        }
        if (musicExists) {
            await User.updateOne(filter, updateDoc3)
            await User.updateOne(filter, updateDoc1)

            if (historySize > maxSizeHistoric) {
                for (let i = 0; i < historySize - maxSizeHistoric; i++) {
                    await User.updateOne(filter, updateDoc2)
                }
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
            for (let i = 0; i <= historySize - maxSizeHistoric; i++) {
                await User.updateOne(filter, updateDoc2)
            }
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

    if (!lastAccessedPlaylist && !lastAccessedPlaylistName) {
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
}
