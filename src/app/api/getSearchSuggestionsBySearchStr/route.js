import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET (req) {
    try {
        await connectToDB();
        const searchParams = req.nextUrl.searchParams;
        const searchStr = searchParams.get("searchStr");

        if(searchStr.length > 0) {
            const result = await Product.find({ productTitle: searchStr.length > 0 ? new RegExp(searchStr, 'i') : "" }).select("_id productTitle");

            if(result.length > 0) {
                return NextResponse.json({
                    success: true,
                    data: result
                });
            }

            return NextResponse.json({
                success: false,
                message: "No Match found."
            });
        }

        return NextResponse.json({
            success: false,
            message: `Something went wrong while trying to get product suggestions from server. Please try again.`
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: `Something went wrong while connecting to server. Err: ${err.message} `
        })
    }
}