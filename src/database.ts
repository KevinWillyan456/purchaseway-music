import mongoose from 'mongoose'

export function connectToDatabase() {
    mongoose.connect(`${process.env.DATABASE_URL}`)

    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Conectou ao Banco de Dados'))
}
