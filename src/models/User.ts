import { Schema, model } from 'mongoose'

export interface IUser {
    _id: string
    name: string
    password: string
    additionDate: Date
}

const userSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    additionDate: { type: Date, required: true },
})

export const User = model<IUser>('User', userSchema)
