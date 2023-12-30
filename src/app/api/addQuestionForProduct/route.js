import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try {
        // connecting to database
        await connectToDB();

        // getting the product id form searchparams.
        const searchParams = req.nextUrl.searchParams;
        const productId = searchParams.get('productId');
        const userEmail = searchParams.get('userEmail');
        const questionObj = await req.json();

        // if productId and questionObj are truthy value then and question object is not empty the proceed the operation further.
        if(productId && questionObj && Object.keys(questionObj).length > 0) {

            // if user email already exists then update the existed user question object by matching the email.
            if(userEmail.length > 0) {
                const documentWithExistedEmail = await Product.findOneAndUpdate({ _id: productId, "questions.userEmail": userEmail }, {
                    $push: { "questions.$.usersQuestions": questionObj.usersQuestions[0] }
                },{ new: true },);

                if (documentWithExistedEmail) {
                    return NextResponse.json({
                        success: true,
                        message: 'Question added successfully.',
                        updatedData: documentWithExistedEmail
                    })
                }
            }

            const addQuestionToProductArr = await Product.findOneAndUpdate({ _id: productId }, { $push: { questions: questionObj } }, { new: true });
            
            // if product updated successfully and returning the updated product then
            if (addQuestionToProductArr) {
                return NextResponse.json({
                    success: true,
                    message: 'Question added successfully.',
                    updatedData: addQuestionToProductArr
                });
            }

            // else return error message.
            return NextResponse.json({
                success: false,
                message: 'Failed to add the question. Please try again.'
            });

        }

        // if unable to get product id and question object then send the bellow error message
        return NextResponse.json({
            success: false,
            message: "Unable to get the product id. Please try again."
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: `Error occured when processing the request. Error: ${err.message}`
        });
    }
}