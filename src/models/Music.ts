import { Schema, model } from 'mongoose'

interface IMusic {
    _id: string
    audioUrl: string
    coverUrl: string
    title: string
    gender: string
    theme: string
}

const musicSchema = new Schema<IMusic>({
    _id: { type: String, required: true },
    audioUrl: { type: String, required: true },
    coverUrl: { type: String, required: true },
    title: { type: String, required: true },
    gender: { type: String, required: true },
    theme: { type: String, required: true },
})

export const Music = model<IMusic>('Music', musicSchema)