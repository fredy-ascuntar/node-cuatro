const express = require("express");
const cors = require("cors");
const path = require("path");
const connection = require("./model/database");
const routeUsuario = require("./routes/routesUsuario").default;

class Server {
  constructor() {
    this.app = express();
    this.app.set("port", 4077);
    this.app.use(express.json());
    this.app.use(cors());

    //
    this.app.use(express.static(path.join(__dirname, "..", "..", "FrontEnd")));
    //

    this.app.get("/", (req, res) => {
      //res.status(200).json({ correcto: "Conectado" });
      res.sendFile(path.join(__dirname, "..", "..", "FrontEnd", "index.html"));
    });
    this.app.use(new routeUsuario().ruta);

    this.app.listen(4077, () => {
      console.log("Corriendo en puerto " + 4077);
    });

    this.connectionBd;
  }

  async connectionBd() {
    await connection;
  }
}

const run = new Server();
