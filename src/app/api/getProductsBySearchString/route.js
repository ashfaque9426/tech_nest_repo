import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category');
        const searchedStrings = searchParams.get("searchStr");
        const limitValue = searchParams.get("limit");
        const searchedStrArr = searchedStrings.split(";");
        const pipeline = {
            productCategory: { $regex: category, $options: 'i' },
            $or: [],
        };

        for(let i = 0; i < searchedStrArr.length; i++) {
            const regexPattern = new RegExp(`${searchedStrArr[i]}`, 'i');
            pipeline.$or.push(
                {
                    "productTitle": { $regex: regexPattern }
                },
                {
                    "keyFeatures.model": { $regex: regexPattern }
                },
                {
                    "keyFeatures.socket": { $regex: regexPattern }
                }
            );
        }


        if (Object.keys(pipeline).length > 0) {
            const result = await Product.find(pipeline).select('_id brand imgUrls productTitle productCategory productStatus keyFeatures points regularPrice price offer createdAt').limit(limitValue > 0 ? limitValue : 0).sort({ price: 1 });
            if(result.length > 0) {
                return NextResponse.json({
                    success: true,
                    data: result
                });
            }
        }
        
        return NextResponse.json({
            success: false,
            message: 'No Match Found. Please try another product.'
        });
    }
    catch(err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: `Unable to communicate with database. Err: ${err.message}`
        });
    }
}