import { Schema, model } from 'mongoose'

export interface IUser {
    _id: string
    name: string
    email: string
    password: string
    additionDate: Date
    type: string
    favoriteSongs: {
        musicId: string
        musicGender: string
    }[]
    musicHistory: {
        musicId: string
        musicGender: string
    }[]
    lastAccessedPlaylist: string
    lastAccessedPlaylistName: string
    profilePicture: string
    theme: string
    myPlaylists: {
        _id: string
        title: string
        currentCoverUrl: string
        totalSongs: number
        additionDate: Date
        songs: {
            _id: string
            musicId: string
        }[]
    }[]
    tokens: {
        token: string
        additionDate: Date
    }[]
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    additionDate: { type: Date, required: true },
    type: { type: String, required: true, default: 'normal' },
    favoriteSongs: [
        {
            musicId: { type: String, required: true },
            musicGender: { type: String, required: true },
        },
    ],
    musicHistory: [
        {
            musicId: { type: String, required: true },
            musicGender: { type: String, required: true },
        },
    ],
    lastAccessedPlaylist: { type: String, default: '' },
    lastAccessedPlaylistName: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    theme: { type: String, required: true, default: 'original' },
    myPlaylists: [
        {
            _id: { type: String, required: true },
            title: { type: String, required: true },
            currentCoverUrl: { type: String, required: true },
            totalSongs: { type: Number, required: true },
            additionDate: { type: Date, required: true },
            songs: [
                {
                    _id: { type: String, required: true },
                    musicId: { type: String, required: true },
                },
            ],
        },
    ],
    tokens: [
        {
            token: { type: String, required: true },
            additionDate: { type: Date, default: Date.now, required: true },
        },
    ],
})

export const User = model<IUser>('User', userSchema)
