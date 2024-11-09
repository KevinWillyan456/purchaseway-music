import nodemailer from 'nodemailer'

function transporter(email: string, password: string) {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: email,
            pass: password,
        },
    })
}

export default transporter
