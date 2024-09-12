import express, { Request, Response } from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", function (request: Request, response: Response) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      response.render("index", { results: data.results });
    })
    .catch(function (err) {
      response.status(500).send("Erro ao obter dados da API");
    });
});

app.listen(3000, function () {
  console.log("Server is running");
});
