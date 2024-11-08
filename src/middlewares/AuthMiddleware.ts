import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../models/User'

const SECRET_KEY: Secret = `${process.env.JWT_SECRET}`
const MAX_AGE_COOKIE = 604800000

async function eAdmin(req: Request, res: Response, next: NextFunction) {
    interface CustomRequest extends Request {
        token: string | JwtPayload
    }
    interface idUser {
        id: string
    }

    try {
        const authHeader = req.cookies.token

        if (!authHeader) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/denied')
        }

        const [, token] = authHeader.split(' ')

        if (!token) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/denied')
        }

        const decoded = jwt.verify(token, SECRET_KEY)
        ;(req as CustomRequest).token = decoded

        res.cookie('user', (<idUser>decoded).id, {
            maxAge: MAX_AGE_COOKIE,
        })

        const user = await User.findById((<idUser>decoded).id)

        if (!user) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/denied')
        }

        if (user.tokens.find((t) => t.token === token)) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/denied')
        }

        next()
    } catch (err) {
        res.clearCookie('user')
        res.clearCookie('token')
        return res.status(400).redirect('/denied')
    }
}

export { eAdmin }
