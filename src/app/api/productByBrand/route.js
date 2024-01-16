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
        const brand = searchParams.get('brand');
        const limit = searchParams.get('limit');
        const limitValue = parseInt(limit);
        const capitalizedBrand = capitalizeFirstLetter(brand);
        const lowerCasedBrand = brand.toLowerCase();
        let result;

        // if search params is truthy then the database seach option will be performed
        if(searchParams) {
            if (limitValue > 0) {
                result = await Product.find({
                    $and: [
                        {
                            $or: [
                                {
                                    brand: { $regex: brand, $options: 'i' }
                                },
                                {
                                    brand: { $regex: capitalizedBrand, $options: 'i' }
                                },
                                {
                                    brand: { $regex: lowerCasedBrand, $options: 'i' }
                                }
                            ]
                        },
                        {
                            $or: [
                                {
                                    productStatus: capitalizeFirstLetter('in stock'),
                                },
                                {
                                    productStatus: 'in stock'
                                }
                            ]
                        }
                    ]

                }).select('_id brand imgUrls productTitle productCategory productStatus points price offer createdAt').limit(limitValue).sort({ price: 1 });
            } else {
                result = await Product.find({
                    $and: [
                        {
                            $or: [
                                {
                                    brand: { $regex: brand, $options: 'i' }
                                },
                                {
                                    brand: { $regex: capitalizedBrand, $options: 'i' }
                                },
                                {
                                    brand: { $regex: lowerCasedBrand, $options: 'i' }
                                }
                            ]
                        },
                        {
                            $or: [
                                {
                                    productStatus: capitalizeFirstLetter('in stock'),
                                },
                                {
                                    productStatus: 'in stock'
                                }
                            ]
                        }
                    ]

                }).select('_id brand imgUrls productCategory productStatus points price offer createdAt').sort({ price: 1 });
            }

            // if database doesnot return an empty array then returning the results
            if(result?.length > 0) {
                return NextResponse.json({
                    success: true,
                    data: result
                })
            }else {
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