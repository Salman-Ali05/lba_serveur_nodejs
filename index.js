const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const produitsRouter = require("./routes/produits");
const cors = require('cors');
const url = "mongodb://0.0.0.0:27017";
const dbName = "lba_database";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

MongoClient.connect(url, options)
  .then((client) => {
    console.log("Connexion à la base de données établie");

    const db = client.db(dbName);

    app.use(cors()); // Acess block when axios request resolver 
    app.use(express.json());
    app.use("/api/produits", produitsRouter(db));

    // GLOBAL ROUTES
    app.get("/", (req, res) => {
      res.send("Bienvenue sur l'API, il n'y a rien à voir ici, à part un simple Bonjour :) !");
    });

    app.listen(5500, () => {
      console.log("App launched on port 5500");
    });
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion à la base de données", err);
  });
