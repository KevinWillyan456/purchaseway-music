import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../models/User'

async function eAdmin(req: Request, res: Response, next: NextFunction) {
    const SECRET_KEY: Secret = `${process.env.JWT_SECRET}`

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
            maxAge: 604800000,
        })

        const user = await User.findById((<idUser>decoded).id)

        if (!user) {
            res.clearCookie('user')
            res.clearCookie('token')
            return res.status(400).redirect('/denied')
        }

        if (user.tokens.find((t) => t.token === token)) {
            console.log('Token válido')
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
