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
        const typeConvertedLimValue = parseInt(limitValue);
        const searchedStrArr = searchedStrings.split(" ;");

        searchedStrArr.forEach((item, index) => {
            searchedStrArr[index] = item.replace(/"/g, '');
            if (/\s$/.test(item)) searchedStrArr[index] = item.replace(/\s$/, '+');
            if (/(\d+)\s+(\d+)/.test(item)) searchedStrArr[index] = item.replace(/(\d+)\s+(\d+)/, '$1+$2');
            if (/\sMP/.test(item)) searchedStrArr.push(searchedStrArr[index].replace(/\sMP/, 'MP'));
        });

        // console.log(searchedStrArr);

        // Pipelines
        const pipeline = {
            productCategory: { $regex: category, $options: 'i' },
            $or: [
                {
                    $and: [
                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                    ]
                },
                {
                    $and: [
                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                    ]
                },
                {
                    $and: [
                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                    ]
                }
            ]
        }

        const pipelineOne = {
            productCategory: { $regex: category, $options: 'i' },
            $or: [
                {
                    $or: [
                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                    ]
                },
                {
                    $or: [
                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "display.size": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                                }
                            }
                        },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "battery.type": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                                }
                            }
                        },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "warrantyInformation.warranty": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                                }
                            }
                        }
                    ]
                },
                {
                    $or: [
                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                    ]
                }
            ]
        }

        // looking for results according to pipeline options.
        const result = await Product.find(pipeline).select('_id brand imgUrls productTitle productCategory productStatus keyFeatures points regularPrice price offer createdAt').limit(typeConvertedLimValue > 0 ? typeConvertedLimValue : 0).sort({ regularPrice: 1 });
        const result1 = await Product.find(pipelineOne).select('_id brand imgUrls productTitle productCategory productStatus keyFeatures points regularPrice price offer createdAt').limit(typeConvertedLimValue > 0 ? typeConvertedLimValue : 0).sort({ regularPrice: 1 });

        // returning results if match found.
        if (result.length > 0) {
            return NextResponse.json({
                success: true,
                data: result
            });
        }

        if (result.length === 0 && result1.length > 0) {
            return NextResponse.json({
                success: true,
                data: result1
            });
        }

        // returning message if no match found.
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