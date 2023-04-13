const mongoose = require("mongoose");

//schema
const productSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        required: true
      },
      images: {
        type: [String],
        required: true
      },
},{ timestamps: true });

//model
const Product = new mongoose.model("Product",productSchema);
module.exports = Product;
