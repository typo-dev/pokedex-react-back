const express = require("express");
const mongoose = require("mongoose");
const app = express();
const pokemonModel = require("./models/pokemons");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/pokedex");

app.get("/getPokemons", (req, resp) => {
  pokemonModel.find({}, (error, result) => {
    if (!error) {
      resp.json(result);
    } else {
      resp.json(error);
    }
  });
});

app.post("/postPokemons", async (req, resp) => {
  const pokemon = req.body;
  const newPokemon = new pokemonModel(pokemon);
  await newPokemon.save();

  resp.json(pokemon);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
