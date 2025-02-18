import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../models/User'

const SECRET_KEY: Secret = `${process.env.JWT_SECRET}`
const MAX_AGE_COOKIE = 604800000

async function eAdminManager(req: Request, res: Response, next: NextFunction) {
    interface CustomRequest extends Request {
        token: string | JwtPayload
    }

    try {
        const authToken = req.cookies.token

        if (!authToken) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/login')
        }

        const [, token] = authToken.split(' ')

        if (!token) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/login')
        }

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload
        ;(req as CustomRequest).token = decoded

        if (!decoded.id) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/login')
        }

        const userId = decoded.id

        const user = await User.findById(userId, '-password')

        if (!user) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/login')
        }

        if (user.type !== 'admin') {
            return res.status(403).redirect('/login')
        }

        if (user.tokens.find((t) => t.token === token)) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/denied')
        }

        res.cookie('user', userId, {
            maxAge: MAX_AGE_COOKIE,
        })

        next()
    } catch {
        res.clearCookie('user')
        res.clearCookie('token')
        return res.status(400).redirect('/login')
    }
}

async function eAdminManagerRequest(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const userId = req.query.userId

    try {
        const user = await User.findById(userId, '-password')

        if (user && user.type === 'admin') {
            next()
        } else {
            res.status(403).json({ message: 'Access denied' })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export { eAdminManager, eAdminManagerRequest }
