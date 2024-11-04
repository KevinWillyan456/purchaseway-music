import { Schema, model } from 'mongoose'

export interface IMusic {
    _id: string
    coverUrl: string
    title: string
    videoId: string
    gender: string
    viewCount: number
    additionDate: Date
}

const musicSchema = new Schema<IMusic>({
    _id: { type: String, required: true },
    coverUrl: { type: String, required: true },
    title: { type: String, required: true },
    videoId: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    viewCount: { type: Number, required: true, default: 0 },
    additionDate: { type: Date, required: true },
})

export const Music = model<IMusic>('Music', musicSchema)
