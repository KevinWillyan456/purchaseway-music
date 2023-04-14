import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
// import {promisify} from 'util';

async function eAdmin(req: Request, res: Response, next: NextFunction) {
    // Recebimento do Token para validação
    const authHeader = req.cookies.token

    if(!authHeader){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login para acessar a página! Falta o token A"
        });
    }

    const [, token] = authHeader.split(" ");

    if(!token){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login para acessar a página! Falta o token B"
        });
    }

    try {
        
        const jwtVerifyPromisified = (token: string, secret: jwt.Secret) => {
            return new Promise((resolve, reject) => {
                jwt.verify(token, secret, {}, (err, payload) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(payload);
                    }
                });
            });
        }
        
        const decode = jwtVerifyPromisified(token, `${process.env.SECRET}`);
        // res.cookie('id', decode.id)
        console.log(decode)

        next()
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login para acessar a página! Token Inválido"
        });
    }

    
}

export { eAdmin }