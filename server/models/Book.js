const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    author: {
      type: String,
      required: true,
    },
    category: { default: null, type: Schema.Types.ObjectId, ref: "category" },

    dateReleased: {
      type: Date,
      required: true,
    },
    sizeInMB: {
      type: Number,
      default: 0,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("book", BookSchema);
