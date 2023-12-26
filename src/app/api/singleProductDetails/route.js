import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    
    try{
        // connecting to the database
        await connectToDB();
        const searchParams = req.nextUrl.searchParams;
        // getting the id from req object's url's search params.
        const id = searchParams.get('id');

        if(id) {
            // searching the product by id from database.
            const result = await Product.findOne({_id: id});

            // if able to get the product than returning the product
            if(result) {
                return NextResponse.json({
                    success: true,
                    data: result
                });
            }

            // else returning the message that unable to get the product.
            return NextResponse.json({
                success: false,
                message: 'unable to retrieve the product from database'
            });
        }

    }catch(err) {
        console.log(err.message);
        // if unable to connect to database than sending the error message
        return NextResponse.json({
            success: false,
            message: `Something went wrong. Please try again later. msg: ${err.message}.`
        })
    }
}