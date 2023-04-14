import { Request, Response } from 'express'
import { UpdateWithAggregationPipeline } from 'mongoose'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { User } from '../models/User'

async function indexUser(req: Request, res: Response) {
    try {
        const users = await User.find()
        return res.status(200).json({ users })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function storeUser(req: Request, res: Response) {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const encryptedPassword = await bcrypt.hash(password, 8)
    console.log(encryptedPassword)

    const user = new User({
        _id: uuid(),
        name,
        password: encryptedPassword,
        additionDate: new Date(),
    })

    try {
        await user.save()

        return res.status(201).json({ message: 'User added succesfully!' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function loginUser(req: Request, res: Response) {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).json({ error: 'data is missing' })
    }

    try {
        const user = await User.findOne({name})

        if (!user) {
            return res.status(400).json({ error: 'wrong name or password - Nome' })
        }

        if(!(await bcrypt.compare(password, user?.password))){
            return res.status(400).json({ error: 'wrong name or password - Senha' })
        }

        const token = jwt.sign({id: user?._id}, `${process.env.SECRET}`, {
            expiresIn: 60
        })


        // Salva o Token
        return res.status(200).json({
            erro: false,
            mensagem: "Login",
            token
        })

    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

async function updateUser(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { name, password } = req.body
    const { id } = req.params

    if (!name && !password) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            name,
            password,
        },
    }

    try {
        await User.updateOne(filter, updateDoc)

        return res.status(200).json({ message: 'User updated succesfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteUser(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params
    const filter = { _id: id }

    try {
        await User.deleteOne(filter)
        return res.status(200).json({ message: 'User removed succesfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

export { indexUser, storeUser, loginUser, updateUser, deleteUser }
