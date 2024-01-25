import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        status: String,
        brand: String,
        model: String,
        productTitle: String,
        productCategory: String,
        productStatus: String,
        offer: String,
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
        youtubeEmbedUrl: String
    },
    { timestamps: true }
)

ProductSchema.index({ status: 1, brand: 1, model: 1, productTitle: 1, productCategory: 1, keyFeatures: 1 });

const Product = mongoose.models.TechProducts || mongoose.model("TechProducts", ProductSchema, "TechProducts");

export default Product;