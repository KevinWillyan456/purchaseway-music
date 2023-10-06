import { Request, Response, NextFunction } from 'express'
import { validate as isUuid } from 'uuid'
import { User } from '../models/User'

async function getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!isUuid(id)) {
        res.clearCookie('user')
        res.clearCookie('token')
        return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
        const user = await User.findById(id)

        if (!user) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(404).json({ error: 'User not found' })
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }

    next()
}

export { getUser }
