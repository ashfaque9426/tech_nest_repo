import connectToDB from "@/database";
import Banner from "@/models/banner";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        // connecting to database
        await connectToDB();

        // try to collect Banner information from database.
        const result = await Banner.find(); // if successfull data will be retrieved as an array of objects.

        if(result.length > 0) {
            return NextResponse.json({
                success: true,
                data: result
            });
        }

        return NextResponse.json({
            success: false,
            message: 'Something went wrong while retrieving the data. Please try again.'
        });

    } catch (err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: `Something went wrong. Please try again later. Err: ${err.message}`
        });
    }
}