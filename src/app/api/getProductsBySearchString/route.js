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

        // replacing string from searchedStrArr and making them ready for regex in proper form.
        searchedStrArr.forEach((item, index) => {
            searchedStrArr[index] = item.replace(/"/g, '');
            if (/\s$/.test(item)) searchedStrArr[index] = item.replace(/\s$/, '+');
            if (category === "smart phone" && /(\d+)\s+(\d+)/.test(item)) searchedStrArr[index] = item.replace(/(\d+)\s+(\d+)/, '$1\\+$2');
            if (/\sMP/.test(item)) searchedStrArr.push(searchedStrArr[index].replace(/\sMP/, 'MP'));
            if (/M\.\d/.test(item) || /\(/.test(item)) searchedStrArr[index] = item.replace(/\./, '\\.').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
            if (item.includes('GeForce RTX') || item.includes('GeForce GTX') || item.includes('Radeon RX')) searchedStrArr[index] = item.slice(0, -2);
        });
        
        // console.log(brandNameStrWithOtherElementSelected);
        const pipeLineObj = {
            productCategory: { $regex: category, $options: 'i' },
        };

        // console.log('line40:');
        // console.log(searchedStrArr);

        // count the string prfixes such as cpuMod- is the prefix of "cpuMod-Intel Pentium" String.
        function countStringPrefixesMoreThanOnce(prefix) {
            const prefixArray = [];

            searchedStrArr.forEach(str => str.includes(prefix) && prefixArray.push(str));

            return prefixArray.length > 1 && {occurence: true, prefixArray} || {occurence: false};
        }


        function pushOnPipelineObj (strItem, prefix, nameOfTheField ='', nameFieldArr=[], nameOfNestedField='', nestedNameFieldArr=[]) {
            const pureStr = strItem.replace(prefix, '');
            const prefixOccurence = countStringPrefixesMoreThanOnce(prefix);
            const arrForOrConditionals = [];

            // nameFieldArr is for stings that requires $or operations.
            // nestedNameFileldArray with nameOfNestedField for searching through nested documents.

            if ((prefixOccurence.occurence || !prefixOccurence.occurence) && nameOfTheField.length > 0 && nameOfNestedField.length > 0 && nestedNameFieldArr.length > 0) {

                const firstTypeOfObjForOrOperation = {};
                if (prefixOccurence.occurence) {
                    firstTypeOfObjForOrOperation[nameOfTheField] = { $in: prefixOccurence.prefixArray.map(strElem => new RegExp(strElem.replace(prefix, ''), 'i')) };
                } else {
                    firstTypeOfObjForOrOperation[nameOfTheField] = { $regex: pureStr, $options: 'i' };
                }
                arrForOrConditionals.push(firstTypeOfObjForOrOperation);

                nestedNameFieldArr.forEach(fieldName => {
                    const secondTypeOfObjForOrOperation = {};
                    if (prefixOccurence.occurence) {
                        secondTypeOfObjForOrOperation[nameOfNestedField] = { $elemMatch: { [fieldName]: { $in: prefixOccurence.prefixArray.map(strElem => new RegExp(strElem.replace(prefix, ''), 'i')) } } };
                    } else {
                        secondTypeOfObjForOrOperation[nameOfNestedField] = { $elemMatch: { [fieldName]: { $regex: pureStr, $options: 'i' } } };
                    }
                    arrForOrConditionals.push(secondTypeOfObjForOrOperation);
                });
                pipeLineObj['$or'] = arrForOrConditionals;
            }
            else if (prefixOccurence.occurence && nameOfTheField.length > 0) {
                pipeLineObj[nameOfTheField] = { $in: prefixOccurence.prefixArray.map(strElem => new RegExp(strElem.replace(prefix, ''), 'i')) };
            }
            else if ((prefixOccurence.occurence || !prefixOccurence.occurence) && nameFieldArr.length > 0) {
                nameFieldArr.forEach(fieldName => {
                    const objForOrOperation = {};
                    if(prefixOccurence.occurence) {
                        objForOrOperation[fieldName] = { $in: prefixOccurence.prefixArray.map(strElem => new RegExp(strElem.replace(prefix, ''), 'i')) };
                    } else {
                        objForOrOperation[fieldName] = { $regex: pureStr, $options: 'i' };
                    }
                    arrForOrConditionals.push(objForOrOperation);
                });
                pipeLineObj['$or'] = arrForOrConditionals;
            }
            else if ((prefixOccurence.occurence || !prefixOccurence.occurence) && nestedNameFieldArr.length > 0) {
                nestedNameFieldArr.forEach(fieldName => {
                    const objForOrOperation = {};
                    if (prefixOccurence.occurence) {
                        objForOrOperation[nameOfNestedField] = { $elemMatch: { [fieldName]: { $in: prefixOccurence.prefixArray.map(strElem => new RegExp(strElem.replace(prefix, ''), 'i')) } } }
                    } else {
                        objForOrOperation[nameOfNestedField] = { $elemMatch: { [fieldName]: { $regex: pureStr, $options: 'i' } } }
                    }
                    arrForOrConditionals.push(objForOrOperation);
                });
                pipeLineObj['$or'] = arrForOrConditionals;
            }
            else {
                pipeLineObj[nameOfTheField] = { $regex: pureStr, $options: 'i' };
            }

            // console.log(pipeLineObj);

        }

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
                pushOnPipelineObj(strItem, 'cpuMod-', 'productTitle');
            }

            if (strItem.includes('mod-')) {
                pushOnPipelineObj(strItem, 'mod-', 'keyFeatures.model');
            }

            if (strItem.includes('soc-')) {
                pushOnPipelineObj(strItem, 'soc-', 'keyFeatures.socket');
            }

            if (strItem.includes('supm-') || strItem.includes('rms-')) {
                strItem.includes('supm-') && pushOnPipelineObj(strItem, 'supm-', '', ['keyFeatures.ram', 'keyFeatures.memory', 'keyFeatures.supportedRam', 'keyFeatures.supportedMemory']);

                strItem.includes('rms-') && pushOnPipelineObj(strItem, 'rms-', '', ['keyFeatures.ram', 'keyFeatures.memory', 'keyFeatures.supportedRam', 'keyFeatures.supportedMemory']);
            }

            if (strItem.includes('suppslt-')) {
                pushOnPipelineObj(strItem, 'suppslt-', 'keyFeatures.features');
            }

            if (strItem.includes('disps-') || strItem.includes('dispt-')) {
                strItem.includes('disps-') && pushOnPipelineObj(strItem, 'disps-', 'keyFeatures.display', []);

                strItem.includes('dispt-') && pushOnPipelineObj(strItem, 'dispt-', 'keyFeatures.display', []);
            }

            if (strItem.includes('camt-')) {
                pushOnPipelineObj(strItem, 'camt-', 'keyFeatures.camera', []);
            }

            if (strItem.includes('proct-') || strItem.includes('scpu-')) {
                strItem.includes('proct-') && pushOnPipelineObj(strItem, 'proct-', '', ['keyFeatures.processor', 'keyFeatures.supportedCpu']);
                
                strItem.includes('scpu-') && pushOnPipelineObj(strItem, 'scpu-', '', ['keyFeatures.processor', 'keyFeatures.supportedCpu']);
            }

            if (strItem.includes('gpu-')) {
                pushOnPipelineObj(strItem, 'gpu-', 'keyFeatures.graphics', [], 'productSpecifications', ['graphics.graphicsModel']);
            }

            if (strItem.includes('storlts-')) {
                strItem.includes('storlts-') && pushOnPipelineObj(strItem, 'storlts-', '', ['keyFeatures.ram', 'keyFeatures.storage']);
            }
            
            if (strItem.includes('warr-')) {
                pushOnPipelineObj(strItem, 'warr-', '', [], 'productSpecifications', ['warranty.warrantyDetails', 'warrantyInformation.warranty', 'warrantyInformation.manufacturingWarranty']);
            }

        });

        // console.log('line221:');
        // console.log(searchedStrArr);

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