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

app.post("/postPokemons", (req, resp) => {
  const pokemon = req.body;

  pokemonModel.findOne({ id: pokemon.id }).then(async (result) => {
    if (!result) {
      const newPokemon = new pokemonModel(pokemon);
      await newPokemon.save();
      resp.json(pokemon);
    } else {
      resp.json("Pokemon already exists in database");
    }
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
