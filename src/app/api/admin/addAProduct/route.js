import connectToDB from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";


// defining product schema using joi.
const ProductSchema = Joi.object({
    status: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    productTitle: Joi.string().required(),
    productCategory: Joi.string().required(),
    productStatus: Joi.string().required(),
    points: Joi.number().required(),
    quantity: Joi.number().required(),
    userRating: Joi.number().required(),
    questions: Joi.array().required(),
    imgUrls: Joi.array().required(),
    keyFeatures: Joi.object().required(),
    regularPrice: Joi.number().required(),
    price: Joi.number().required(),
    productSpecifications: Joi.array().required(),
    productDescriptions: Joi.array().required()
});

export const dynamic = "force-dynamic";


export async function POST(req) {
    try {
        // connecting to MongoDB
        await connectToDB();

        // user authorization will be here soon.

        // receiving data from reqest object parameter
        const requestedData = await req.json();
        // console.log(requestedData);

        // extracting data from request object.
        const {
            status,
            brand,
            model,
            productTitle,
            productCategory,
            productStatus,
            points,
            quantity,
            userRating,
            questions,
            imgUrls,
            keyFeatures,
            regularPrice,
            price,
            productSpecifications,
            productDescriptions
        } = requestedData;

        // validating extrated data using product schema.
        const {error} = ProductSchema.validate({
            status,
            brand,
            model,
            productTitle,
            productCategory,
            productStatus,
            points,
            quantity,
            userRating,
            questions,
            imgUrls,
            keyFeatures,
            regularPrice,
            price,
            productSpecifications,
            productDescriptions
        });

        // if validation is failed then sending error message from error object destructured from validate method.
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }

        // trying to create product to mongodb using the defined product model in mongoose.
        const addedProductByAdmin = await Product.create(requestedData);

        // if addded successfully to the database sending success message string within responsed object.
        if(addedProductByAdmin) {
            return NextResponse.json({
                success: true,
                message: "Product is successfully added to Database."
            })
        }

        // otherwise returng an error message.
        return NextResponse.json({
            success: false,
            message: "Failed to add the product to the Database ! Please try again."
        })

    } catch (err) {
        // for any unexpected errors or if failed to connect to the database then showing the error message
        return NextResponse.json({
            success: false,
            message: `Something went wrong. Please try again later. msg: ${err.message}.`
        })
    }
}