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
            if (/(\d+)\s+(\d+)/.test(item)) searchedStrArr[index] = item.replace(/(\d+)\s+(\d+)/, '$1\\+$2');
            if (/\sMP/.test(item)) searchedStrArr.push(searchedStrArr[index].replace(/\sMP/, 'MP'));
            if (/M\.\d/.test(item) || /\(/.test(item)) searchedStrArr[index] = item.replace(/\./, '\\.').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        });

        // console.log(searchedStrArr);

        if (!searchedStrArr.every(strElem => strElem.includes('br-'))) {
            brandNameStr = true;
            searchedStrArr.forEach((strItem, i) => searchedStrArr[i] = strItem.replace('br-', ''));
        } else {
            brandNameStr = false;
            searchedStrArr.forEach((strItem, i) => searchedStrArr[i] = strItem.replace('br-', ''));
        }

        // Pipelines for product filteration and search.
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
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
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
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
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
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
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
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                },
                                {
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
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
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { productTitle: { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.model": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.socket": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.display": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                }
                            ]
                        },
                    ],
                    $or: [
                        {
                            $and: [
                                {
                                    $or: [
                                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                                    ]
                                },
                                {
                                    $or: [
                                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                    ]
                                }
                            ]
                        },
                    ],
                },
                
                {
                    $and: [
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
                                { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                            ]
                        },
                        {
                            $or: [
                                { "keyFeatures.processor": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                            ]
                        },
                        {
                            $or: [
                                { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                            ]
                        },
                        {
                            $or: [
                                { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                                { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                            ]
                        }
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
                        { "keyFeatures.camera": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                    ]
                },
                {
                    $or: [
                        { "keyFeatures.supportedCpu": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.supportedMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.supportedRam": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.features": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                    ]
                },
                {
                    $or: [
                        { "keyFeatures.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.graphicsOutput": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } },
                        { "keyFeatures.storage": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) } }
                    ]
                },
                {
                    $or: [
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
                                    "memory.ram": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                                }
                            }
                        },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "memory.ramType": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
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
                                    "memory.maxRamCapacity": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
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
                                    "graphics.graphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
                                }
                            }
                        },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "graphicsSpecifications.processorGraphics": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
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
                                    "graphics.graphicsMemory": { $in: searchedStrArr.map(str => new RegExp(str, 'i')) }
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
                }
            ]
        }

        // if brand name is true that means product is searched for only a specifiq brand from the front end
        if (brandName) {
            pipeline["brand"] = { $regex: brandName, $options: 'i' };
            pipelineOne["brand"] = { $regex: brandName, $options: 'i' };
        }

        // if brand checked is true that means in the sidebar filtering options product for any specifiq brand or multiple brands are selected
        if (brandChecked) {
            pipeline["brand"] = { $in: searchedStrArr.map(str => new RegExp(str, 'i')) };
            pipelineOne["brand"] = { $in: searchedStrArr.map(str => new RegExp(str, 'i')) };
        }

        if (brandName || brandChecked && searchedStrArr.length > 1 && brandNameStr) {
            pipelineOne['$or'][0]['$or'].shift();
            pipelineOne['$or'][0]['$or'].shift();
        }

        // console.log(brandName, pipeline, pipelineOne);

        // looking for results according to pipeline options.
        const result = await Product.find(pipeline).select('_id brand imgUrls productTitle productCategory productStatus keyFeatures points regularPrice price offer createdAt').limit(typeConvertedLimValue > 0 ? typeConvertedLimValue : 0).sort({ regularPrice: 1 });
        const result1 = result.length === 0 && await Product.find(pipelineOne).select('_id brand imgUrls productTitle productCategory productStatus keyFeatures points regularPrice price offer createdAt').limit(typeConvertedLimValue > 0 ? typeConvertedLimValue : 0).sort({ regularPrice: 1 });

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