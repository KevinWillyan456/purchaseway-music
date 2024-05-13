import { Schema, model } from 'mongoose'

export interface IMusic {
    _id: string
    audioUrl?: string
    coverUrl?: string
    title?: string
    videoId: string
    gender: string
    theme: string
    additionDate: Date
}

const musicSchema = new Schema<IMusic>({
    _id: { type: String, required: true },
    videoId: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    theme: { type: String, required: true },
    additionDate: { type: Date, required: true },
})

export const Music = model<IMusic>('Music', musicSchema)
