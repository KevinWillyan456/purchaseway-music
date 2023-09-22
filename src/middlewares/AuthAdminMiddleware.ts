import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../models/User'

async function eAdminManager(req: Request, res: Response, next: NextFunction) {
    const SECRET_KEY: Secret = `${process.env.SECRET}`

    interface CustomRequest extends Request {
        token: string | JwtPayload
    }
    interface idUser {
        id: string
    }

    try {
        const authToken = req.cookies.token
        const authId = req.cookies.user

        if (!authToken || !authId) {
            return res.status(400).redirect('/login')
        }

        const [, token] = authToken.split(' ')

        if (!token) {
            return res.status(400).redirect('/login')
        }

        const decoded = jwt.verify(token, SECRET_KEY)
        ;(req as CustomRequest).token = decoded

        const user = await User.findById(authId, '-password')

        if (!user) {
            return res.status(400).redirect('/login')
        }

        if (user.type !== 'admin') {
            return res.status(400).redirect('/login')
        }

        next()
    } catch (err) {
        return res.status(400).redirect('/login')
    }
}

async function eAdminManagerRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const userId = req.query.userId

    try {
        const user = await User.findById(userId, '-password')

        if (user && user.type === 'admin') {
            next()
        } else {
            return res.status(403).json({ message: 'Access denied' })
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

export { eAdminManager, eAdminManagerRequest }
