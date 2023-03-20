import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.set ('views', __dirname + '/views')

app.use(express.static(__dirname + '/assets'));

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(port, () =>
  console.log(`Servidor rodando na porta: ${port} - http://localhost:${port}`)
);