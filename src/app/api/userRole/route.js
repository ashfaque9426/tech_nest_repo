import connectToDB from "@/database";
import User from "@/models/user";
import { verifyJWT } from "@/utils/customMiddlewares";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        // connecting to mongodb
        await connectToDB();

        // extracting user data from req object.
        const userData = req.json();
        const userEmail = userData.userEmail;

        // implementation of verifyJWT middleware based on Auth token.
        const { error = null, message = "", status = 0, decoded = null } = verifyJWT(req);

        if(error) {
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

        // if verifyJWT has passed then check for the user and return the user role.
        const result = await User.findOne({ userEmail: userEmail }).select('role');

        if (result) {
            return NextResponse.json({
                success: true,
                userRole: result.role
            });
        }

        // if user is still not found in the database from some reason return the bellow message.
        return NextResponse.json({
            success: false,
            message: 'Unable to locate the user from database. Please check if the email is valid or user is logged in to the account.'
        });

    } catch (err) {
        console.log(err);
        // if server error occured the return the bellow message.
        return NextResponse.json({
            success: false,
            message: 'Unable to connect to the server. Please try again later.'
        })
    }
}