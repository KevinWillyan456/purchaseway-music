import transporter from '../configs/EmailConfig'

interface EmailOptions {
    to: string
    subject: string
    text?: string
    html?: string
}

async function sendEmail(options: EmailOptions) {
    const EMAIL_USER = `${process.env.EMAIL_USER}`
    const EMAIL_PASS = `${process.env.EMAIL_PASS}`

    const mailOptions = {
        from: `Purchaseway Music <${EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    }

    try {
        const transporterConfig = transporter(EMAIL_USER, EMAIL_PASS)
        await transporterConfig.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email: ', error)
    }
}

export { sendEmail }
