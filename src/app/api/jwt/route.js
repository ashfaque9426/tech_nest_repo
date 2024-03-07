import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        // connecting to mongodb
        await connectToDB();

        // extracting user data from req object.
        const userData = req.json();
        const userEmail = userData.userEmail;

        // searching the user from the extracted user info ex: userEmail here in the database from user's collection.
        const result = await User.findOne({userEmail: userEmail});

        // if user is found then sign the jwt token with the secret key and return the token.
        if(result) {
            const token = jwt.sign(userEmail, process.env.sst_SecretKey, { expiresIn: '1d' });
            return NextResponse.json({
                success: true,
                token: token
            });
        }

        // if unable to find the user based on extracted user data then send the bellow message.
        return NextResponse.json({
            success: false,
            message: 'Unable to find the provided email address from user database.'
        });

    } catch(err) {
        console.log(err);

        // if server error occured then send the bellow message to the end user.
        return NextResponse.json({
            success: false,
            message: 'Server Error Occured. Please Try again later.'
        })
    }
}