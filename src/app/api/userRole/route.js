import connectToDB from "@/database";
import User from "@/models/user";
import { verifyJWT } from "@/utils/middlewares";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
    try {
        // connecting to mongodb
        await connectToDB();

        // extracting user data from req object.
        const userData = req.body;
        const userEmail = userData.userEmail;

        // implementation of verifyJWT middleware based on Auth token.
        verifyJWT(req, res, ()=> {
            res.status(200).json({ success: true, message: 'Access granted.' });
        });

        // if verifyJWT has passed then check for the user and return the user role.
        const result = await User.findOne({ userEmail: userEmail }).select('role');

        if(result) {
            return NextResponse.json({
                success: true,
                userRole: result.role
            });
        }

        // if user is still not found in the database from some reason return the bellow message.
        return NextResponse.json({
            success: false,
            message: 'unable to find the user from database.'
        });

    } catch (err) {
        console.log(err);
        // if server error occured the return the bellow message.
        NextResponse.json({
            success: false,
            message: 'Unable to connect to the server. Please try again later.'
        })
    }
}