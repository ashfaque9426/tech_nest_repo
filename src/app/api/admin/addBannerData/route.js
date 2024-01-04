import connectToDB from "@/database";
import Banner from "@/models/banner";
import Joi from "joi";
import { NextResponse } from "next/server";

const BannerSchema = Joi.object({
    bannerTitle: Joi.string().required(),
    bannerSubtitle: Joi.string().required(),
    bgImgUrl: Joi.string().required(),
    productImgUrl: Joi.string()
});

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        // connecting to database
        await connectToDB();

        // getting the data from request object.
        const requestedData = await req.json();

        // distructuring properties from requested data object for Joi validation.
        const {
            bannerTitle,
            bannerSubtitle,
            bgImgUrl,
            productImgUrl

        } = requestedData;

        const {error} = BannerSchema.validate({
            bannerTitle,
            bannerSubtitle,
            bgImgUrl,
            productImgUrl
        });

        // if validation is failed then sending error message from error object destructured from validate method.
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }

        // try to create Banner Document to mongodb using the defined Banner model using mongoose.
        const addedBannerDataByAdmin = await Banner.create(requestedData);

        if(addedBannerDataByAdmin) {
            return NextResponse.json({
                success: true,
                message: "Banner Information are successfully added to Database."
            });
        }

        // otherwise returng an error message.
        return NextResponse.json({
            success: false,
            message: "Failed to add the Banner Information to the Database ! Please try again."
        });

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: `Something went wrong. Please try again later. Error: ${err.message}`
        });
    }
}