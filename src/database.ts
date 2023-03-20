import mongoose from "mongoose";

export function connectToDatabase() {
    mongoose.connect("")

    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () => console.log("Conectou ao Banco de Dados"))
}

module.exports = connectToDatabase;