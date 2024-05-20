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
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    additionDate: { type: Date, required: true },
    type: { type: String, default: 'normal' },
    favoriteSongs: [
        {
            musicId: { type: String },
            musicGender: { type: String },
        },
    ],
    musicHistory: [
        {
            musicId: { type: String },
            musicGender: { type: String },
        },
    ],
    lastAccessedPlaylist: { type: String, required: true, default: '' },
    lastAccessedPlaylistName: { type: String, required: true, default: '' },
    profilePicture: { type: String, default: '' },
    theme: { type: String, required: true, default: 'original' },
    myPlaylists: [
        {
            _id: { type: String },
            title: { type: String },
            currentCoverUrl: { type: String },
            totalSongs: { type: Number },
            additionDate: { type: Date },
            songs: [
                {
                    _id: { type: String },
                    musicId: { type: String },
                },
            ],
        },
    ],
})

export const User = model<IUser>('User', userSchema)
