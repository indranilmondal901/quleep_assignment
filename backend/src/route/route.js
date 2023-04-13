const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()

//scema
const Product = require("../model/schema");

//for uploading image
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary').v2;

//router
const router = express.Router();

//middlewire
router.use(cors())

// configure file upload
router.use(fileUpload({
    useTempFiles: true
}))

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


//routes
router.post("/upload-images", async (req, res) => {
    try {
        let productImg = req.files.image;
        if (productImg) {
            const result = await cloudinary.uploader.upload(productImg.tempFilePath);
            res.status(200).json(result.secure_url);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to upload images." });
    }
});

// endpoint for creating a new product with image URLs
router.post("/create-product", async (req, res) => {
    try {
        const { name, description, price, currency, images } = req.body;

        const product = new Product({
            name,
            description,
            price,
            currency,
            images,
        });

        await product.save();

        res.status(200).json({ message: "Product created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create product." });
    }
});

// GET endpoint to retrieve all products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
