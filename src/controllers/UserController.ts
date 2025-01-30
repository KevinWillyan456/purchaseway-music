import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { validate as isUuid, v4 as uuid } from 'uuid'
import { Music } from '../models/Music'
import { Playlist } from '../models/Playlist'
import { IUser, User } from '../models/User'
import { sendEmail } from '../services/EmailService'

const SECRET_KEY: Secret = `${process.env.JWT_SECRET}`
const MIN_PASSWORD_LENGTH = 6
const MAX_AGE_COOKIE = 604800000
const MAX_AGE_COOKIE_10_MINUTES = 600000
const MAX_AGE_TOKEN = '7d'
const MAX_AGE_TOKEN_10_MINUTES = 600

async function indexUser(req: Request, res: Response): Promise<void> {
    try {
        const users = await User.find(
            {},
            '-password -tokens -musicHistory -favoriteSongs -myPlaylists -__v -resetPasswordToken -resetPasswordExpires',
        )

        res.status(200).json({ users })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function indexUserById(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
) {
    const { id } = req.params

    try {
        const user = await User.findById(
            id,
            '-password -tokens -__v -resetPasswordToken -resetPasswordExpires',
        )
        res.status(200).json({ user })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

function getMonthName(monthIndex: number): string {
    const months: string[] = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro',
    ]
    return months[monthIndex]
}

async function storeUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400).json({ error: 'data is missing' })
        return
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        res.status(400).json({
            error: `Password must have at least ${MIN_PASSWORD_LENGTH} characters`,
        })
        return
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
        email,
        additionDate: new Date(),
        lastAccessedPlaylist: lastAccessedPlaylist.gender,
        lastAccessedPlaylistName: lastAccessedPlaylist.title,
        theme: 'original',
    })

    try {
        await user.save()

        const formattedDate = `
            Seu cadastro foi feito no dia ${user.additionDate.getDate()} de ${getMonthName(
                user.additionDate.getMonth(),
            )} 
            de ${user.additionDate.getFullYear()} às ${user.additionDate.getHours()}h${user.additionDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}min.
        `

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            sendEmail({
                to: email,
                subject: 'Bem-vindo ao Purchaseway Music',
                html: `
                    <h2>👋Olá, ${name}!</h2>
                    <p>Seja bem-vindo(a) ao <strong>Purchaseway Music</strong>! 🚀</p>
                    <p>Estamos muito felizes em ter você conosco!</p>
                    <p>🎉🎉🎉</p>
                    <p>
                        Aproveite para ouvir suas músicas favoritas e criar suas
                        próprias playlists!
                    </p>
                    <br />
                    <br />
                    <img
                        src="https://i.ibb.co/fdBXmh2/logo.png"
                        alt="Logo do serviço"
                    />
                    <br />
                    <br />
                    <br />
                    <p>
                        Qualquer dúvida, problema ou sugestão, entre em contato por este
                        e-mail. Respondemos assim que possível!
                    </p>
    
                    <p>Você se cadastrou com o e-mail: ${email}</p>
                    <p>${formattedDate}</p>
                    <br />
                    <p>Atenciosamente, Equipe Purchaseway Music.</p>
                    <p><i>Este e-mail foi enviado automaticamente.</i></p>
                `,
            })
        }

        res.status(201).json({ message: 'User added successfully!' })
        return
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function loginUser(req: Request, res: Response): Promise<void> {
    const { email, password, hasConnect } = req.body

    if (!email || !password) {
        res.status(400).json({ error: 'data is missing' })
        return
    }

    try {
        const user = await User.findOne({ email })
        let dateTokenExpires: '7d' | number
        let dateCookieExpires: number

        if (!user) {
            res.status(400).json({ error: 'wrong email or password' })
            return
        }

        if (!(await bcrypt.compare(password, user?.password))) {
            res.status(400).json({ error: 'wrong email or password' })
            return
        }

        if (hasConnect) {
            dateTokenExpires = MAX_AGE_TOKEN
            dateCookieExpires = MAX_AGE_COOKIE
        } else {
            dateTokenExpires = MAX_AGE_TOKEN_10_MINUTES
            dateCookieExpires = MAX_AGE_COOKIE_10_MINUTES
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: dateTokenExpires,
        })

        res.cookie('token', `Bearer ${token}`, {
            maxAge: dateCookieExpires,
        })
        res.status(200).json({
            erro: false,
            mensagem: 'Login',
            token,
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
async function logoutUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const filter = { _id: id }

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const tokens = user.tokens.filter((token) => {
            const date = new Date(token.additionDate)
            const dateNow = new Date()
            const diff = dateNow.getTime() - date.getTime()
            const diffDays = diff / (1000 * 60 * 60 * 24)

            return diffDays <= 7
        })

        await User.updateOne(filter, {
            $set: {
                tokens,
            },
        })

        const token = req.cookies.token

        if (!token) {
            res.status(400).json({ error: 'Token is missing' })
            return
        }

        const tokenFormated = token.split(' ')[1]

        if (tokenFormated) {
            await User.updateOne(filter, {
                $push: {
                    tokens: {
                        _id: uuid(),
                        token: tokenFormated,
                        additionDate: new Date(),
                    },
                },
            })
        } else {
            res.status(400).json({ error: 'Token is invalid' })
            return
        }

        res.clearCookie('token')
        res.clearCookie('user')

        res.status(200).json({ message: 'User logged out successfully!' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function updateUser(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
): Promise<void> {
    const { name, email, password } = req.body
    const { id } = req.params

    if (!name && !email && !password) {
        res.status(400).json({ error: 'You must enter a new data' })
        return
    }

    if (name && !email && !password) {
        const filterName = { _id: id }
        const updateDocName = {
            $set: { name },
        }

        try {
            await User.updateOne(filterName, updateDocName)
            res.status(200).json({ message: 'User updated successfully!' })
            return
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    const encryptedPassword = await bcrypt.hash(password, 8)

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            name,
            email,
            password: encryptedPassword,
        },
    }

    try {
        await User.updateOne(filter, updateDoc)

        res.status(200).json({ message: 'User updated successfully!' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteUser(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
) {
    const { id } = req.params
    const filter = { _id: id }

    try {
        const user = await User.findById(id)

        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        await User.deleteOne(filter)

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const formattedDate = `Você ficou conosco desde ${user.additionDate.getDate()} de ${getMonthName(
                user.additionDate.getMonth(),
            )}
            de ${user.additionDate.getFullYear()} às ${user.additionDate.getHours()}h${user.additionDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}min.`

            sendEmail({
                to: user.email,
                subject: 'Até logo. Purchaseway Music',
                html: `
                    <h2>👋Olá, ${user.name}!</h2>
                    <p>É uma pena que você decidiu sair do <strong>Purchaseway Music</strong>! 😢</p>
                    <p>Esperamos que tenha aproveitado o tempo que passou conosco!</p>
                    <p>
                        Se você mudar de ideia, estaremos sempre de braços abertos para
                        recebê-lo(a) de volta!
                    </p>
                    <p>Seus dados foram removidos de nossa base de dados.</p>
                    <br />
                    <br />
                    <img
                        src="https://i.ibb.co/fdBXmh2/logo.png"
                        alt="Logo do serviço"
                    />
                    <br />
                    <br />
                    <br />

                    <p>${formattedDate}</p>
                    <p>Atenciosamente, Equipe Purchaseway Music.</p>
                    <p><i>Este e-mail foi enviado automaticamente.</i></p>
                `,
            })
        }

        res.status(200).json({ message: 'User removed successfully!' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
        return
    }
}

async function updateUserFavoriteSongs(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
): Promise<void> {
    const { musicId, musicGender } = req.body
    const { id } = req.params

    if (!musicId || !musicGender) {
        res.status(400).json({ error: 'You must enter a new data' })
        return
    }

    const user: IUser | null = await User.findById(id, '-password -tokens')
    const musicGenderUser: string[] = await Music.distinct('gender')

    if (!musicGenderUser.includes(musicGender)) {
        res.status(400).json({ error: 'You must enter valid values' })
        return
    }

    interface Contador {
        name: string
        count: number
    }

    const counterDistinctPlaylists = (
        musicGender: string[],
        user: IUser | null,
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
        $push: {
            favoriteSongs: {
                _id: uuid(),
                musicId,
                musicGender,
            },
        },
    }
    const updateDoc2 = {
        $pull: { favoriteSongs: { musicId } },
    }

    const filter = { _id: id }

    try {
        const [...favoriteSongs] = user?.favoriteSongs || []
        const musicExists = favoriteSongs.find(
            (music) => music.musicId == musicId,
        )

        const maxSizeFavorite = 20

        if (musicExists) {
            await User.updateOne(filter, updateDoc2)
            res.status(200).json({ message: 'User updated successfully!' })
            return
        }
        if (favoriteSize >= maxSizeFavorite) {
            res.status(200).json({ message: 'limit reached' })
            return
        }
        if (!musicExists) {
            await User.updateOne(filter, updateDoc1)
            res.status(200).json({ message: 'User updated successfully!' })
            return
        }

        res.status(200).json({ message: 'User updated successfully!' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserMusicHistoric(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
): Promise<void> {
    const { musicId, musicGender } = req.body
    const { id } = req.params
    const maxSizeHistoric = 10

    if (!musicId || !musicGender) {
        res.status(400).json({ error: 'You must enter a new data' })
        return
    }

    const user: IUser | null = await User.findById(id, '-password -tokens')
    const musicGenderUser: string[] = await Music.distinct('gender')

    if (!musicGenderUser.includes(musicGender)) {
        res.status(400).json({ error: 'You must enter valid values' })
        return
    }

    interface Contador {
        name: string
        count: number
    }

    const counterDistinctPlaylists = (
        musicGender: string[],
        user: IUser | null,
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
        currentGender: string,
    ): string[] => {
        const historyExeceeds: string[] = []
        if (user != null) {
            const currentHistoric = user.musicHistory.filter(
                (music) => music.musicGender == currentGender,
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
        musicGender,
    )

    const maxSizeHistoricOneLess = maxSizeHistoric - 1

    const checkArrayExceedsSizeResultA = checkArrayExceedsSize(
        user,
        maxSizeHistoricOneLess,
        musicGender,
    )

    const updateDoc1 = {
        $push: {
            musicHistory: {
                _id: uuid(),
                musicId,
                musicGender,
            },
        },
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
            res.status(200).json({ message: 'User updated successfully!' })
            return
        }

        const [...musicHistory] = user?.musicHistory || []
        const musicExists = musicHistory.find(
            (music) => music.musicId == musicId,
        )

        if (musicExists && historySize <= 1) {
            res.status(200).json({ message: 'User updated successfully!' })
            return
        }
        if (musicExists) {
            await User.updateOne(filter, updateDoc3)
            await User.updateOne(filter, updateDoc1)

            if (historySize > maxSizeHistoric) {
                await User.updateOne(filter, updateDoc2)
            }
            res.status(200).json({ message: 'User updated successfully!' })
            return
        }
        if (historySize < maxSizeHistoric) {
            await User.updateOne(filter, updateDoc1)

            res.status(200).json({ message: 'User updated successfully!' })
            return
        }
        if (historySize >= maxSizeHistoric) {
            await User.updateOne(filter, updateDoc2a)
            await User.updateOne(filter, updateDoc1)

            res.status(200).json({ message: 'User updated successfully!' })
            return
        }

        res.status(200).json({ message: 'User updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserPlaylistSelected(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
) {
    const { lastAccessedPlaylist, lastAccessedPlaylistName } = req.body
    const { id } = req.params

    if (!lastAccessedPlaylist || !lastAccessedPlaylistName) {
        res.status(400).json({ error: 'You must enter a new data' })
        return
    }

    const updateDoc1 = {
        $set: { lastAccessedPlaylist, lastAccessedPlaylistName },
    }

    const filter = { _id: id }

    try {
        await User.updateOne(filter, updateDoc1)
        res.status(200).json({ message: 'User updated successfully!' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function allSongAndPlaylistData(
    req: Request<{ userId: string }>,
    res: Response,
) {
    const { userId } = req.params

    if (!isUuid(userId)) {
        res.status(400).json({ error: 'Invalid user id' })
        return
    }

    try {
        const user = await User.findById(userId)

        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        if (user.type !== 'admin') {
            res.status(401).json({ error: 'User is not an admin' })
            return
        }

        const playlists = await Playlist.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })
            .select('-__v')

        const songs = await Music.find()
            .sort({ title: 1 })
            .collation({ locale: 'pt', strength: 2 })
            .select('-__v')

        res.status(200).json({ playlists, songs })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserProfilePicture(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
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
        res.status(200).json({ message: 'User updated successfully!' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function indexUserPlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
) {
    const { id } = req.params

    try {
        const user: IUser | null = await User.findById(id)

        if (!user) {
            res.status(404).json({ error: 'User playlist not found' })
            return
        }

        res.status(200).json({ myPlaylists: user.myPlaylists })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeUserPlaylist(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
): Promise<void> {
    const { title } = req.body
    const { id } = req.params

    if (!title) {
        res.status(400).json({ error: 'data is missing' })
        return
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
        res.status(201).json({ message: 'User playlist added successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserPlaylist(
    req: Request<{
        id?: UpdateWithAggregationPipeline
        pid?: UpdateWithAggregationPipeline
    }>,
    res: Response,
): Promise<void> {
    const { title, currentCoverUrl } = req.body
    const { id, pid } = req.params

    if (!title && !currentCoverUrl) {
        res.status(400).json({ error: 'You must enter a new data' })
        return
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
            res.status(404).json({ error: 'User playlist not found' })
            return
        }

        res.status(200).json({ message: 'User playlist updated successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteUserPlaylist(
    req: Request<{
        id?: UpdateWithAggregationPipeline
        pid?: UpdateWithAggregationPipeline
    }>,
    res: Response,
): Promise<void> {
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
            res.status(404).json({ error: 'User playlist not found' })
            return
        }

        res.status(200).json({ message: 'User playlist removed successfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeUserPlaylistSongs(
    req: Request<{
        id?: UpdateWithAggregationPipeline
        pid?: UpdateWithAggregationPipeline
    }>,
    res: Response,
): Promise<void> {
    const { musicIds } = req.body
    const { id, pid } = req.params

    if (!musicIds || !Array.isArray(musicIds)) {
        res.status(400).json({ error: 'data is missing' })
        return
    }

    const lastMusicId = musicIds[musicIds.length - 1]
    const music = await Music.findOne({ _id: lastMusicId })
    if (!music) {
        res.status(404).json({ error: 'Music not found' })
        return
    }
    const user = await User.findOne({ _id: id, 'myPlaylists._id': pid })
    if (!user) {
        res.status(404).json({ error: 'User playlist not found' })
        return
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
        playlistId: string,
    ) {
        try {
            const user = await User.findOne({
                _id: userId,
                myPlaylists: { $exists: true },
            })

            if (!user) return

            const playlistIndex = user.myPlaylists.findIndex(
                (playlist) => playlist._id == playlistId,
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
                },
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
        res.status(201).json({
            message: 'User playlist songs added successfully!',
        })
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
    res: Response,
): Promise<void> {
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
        playlistId: string,
    ) {
        try {
            const user = await User.findOne({
                _id: userId,
                myPlaylists: { $exists: true },
            })

            if (!user) return

            const playlistIndex = user.myPlaylists.findIndex(
                (playlist) => playlist._id == playlistId,
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
                },
            )
        } catch (err) {
            console.error(err)
        }
    }

    try {
        const result = await User.updateOne(filter, updateDoc, options)
        if (result.modifiedCount < 1) {
            res.status(404).json({ error: 'User playlist song not found' })
            return
        }
        const user = await User.findOne({ _id: id, 'myPlaylists._id': pid })
        if (!user) {
            res.status(404).json({ error: 'User playlist not found' })
            return
        }
        user.myPlaylists.forEach(async (playlist) => {
            await updatePlaylistTotalSongs(user._id, playlist._id)
        })

        const userLastPlaylistSongCover = user?.myPlaylists.find(
            (playlist) => playlist._id === (pid as unknown as string),
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
                },
            )

            res.status(200).json({
                message: 'User playlist song deleted successfully!',
            })
            return
        }

        const music = await Music.findOne({
            _id: user?.myPlaylists.find(
                (playlist) => playlist._id === (pid as unknown as string),
            )?.songs[userLastPlaylistSongCover?.length - 1].musicId,
        })

        if (!music) {
            res.status(404).json({ error: 'Music not found' })
            return
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
            },
        )

        res.status(200).json({
            message: 'User playlist song deleted successfully!',
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function updateUserTheme(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response,
) {
    const { theme } = req.body
    const { id } = req.params

    if (!theme) {
        res.status(400).json({ error: 'Theme is missing' })
        return
    }

    const updateDoc = {
        $set: { theme },
    }

    const filter = { _id: id }

    try {
        await User.updateOne(filter, updateDoc)
        res.status(200).json({ message: 'User updated successfully!' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function requestPasswordReset(
    req: Request,
    res: Response,
): Promise<void> {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
    }

    if (
        !process.env.EMAIL_USER ||
        !process.env.EMAIL_PASS ||
        !process.env.CLIENT_URL
    ) {
        res.status(500).json({
            error: 'Password reset is not available because email service is not configured',
        })
        return
    }

    try {
        const token = crypto.randomBytes(20).toString('hex')
        user.resetPasswordToken = token
        user.resetPasswordExpires = new Date(Date.now() + 3600000)
        await user.save()

        sendEmail({
            to: email,
            subject: 'Redefinição de senha - Purchaseway Music',
            html: `
            <h2>👋Olá, ${user.name}!</h2>
            <p>Você solicitou a redefinição de senha para sua conta no <strong>Purchaseway Music</strong>.</p>
            <p>Se você não solicitou isso, ignore este e-mail e sua senha permanecerá inalterada.</p>
            <p>Para redefinir sua senha, clique no link abaixo:</p>
            <p style="color: #bf1f1f;">Não compartilhe este link com ninguém.</p>
            <a href="${process.env.CLIENT_URL}/reset-password/?token=${token}">Redefinir senha</a>
            <p>O link expirará em 1 hora.</p>
            <br />
            <br />
            <img
                src="https://i.ibb.co/fdBXmh2/logo.png"
                alt="Logo do serviço"
            />
            <br />
            <br />
            <br />
            <p>Se você tiver problemas ao clicar no botão "Redefinir senha", copie e cole o URL abaixo em seu navegador:</p>
            <p>${process.env.CLIENT_URL}/reset-password/?token=${token}</p>
            <br />
            <p>Atenciosamente, Equipe Purchaseway Music.</p>
            <p><i> Este e-mail foi enviado automaticamente.</i></p>
        `,
        })

        res.status(200).json({ message: 'Password reset email sent' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function resetPassword(req: Request, res: Response): Promise<void> {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
        res.status(400).json({ error: 'Token or password is missing' })
        return
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
        res.status(400).json({
            error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        })
        return
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        })

        if (!user) {
            res.status(400).json({ error: 'Invalid or expired token' })
            return
        }

        if (await bcrypt.compare(newPassword, user.password)) {
            res.status(400).json({
                error: 'New password must be different from the current one',
            })
            return
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 8)

        user.password = encryptedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()

        res.status(200).json({ message: 'Password reset successfully' })
        return
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export {
    allSongAndPlaylistData,
    deleteUser,
    deleteUserPlaylist,
    deleteUserPlaylistSongs,
    indexUser,
    indexUserById,
    indexUserPlaylist,
    loginUser,
    logoutUser,
    requestPasswordReset,
    resetPassword,
    storeUser,
    storeUserPlaylist,
    storeUserPlaylistSongs,
    updateUser,
    updateUserFavoriteSongs,
    updateUserMusicHistoric,
    updateUserPlaylist,
    updateUserPlaylistSelected,
    updateUserProfilePicture,
    updateUserTheme,
}
