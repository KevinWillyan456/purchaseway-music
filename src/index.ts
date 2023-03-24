import express from "express";
import { config } from "dotenv"
import cors from "cors"
import { connectToDatabase } from "./database";
import { routes } from "./routes";

config();
connectToDatabase();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(routes)

app.set("view engine", "ejs")
app.set ('views', __dirname + '/views')

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index');
});
app.get("/home", (req, res) => {
    res.render('home');
});

app.listen(port, () =>
  console.log(`Servidor rodando na porta: ${port} - http://localhost:${port}`)
);