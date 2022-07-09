const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema(
  {
    name: {
      type: "String",
      required: true,
      unique: true,
    },
    general: {
      type: "Object"
    },
    isCached: {
      type: "Boolean",
    },
    encounter: {
      isCached: {
        type: "Boolean",
      },
      general: {
        type: "String",
      },
    },
    evolution: {
      isCached: {
        type: "Boolean",
      },
      general: {
        type: "String",
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Pokemon", pokemonSchema);
