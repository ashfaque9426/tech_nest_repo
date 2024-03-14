import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();
        const userData = req.json();
        const userEmail = userData.email;

        const doesUserExists = await User.findOne({email: userEmail});

        if (doesUserExists) {
            return NextResponse.json({
                success: false,
                messeage: 'User already existed to the database.'
            }, { status: 409 });
        }

        const result = await User.create(userData);

        if(result) {
            return NextResponse.json({
                success: true,
                message: 'User created successfully.'
            }, {status: 200});
        }

        return NextResponse.json({
            success: false,
            message: 'Unable to create the user. Please try again.'
        }, {status: 500});
    }
    catch(err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Unable to communicate with the database. please try again later.'
        }, {status: 408});
    }


}