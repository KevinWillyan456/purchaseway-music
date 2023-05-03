import { Schema, model } from 'mongoose'

export interface IUser {
    _id: string
    name: string
    password: string
    additionDate: Date
    favoriteSongs: [
        {
            musicId: string
            musicGender: string
        }
    ]
    musicHistory: [
        {
            musicId: string
            musicGender: string
        }
    ]
    lastAccessedPlaylist: string
    lastAccessedPlaylistName: string
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    additionDate: { type: Date, required: true },
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
})

export const User = model<IUser>('User', userSchema)
