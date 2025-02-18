import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

const SECRET_KEY: Secret = `${process.env.JWT_SECRET}`

async function verifyTokenExists(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const authHeader = req.cookies.token

        if (!authHeader) {
            res.clearCookie('user')
            res.clearCookie('token')
            return next()
        }

        const [, token] = authHeader.split(' ')

        if (!token) {
            res.clearCookie('user')
            res.clearCookie('token')
            return next()
        }

        jwt.verify(token, SECRET_KEY)

        return res.redirect('/home')
    } catch {
        res.clearCookie('user')
        res.clearCookie('token')
        return next()
    }
}

export { verifyTokenExists }
