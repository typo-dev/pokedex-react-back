const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sprite: {
    type: String,
    required: true,
  },
  types: {
    type: Array,
    required: true,
  },
});

const pokemonModel = mongoose.model("pokemons", pokemonSchema);

module.exports = pokemonModel;
