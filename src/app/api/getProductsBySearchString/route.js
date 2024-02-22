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
        let brandNameStrWithOtherElementSelected = false;

        // replacing string from searchedStrArr and making them ready for regex in proper form.
        searchedStrArr.forEach((item, index) => {
            searchedStrArr[index] = item.replace(/"/g, '');
            if (/\s$/.test(item)) searchedStrArr[index] = item.replace(/\s$/, '+');
            if (category === "smart phone" && /(\d+)\s+(\d+)/.test(item)) searchedStrArr[index] = item.replace(/(\d+)\s+(\d+)/, '$1\\+$2');
            if (/\sMP/.test(item)) searchedStrArr.push(searchedStrArr[index].replace(/\sMP/, 'MP'));
            if (/M\.\d/.test(item) || /\(/.test(item)) searchedStrArr[index] = item.replace(/\./, '\\.').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            if (item.includes('GeForce RTX') || item.includes('GeForce GTX') || item.includes('Radeon RX')) searchedStrArr[index] = item.slice(0, -2);
        });

        if (searchedStrArr.some(str => str.includes("br-")) && !searchedStrArr.every(strElem => strElem.includes('br-'))) {
            brandNameStrWithOtherElementSelected = true;
        } else {
            brandNameStrWithOtherElementSelected = false;
        }

        // console.log(brandNameStrWithOtherElementSelected);
        const pipeLineObj = {
            productCategory: { $regex: category, $options: 'i' },
        };

        // console.log('line49:');
        // console.log(searchedStrArr);

        const containsMoreThanOnce = () => {
            // Check if any of the specified prefixes occur more than once
            const prefixes = ['rms-', 'supm-', 'proct-', 'scpu-', 'soc-', 'mod-', 'suppslt-', 'storlts-', 'disps-', 'dist-', 'gpu-', 'gro-', 'camt-', 'btr-', 'warr-'];

            let prefixOccurrences = {};

            prefixes.forEach(prefix => {
                prefixOccurrences[prefix] = 0;
            });

            searchedStrArr.forEach(str => {
                prefixes.forEach(prefix => {
                    const regex = new RegExp(`\\b${prefix}\\b`, 'g');
                    const prefixCount = (str.match(regex) || []).length;
                    prefixOccurrences[prefix] += prefixCount;
                });
            });

            const occurence =  Object.keys(prefixOccurrences).filter(key => prefixOccurrences[key] > 1);

            // Check if any prefix occurs more than once
            
            if (occurence.length > 0) return;

            return false;
        }

        // count the string prfixes such as cpuMod- is the prefix of "cpuMod-Intel Pentium" String.
        function countStringPrefixesMoreThanOnce(prefix) {
            const prefixArray = [];

            searchedStrArr.forEach(str => str.includes(prefix) && prefixArray.push(str));

            return prefixArray.length > 1 && {occurence: true, prefixArray} || {occurence: false};
        }


        const occerencesOfSameType = containsMoreThanOnce();

        // this array for holding specific search conditonal objects.
        let arrForConditionals = [];

        // checking individual prefixes of search string followed by "-" sign and for each prefix doing specific actions and preparing the conditions for pushing the condition objects to arrForConditionals array.
        searchedStrArr.forEach(strItem => {
            // console.log('line84: ' + strItem);

            if (strItem.includes('singleBr-') || !strItem.includes('-')) {
                const pureStr = (strItem.includes('singleBr-') && strItem.replace('singleBr-', '')) || (!strItem.includes('-') && strItem);
                const conditionObj = { productTitle: { $regex: pureStr, $options: 'i' } };
                arrForConditionals.push(conditionObj);

            }

            if (strItem.includes('cpuMod-')) {
                const pureStr = strItem.replace('cpuMod-', '');
                let conditionObj;
                
                const prefixOccurence = countStringPrefixesMoreThanOnce('cpuMod-');

                if (prefixOccurence.occurence) {
                    conditionObj = { productTitle: { $in: prefixOccurence.prefixArray.map(cpuTitleStr => new RegExp(cpuTitleStr.replace('cpuMod-', ''), 'i')) }}
                    arrForConditionals = [];
                    arrForConditionals.push(conditionObj);
                } else {
                    conditionObj = { productTitle: { $regex: pureStr, $options: 'i' } };
                    arrForConditionals.push(conditionObj);
                }
                
            }

            if (strItem.includes('mod-')) {
                const pureStr = strItem.replace('mod-', '');
                const conditionObj = { "keyFeatures.model": { $regex: pureStr, $options: 'i' } };
                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('soc-')) {
                const pureStr = strItem.replace('soc-', '');
                const conditionObj = { "keyFeatures.socket": { $regex: pureStr, $options: 'i' } };
                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('supm-') || strItem.includes('rms-')) {
                const pureStr = (strItem.includes('supm-') && strItem.replace('supm-', '')) || (strItem.includes('rms-') && strItem.replace('rms-', ''));

                const conditionObj = {
                    '$or': [
                        { "keyFeatures.ram": { $regex: pureStr, $options: 'i' } },
                        { "keyFeatures.memory": { $regex: pureStr, $options: 'i' } },
                        { "keyFeatures.supportedRam": { $regex: pureStr, $options: 'i' } },
                        { "keyFeatures.supportedMemory": { $regex: pureStr, $options: 'i' } }
                    ]
                }

                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('suppslt-')) {
                const pureStr = strItem.replace('suppslt-', '');
                const conditionObj = { "keyFeatures.features": { $regex: pureStr, $options: 'i' } };
                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('disps-') || strItem.includes('dispt-')) {
                console.log('inside')
                const pureStr = (strItem.includes('disps-') && strItem.replace('disps-', '')) || (strItem.includes('dispt-') && strItem.replace('dispt-', ''));
                const conditionObj = { "keyFeatures.display": { $regex: pureStr, $options: 'i' } };
                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('camt-')) {
                const pureStr = strItem.replace('camt-', '');
                const conditionObj = { "keyFeatures.camera": { $regex: pureStr, $options: 'i' } };
                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('proct-') || strItem.includes('scpu-')) {
                const pureStr = (strItem.includes('proct-') && strItem.replace('proct-', '')) || (strItem.includes('scpu-') && strItem.replace('scpu-', ''));

                const conditionObj = {
                    '$or': [
                        { "keyFeatures.processor": { $regex: pureStr, $options: 'i' } },
                        { "keyFeatures.supportedCpu": { $regex: pureStr, $options: 'i' } }
                    ]
                }

                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('gpu-')) {
                const pureStr = strItem.replace('gpu-', '');

                const conditionObj = {
                    '$or': [
                        { "keyFeatures.graphics": { $regex: pureStr, $options: 'i' } },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "graphics.graphicsModel": { $regex: pureStr, $options: 'i' }
                                }
                            }
                        }
                    ]
                }

                arrForConditionals.push(conditionObj);
            }

            if (strItem.includes('storlts-')) {
                const pureStr = strItem.replace('storlts-', '');

                const conditionObj = {
                    '$or': [
                        { "keyFeatures.ram": { $regex: pureStr, $options: 'i' } },
                        { "keyFeatures.storage": { $regex: pureStr, $options: 'i' } }
                    ]
                };

                arrForConditionals.push(conditionObj);
            }
            
            if (strItem.includes('warr-')) {
                const pureStr = strItem.replace('warr-', '');

                const conditionObj = {
                    '$or': [
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "warranty.warrantyDetails": { $regex: pureStr, $options: 'i' }
                                }
                            }
                        },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "warrantyInformation.warranty": { $regex: pureStr, $options: 'i' }
                                }
                            }
                        },
                        {
                            "productSpecifications": {
                                $elemMatch: {
                                    "warrantyInformation.manufacturingWarranty": { $regex: pureStr, $options: 'i' }
                                }
                            }
                        }
                    ]
                };

                arrForConditionals.push(conditionObj);
            }

        });

        // console.log('line221:');
        // console.log(searchedStrArr);
        // console.log('line227:');
        // console.log(arrForConditionals);

        // based on some prefixes and multiple occurence of those prefixes which determines the multiple clicks of same type of filtering options from the value of 'occerencesOfSameType' variable from containsMoreThanOnce() function call changing the search conditional special operators such as $and and $or for database filtering operations.
        if ((!searchedStrArr.some(str => str.includes('br-')) && !occerencesOfSameType || searchedStrArr.some(str => str.includes('br-')) && !occerencesOfSameType || searchedStrArr.some(str => str.includes('cpuMod-')) && !occerencesOfSameType) && arrForConditionals.length > 0) {
            pipeLineObj['$and'] = arrForConditionals;
        }

        if ((searchedStrArr.some(str => str.includes('br-')) || !searchedStrArr.some(str => str.includes('br-'))) && occerencesOfSameType && arrForConditionals.length > 0) {
            pipeLineObj['$or'] = arrForConditionals;
        }

        // if brand name is true that means product is searched for only a specifiq brand from the front end
        if (brandName) {
            pipeLineObj["brand"] = { $regex: brandName, $options: 'i' };
        }

        // if brand checked is true that means in the sidebar filtering options product for any specifiq brand or multiple brands are selected
        if (brandChecked) {
            pipeLineObj["brand"] = { $in: searchedStrArr.map(str => str.includes('br-') ? new RegExp(str.split('-')[1], 'i') : '') };
        }

        // console.log('line: 265');
        // console.log(pipeLineObj);
        
        // after all the above procedure finally searching for the filtering results and receiving the results in the results array.
        const result = await Product.find(pipeLineObj).select('_id brand imgUrls productTitle productCategory productStatus keyFeatures points regularPrice price offer createdAt').limit(typeConvertedLimValue > 0 ? typeConvertedLimValue : 0).sort({ regularPrice: 1 });

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
            message: `Unable to communicate with database. Please try again later.`
        });
    }
}