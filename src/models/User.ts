import { Schema, model } from 'mongoose'

export interface IUser {
    _id: string
    name: string
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
    myPlaylists: {
        _id: string
        title: string
        currentCoverUrl: string
        totalSongs: number
        additionDate: Date
    }[]
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
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
    lastAccessedPlaylist: { type: String, default: 'Nightcore' },
    lastAccessedPlaylistName: { type: String, default: 'Nightcores' },
    profilePicture: { type: String, default: '' },
    myPlaylists: [
        {
            _id: { type: String },
            title: { type: String },
            currentCoverUrl: { type: String },
            totalSongs: { type: Number },
            additionDate: { type: Date },
        },
    ],
})

export const User = model<IUser>('User', userSchema)
