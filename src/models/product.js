import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        status: String,
        brand: String,
        model: String,
        productTitle: String,
        productCategory: String,
        productStatus: String,
        points: Number,
        quantity: Number,
        userRating: Number,
        questions: Array,
        imgUrls: Array,
        keyFeatures: Object,
        regularPrice: Number,
        price: Number,
        productSpecifications: Array,
        productDescriptions: Array,
    },
    { timestamps: true }
)

const Product = mongoose.models.TechProducts || mongoose.model("TechProducts", ProductSchema, "TechProducts");

export default Product;