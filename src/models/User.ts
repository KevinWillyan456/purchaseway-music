import { Schema, model } from 'mongoose'

export interface IUser {
    _id: string
    name: string
    password: string
    additionDate: Date
    favoriteSongs: [
        {
            musicId: string
        }
    ]
    musicHistory: [
        {
            musicId: string
        }
    ]
    lastAccessedPlaylist: string
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    additionDate: { type: Date, required: true },
    favoriteSongs: [{ musicId: String }],
    musicHistory: [{ musicId: String }],
    lastAccessedPlaylist: { type: String, default: 'Nightcore' },
})

export const User = model<IUser>('User', userSchema)
