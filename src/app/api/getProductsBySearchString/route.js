import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        // connecting to database
        await connectToDB();

        // receiving parameters and url strins from searchParams from nextUrl object of request object as req.
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category');
        const searchedStrings = searchParams.get("searchStr");
        const limitValue = searchParams.get("limit");
        const typeConvertedLimValue = parseInt(limitValue);

        // seperating srings from search params by ;
        const searchedStrArr = searchedStrings.split(" ;");
        const brandName = searchParams.get('brand');
        const brandChecked = searchParams.get('brandChecked');

        // if brandname is selected on the front end this value will be changed to true somewhere in the next lines of code.
        let brandNameStr = false;

        // replacing string from searchedStrArr and making them ready for regex in proper form.
        searchedStrArr.forEach((item, index) => {
            searchedStrArr[index] = item.replace(/"/g, '');
            if (/\s$/.test(item)) searchedStrArr[index] = item.replace(/\s$/, '+');
            if (category === "smart phone" && /(\d+)\s+(\d+)/.test(item)) searchedStrArr[index] = item.replace(/(\d+)\s+(\d+)/, '$1\\+$2');
            if (/\sMP/.test(item)) searchedStrArr.push(searchedStrArr[index].replace(/\sMP/, 'MP'));
            if (/M\.\d/.test(item) || /\(/.test(item)) searchedStrArr[index] = item.replace(/\./, '\\.').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            if (item.includes('GeForce RTX') || item.includes('GeForce GTX') || item.includes('Radeon RX')) searchedStrArr[index] = item.slice(0, -2);
        });

        // console.log(searchedStrArr);

        if (!searchedStrArr.every(strElem => strElem.includes('br-'))) {
            brandNameStr = true;
            searchedStrArr.forEach((strItem, i) => searchedStrArr[i] = strItem.replace('br-', ''));
        } else {
            brandNameStr = false;
            searchedStrArr.forEach((strItem, i) => searchedStrArr[i] = strItem.replace('br-', ''));
        }

        // or conditionals for $or operator for key features of the product's doucment in mongodb for product filteration.
        const orConditionsOne = [
            { productTitle: { $in: searchedStrArr.map(str => category === 'graphics card' ? str.length > 5 ? new RegExp(str, 'i') : "" : new RegExp(str, 'i')) } },
            { "keyFeatures.model": { $in: searchedStrArr.map(str => str.length > 5 ? new RegExp(str, 'i') : "") } },
            { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
        ]

        const orConditionsTwo = [
            { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
        ]

        const orConditionsThree = [
            { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
        ]

        const orConditionsFour = [
            { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.memory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.videoMemory": { $in: searchedStrArr.map(str => str.length === 3 ? new RegExp(`\\b${str}\s(?!\\w)`, 'i') : new RegExp(str, 'i')) } }
        ]

        const orConditionsFive = [
            { "keyFeatures.graphics": { $in: searchedStrArr.map(str => str.length === 3 ? new RegExp(`\\b${str}\s(?!\\w)`, 'i') : new RegExp(str, 'i')) } },
            { "keyFeatures.output": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
            { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
        ]

        // or conditionals for $or operator for productSpecs arrao of the product's doucment in mongodb for product filteration
        const orConditionsForProductSpecsPipeline = [
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
                        "display.displaySize": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "display.displayType": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "display.displayResolution": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "processor.processorModel": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "memory.busSpeed": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "memory.totalRamSlot": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "storage.storageType": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "storage.storageCapacity": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "ports&Slots.usbType-c/ThunderboltPort": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "ports&Slots.headphone&MicrophonePort": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "graphics.graphics": { $in: searchedStrArr.map(str => str.length === 3 ? new RegExp(`\\b${str}\s(?!\\w)`, 'i') : new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "graphicsSpecifications.processorGraphics": { $in: searchedStrArr.map(str => str.length === 3 ? new RegExp(`\\b${str}\s(?!\\w)`, 'i') : new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "graphics.graphicsModel": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "graphics.graphicsMemory": { $in: searchedStrArr.map(str => str.length === 3 ? new RegExp(`\\b${str}\s(?!\\w)`, 'i') : new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "features.fingerprint": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "features.sensors": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
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
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "motherboard.warranty": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "warranty.warrantyDetails": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            },
            {
                "productSpecifications": {
                    $elemMatch: {
                        "warrantyInformation.manufacturingWarranty": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            }
        ]

        // to avoid matching issue while brand name string is true first two properties are shifted form array.
        if (category !== "graphics card" && brandName || brandChecked && searchedStrArr.length > 1 && brandNameStr) {
            orConditionsOne.shift();
            orConditionsOne.shift();
        }

        // adding filtering conditions for centain category to orConditionsForProductSpecsPipeline array.
        if(category === "smart phone") {
            orConditionsForProductSpecsPipeline.push({
                "productSpecifications": {
                    $elemMatch: {
                        "memory.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                    }
                }
            })
        }

        // Pipelines for product filteration and search.

        // pipeline is for $and conditonal operations.
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
                    $or: [
                        {
                            $and: [
                                {
                                    $or: orConditionsOne
                                },
                                {
                                    $or: orConditionsOne
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsOne
                                },
                                {
                                    $or: orConditionsTwo
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsOne
                                },
                                {
                                    $or: orConditionsThree
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsOne
                                },
                                {
                                    $or: orConditionsFour
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsOne
                                },
                                {
                                    $or: orConditionsFive
                                }
                            ]
                        },
                    ],
                },

                {
                    $or: [
                        {
                            $and: [
                                {
                                    $or: orConditionsTwo
                                },
                                {
                                    $or: orConditionsOne
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsTwo
                                },
                                {
                                    $or: orConditionsTwo
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsTwo
                                },
                                {
                                    $or: orConditionsThree
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsTwo
                                },
                                {
                                    $or: orConditionsFour
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsTwo
                                },
                                {
                                    $or: orConditionsFive
                                }
                            ]
                        },
                    ],
                },

                {
                    $or: [
                        {
                            $and: [
                                {
                                    $or: orConditionsThree
                                },
                                {
                                    $or: orConditionsOne
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsThree
                                },
                                {
                                    $or: orConditionsTwo
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsThree
                                },
                                {
                                    $or: orConditionsThree
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsThree
                                },
                                {
                                    $or: orConditionsFour
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsThree
                                },
                                {
                                    $or: orConditionsFive
                                }
                            ]
                        },
                    ],
                },

                {
                    $or: [
                        {
                            $and: [
                                {
                                    $or: orConditionsFour
                                },
                                {
                                    $or: orConditionsOne
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFour
                                },
                                {
                                    $or: orConditionsTwo
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFour
                                },
                                {
                                    $or: orConditionsThree
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFour
                                },
                                {
                                    $or: orConditionsFour
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFour
                                },
                                {
                                    $or: orConditionsFive
                                }
                            ]
                        },
                    ],
                },

                {
                    $or: [
                        {
                            $and: [
                                {
                                    $or: orConditionsFive
                                },
                                {
                                    $or: orConditionsOne
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFive
                                },
                                {
                                    $or: orConditionsTwo
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFive
                                },
                                {
                                    $or: orConditionsThree
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFive
                                },
                                {
                                    $or: orConditionsFour
                                }
                            ]
                        },
                        {
                            $and: [
                                {
                                    $or: orConditionsFive
                                },
                                {
                                    $or: orConditionsFive
                                }
                            ]
                        },
                    ],
                },
                
                {
                    $and: [
                        {
                            $or: orConditionsOne
                        },
                        {
                            $or: orConditionsTwo
                        },
                        {
                            $or: orConditionsThree
                        },
                        {
                            $or: orConditionsFour
                        },
                        {
                            $or: orConditionsFive
                        }
                    ]
                },

                {
                    $and: [
                        {
                            $or: orConditionsOne
                        },
                        {
                            $or: orConditionsForProductSpecsPipeline
                        },
                    ]
                },
                {
                    $and: [
                        {
                            $or: orConditionsTwo
                        },
                        {
                            $or: orConditionsForProductSpecsPipeline
                        },
                    ]
                },
                {
                    $and: [
                        {
                            $or: orConditionsThree
                        },
                        {
                            $or: orConditionsForProductSpecsPipeline
                        },
                    ]
                },
                {
                    $and: [
                        {
                            $or: orConditionsFour
                        },
                        {
                            $or: orConditionsForProductSpecsPipeline
                        },
                    ]
                },
                {
                    $and: [
                        {
                            $or: orConditionsFive
                        },
                        {
                            $or: orConditionsForProductSpecsPipeline
                        },
                    ]
                },

                {
                    $and: [
                        {
                            $or: orConditionsOne
                        },
                        {
                            $or: orConditionsTwo
                        },
                        {
                            $or: orConditionsThree
                        },
                        {
                            $or: orConditionsFour
                        },
                        {
                            $or: orConditionsFive
                        },
                        {
                            $or: orConditionsForProductSpecsPipeline
                        }
                    ]
                }
            ]
        }

        // if brand name is true that means product is searched for only a specifiq brand from the front end
        if (brandName) {
            pipeline["brand"] = { $regex: brandName, $options: 'i' };
        }

        // if brand checked is true that means in the sidebar filtering options product for any specifiq brand or multiple brands are selected
        if (brandChecked) {
            pipeline["brand"] = { $in: searchedStrArr.map(str => new RegExp(str, 'i')) };
        }

        // console.log(brandName, pipeline);

        // looking for results according to pipeline options.
        const result = await Product.find(pipeline).select('_id brand imgUrls productTitle productCategory productStatus keyFeatures points regularPrice price offer createdAt').limit(typeConvertedLimValue > 0 ? typeConvertedLimValue : 0).sort({ regularPrice: 1 });
        // console.log(result);

        // returning results if match found.
        if (result.length > 0) {
            return NextResponse.json({
                success: true,
                data: result
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