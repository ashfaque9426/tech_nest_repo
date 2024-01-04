import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
    {
        bannerTitle: {
            type: String,
            required: true
        },
        bannerSubtitle: {
            type: String,
            required: true
        },
        bgImgUrl: {
            type: String,
            required: true
        },
        productImgUrl: String
    }
);

const Banner = mongoose.models.BannerDataCollection || mongoose.model("BannerDataCollection", BannerSchema, "BannerDataCollection");

export default Banner;