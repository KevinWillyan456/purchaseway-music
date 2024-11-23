import { Request, Response, NextFunction } from 'express'
import { validate as isUuid } from 'uuid'
import { User } from '../models/User'

async function getUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params

    if (!isUuid(id)) {
        res.clearCookie('user')
        res.clearCookie('token')
        res.status(400).json({ error: 'Invalid ID' })
        return
    }

    try {
        const user = await User.findById(id)

        if (!user) {
            res.clearCookie('user')
            res.clearCookie('token')
            res.status(404).json({ error: 'User not found' })
            return
        }
    } catch (err) {
        res.status(500).json({ error: err })
        return
    }

    next()
}

export { getUser }
