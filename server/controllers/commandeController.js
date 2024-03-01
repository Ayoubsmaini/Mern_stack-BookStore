const Commande = require("../models/Commande");
const joi = require("joi");
const getAll = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const commande = await Commande.findById(id);
    if (!commande) return res.status(404).json({ error: "Commande not found" });
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const clientTelSchema = joi.object({
    id: joi.string(),
    tel: joi
      .string()
      // .regex(/^(?:\+212|06)\d{9,}$/)
      // .message(
      //   "Invalid phone number format. It should be more than 9 characters and start with +212 or 06"
      // ),
  });

  // joi validation for the entire CommandeSchema
  const CommandejoiSchema = joi.object({
    status: joi.string().valid("en attente", "traité", "annulé"),
    prix_totale: joi.number().required(),
    nomber_de_produit: joi.number().required(),
    client: clientTelSchema,
    produits: joi.array(),
  });
  try {
    const { error } = CommandejoiSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { prix_totale, nomber_de_produit, client, produits } = req.body;
    const newCommande = new Commande({
      prix_totale,
      nomber_de_produit,
      client,
      produits,
    });
    const savedCommande = await newCommande.save();
    res
      .status(201)
      .json({ commande: savedCommande, message: `created successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    console.log(req.isAdmin);
    if (!req.is_admin)
      return res
        .status(400)
        .json({ message: "Vous n'avez pas le droit de modifier la commande." });
    const { id } = req.params;

    const updatedCommande = await Commande.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCommande)
      return res.status(404).json({ error: "Commande not found" });

    res
      .status(200)
      .json({ commande: updatedCommande, message: `updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  if (!req.is_admin)
    return res
      .status(400)
      .json({ message: "Vous n'avez pas le droit de supprimer la commande." });
  try {
    const { id } = req.params;
    const removedCommande = await Commande.findByIdAndDelete(id);
    if (!removedCommande)
      return res.status(404).json({ error: "Commande not found" });
    res.status(200).json({ message: `removed successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
