import { Schema, model } from 'mongoose'

export interface IPlaylist {
    _id: string
    title: string
    coverUrl: string
    description: string
    gender: string
    additionDate: Date
}

const playlistSchema = new Schema<IPlaylist>({
    _id: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    coverUrl: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true, unique: true },
    additionDate: { type: Date, required: true },
})

export const Playlist = model<IPlaylist>('Playlist', playlistSchema)
