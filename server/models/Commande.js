const { Schema, model } = require("mongoose");
const joi = require("joi");
const CommandeSchema = new Schema(
  {
    status: {
      type: String,
      default: "en attente",
      enum:["en attente","traité","annulé"]
    },
    prix_totale: {
      type: Number,
      required: true,
    },
    nomber_de_produit: {
      type: Number,
      required: true,
    },
    client: {
      id: { type: Schema.Types.ObjectId, ref: "user" },
      tel: { type: String },
    },
    produits: [{ type: Schema.Types.ObjectId, ref: "book" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Commande = model("commande", CommandeSchema);
module.exports = Commande;
