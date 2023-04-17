import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

async function eAdmin(req: Request, res: Response, next: NextFunction) {
    const SECRET_KEY: Secret = `${process.env.SECRET}`
    interface CustomRequest extends Request {
        token: string | JwtPayload
    }

    try {
        const authHeader = req.cookies.token
    
        if (!authHeader) {
            return res.status(400).json({
                erro: true,
                mensagem:
                    'Erro: Necessário realizar o login para acessar a página! Falta o token A',
            })
        }

        const [, token] = authHeader.split(' ')

        if (!token) {
            return res.status(400).json({
                erro: true,
                mensagem:
                    'Erro: Necessário realizar o login para acessar a página! Falta o token B',
            })
        }

        const decoded = jwt.verify(token, SECRET_KEY)
        ;(req as CustomRequest).token = decoded

        next()
    } catch (err) {
        return res.status(400).redirect("/denied")

        // return res.status(400).json({
        //     erro: true,
        //     mensagem:
        //         'Erro: Necessário realizar o login para acessar a página! Token Inválido',
        // })
    }
}

export { eAdmin }
