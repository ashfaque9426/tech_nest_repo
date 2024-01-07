import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        // connecting to server
        await connectToDB();

        // getting the targeted discounted percentage number.
        const searchParams = req.nextUrl.searchParams;
        const discountPercentageNumber = searchParams.get('discountPercentageNumber');
        const exact = searchParams.get('exact');
        const boolExact = JSON.parse(exact);
        const parsedDiscountedPercentageNumber = parseFloat(discountPercentageNumber);
        let result;

        // product pipeline calculation for getting the the products only with the discounted amount is less than or equal to the targeted discount percentage.
        if (parsedDiscountedPercentageNumber > 0 && boolExact) {
            result = await Product.find({
                $expr: {
                    $eq: [
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        {
                                            $subtract: ['$regularPrice', '$price'],
                                        },
                                        '$regularPrice',
                                    ],
                                },
                                100,
                            ],
                        },
                        parsedDiscountedPercentageNumber,
                    ],
                },
            }).select('_id brand imgUrls productTitle productCategory productStatus points price offer keyFeatures').sort({ price: 1 });
        } 
        
        if (parsedDiscountedPercentageNumber > 0 && !boolExact) {
            result = await Product.find({
                $expr: {
                    $and: [
                        {
                            $gt: [
                                {
                                    $multiply: [
                                        {
                                            $divide: [
                                                {
                                                    $subtract: ['$regularPrice', '$price'],
                                                },
                                                '$regularPrice',
                                            ],
                                        },
                                        100,
                                    ],
                                },
                                0,
                            ],
                        },
                        {
                            $lte: [
                                {
                                    $multiply: [
                                        {
                                            $divide: [
                                                {
                                                    $subtract: ['$regularPrice', '$price'],
                                                },
                                                '$regularPrice',
                                            ],
                                        },
                                        100,
                                    ],
                                },
                                parsedDiscountedPercentageNumber,
                            ],
                        },
                    ],
                },
            }).select('_id brand imgUrls productTitle productCategory productStatus points price regularPrice offer keyFeatures').sort({ price: 1 });
        }

        // if able to retrieve the products by discount amount than return the products.
        if (result.length > 0) {
            return NextResponse.json({
                success: true,
                data: result
            });
        }

        // if unable to retrieve the peducts than send the bellow message string.
        return NextResponse.json({
            success: false,
            message: 'Getting Trouble while retrieving discounted products probably, because of the products are not available by the given percentage amount. Please try again.'
        });

    } catch (err) {
        // error related to server connectivity issue.
        console.log(err);
        return NextResponse.json({
            success: false,
            message: `Getting difficulty while connecting to server. Please try again later. Error Message: ${err.message}`
        });
    }
}