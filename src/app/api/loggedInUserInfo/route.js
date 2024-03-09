import connectToDB from "@/database";
import User from "@/models/user";
import { verifyJWT } from "@/utils/customMiddlewares";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();

        const userData = req.json();
        const userEmail = userData.userEmail;

        const { error = null, message = "", decoded = null, status = 0 } = verifyJWT(req);

        if (error) {
            return NextResponse.json({
                success: false,
                message: message.length > 0 ? message : 'Unauthorized Access. Access Denied.'
            }, { status: status });
        }

        if (decoded !== null && userEmail !== decoded?.userEmail) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Email, user access suspended.'
            });
        }

        const result = await User.findOne({email: userEmail});

        if(result) {
            return NextResponse.json({
                success: true,
                userData: result
            })
        }

        // if user is still not found in the database from some reason return the bellow message.
        return NextResponse.json({
            success: false,
            message: 'Unable to retrieve the user data from database. Please check if the email is valid or user is logged in to the account.'
        });

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Unble to connect with server. Please try again later.'
        }, {status: 408})
    }
}