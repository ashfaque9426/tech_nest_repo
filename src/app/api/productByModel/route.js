import connectToDB from "@/database";
import Product from "@/models/product";
import { capitalizeFirstLetter } from "@/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        // connecting to mongodb
        await connectToDB();
        // getting the search params and converting it into capitalise and lowercase
        const searchParams = req.nextUrl.searchParams;
        const model = searchParams.get('model');
        const capitalizedModel = capitalizeFirstLetter(model);
        const lowerCasedModel = model.toLowerCase();

        // if search params is truthy then the database seach option will be performed
        if (searchParams) {
            const result = await Product.find({
                $or: [
                    {
                        model: { $regex: model, $options: 'i' }
                    },
                    {
                        model: { $regex: capitalizedModel, $options: 'i' }
                    },
                    {
                        model: { $regex: lowerCasedModel, $options: 'i' }
                    }
                ]
            }).select('brand model imgUrls productCategory productStatus points offer createdAt')

            // if database doesnot return an empty array then returning the results
            if (result.length > 0) {
                return NextResponse.json({
                    success: true,
                    data: result
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Unable to retrieve data from database.'
                })
            }

        }
    } catch (err) {
        // console.log(err.message);
        return NextResponse.json({
            success: false,
            message: `Something went wrong. Please try again later. msg: ${err.message}.`
        })
    }
}