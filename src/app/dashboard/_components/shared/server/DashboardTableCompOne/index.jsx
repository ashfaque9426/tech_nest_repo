import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import cn from '@/lib/clsx/cn';
import { TiTick } from "react-icons/ti";

function DashboardTableCompOne({ classNameForTable, classNameForThTr, classNameForTH, classNameForTh, classNameForTb, classNameForTr, classNameForTd, classNameForBtnOne, classNameForBtnTwo, classNameForBtnThree, tableHeadingDataArr, tableDataArr, btnFuncOne, btnFuncTwo, btnThreeFunc, imgKeyStr, fieldKeyStrOne, fieldKeyStrTwo, fieldKeyStrThree, btnOne, btnTwo, btnOneFieldKeyValue, btnTwoFieldKeyValue, btnOneDisabledStr, btnTwoDisabledStr, delBtn, btnOneText, btnTwoText, btnThreeText, btnOneIcon, btnTwoIcon, btnThreeIcon }) {
    return (
        <div className="relative overflow-x-auto shadow-md">
            <h1 className='fixed left-3 my-2 md:hidden uppercase font-bold'>move &lt; --- &gt; to navigate</h1>
            <table className={cn('mt-12 md:mt-0 min-w-full border border-gray-300 shadow-md table-auto', classNameForTable)}>
                {/* table heading */}
                <thead className={classNameForTH}>
                    {/* iterating from prop array called tableHeadingDataArr*/}
                    <tr className={classNameForThTr}>
                        {
                            tableHeadingDataArr.map(strItem => (
                                <th key={`thdr${uuidv4()}`} className={cn('border-b p-2 capitalize', classNameForTh)}>{strItem}</th>
                            ))
                        }
                    </tr>
                </thead>

                {/* table data */}
                <tbody className={classNameForTb}>
                    {
                        // iterating from the prop array called tableDataArr.
                        tableDataArr.map(userObj => (
                            <tr className={cn('odd:bg-[#e5e7eb] font-semibold', classNameForTr)} key={`tableDataArr${uuidv4()}`}>

                                {/* for image component */}
                                {
                                    Object.keys(userObj).map(objKey => (
                                        objKey === imgKeyStr && <td key={`objImgKey${uuidv4()}`} className={cn('border-b ps-1 py-2 md:px-2', classNameForTd)}>{
                                            <Image className='object-cover w-full h-[50px] md:w-[75px] md:h-auto' src={userObj[imgKeyStr]?.length > 0 ? userObj[imgKeyStr] : '/background-Images/noUser.png'} alt='user image' width={150} height={0} />
                                        }</td>
                                    ))
                                }

                                {/* if specified field is known after retriving from the server from the data array exp: usersArr or users which is an array of objects and from that object specified key name is know for specific field whose value is required for that perticular field. The following three fields are for that reason. */}
                                {
                                    fieldKeyStrOne?.length > 0 && <td key={`objKey${uuidv4()}`} className={cn(`border-b p-2 text-center ${!objKey.includes('email') && 'capitalize'}`, classNameForTd)}>{userObj[fieldKeyStrOne]}</td>
                                }

                                {
                                    fieldKeyStrTwo?.length > 0 && <td key={`objKey${uuidv4()}`} className={cn(`border-b p-2 text-center ${!objKey.includes('email') && 'capitalize'}`, classNameForTd)}>{userObj[fieldKeyStrTwo]}</td>
                                }

                                {
                                    fieldKeyStrThree?.length > 0 && <td key={`objKey${uuidv4()}`} className={cn(`border-b p-2 text-center ${!objKey.includes('email') && 'capitalize'}`, classNameForTd)}>{userObj[fieldKeyStrThree]}</td>
                                }

                                {/* if there are no required field then it will iterate through data array and populate the table cells of each table row. */}
                                {
                                    (!fieldKeyStrOne?.length > 0 || !fieldKeyStrTwo.length > 0 || !fieldKeyStrThree?.length > 0) && Object.keys(userObj).map(objKey => (
                                        objKey !== imgKeyStr && <td key={`objKey${uuidv4()}`} className={cn(`border-b p-2 text-center ${!objKey.includes('email') && 'capitalize'}`, classNameForTd)}>{userObj[objKey]}</td>
                                    ))
                                }

                                {/* button components for specifiq action. */}
                                {/* button one */}
                                {
                                    btnOne && <td className="border-b p-2 text-center">
                                        <button disabled={userObj[btnOneFieldKeyValue] === btnOneDisabledStr} onClick={btnFuncOne} className={classNameForBtnOne}>
                                            <span className='xl:hidden capitalize'>
                                                {
                                                    userObj[btnOneFieldKeyValue] !== btnOneDisabledStr && btnOneText && btnOneText.split(' ').length > 1 ? btnOneText.split(' ')[1] : btnOneText
                                                }

                                                {
                                                    userObj[btnOneFieldKeyValue] !== btnOneDisabledStr &&  !btnOneText && (btnOneIcon || 'No Icon Found')
                                                }

                                                {
                                                    userObj[btnOneFieldKeyValue] === btnOneDisabledStr && <TiTick />
                                                }
                                            </span>
                                            <span className='hidden xl:block capitalize'>
                                                {userObj[btnOneFieldKeyValue] === btnOneDisabledStr ? <TiTick /> : btnOneText || (btnOneIcon || 'No Icon Found')}
                                            </span>
                                        </button>
                                    </td>
                                }

                                {/* button two */}
                                {
                                    btnTwo && <td className="border-b p-2 text-center">
                                        <button disabled={userObj.role === 'dealer'} onClick={btnFuncTwo} className={classNameForBtnTwo}>
                                            <span className='xl:hidden capitalize'>
                                                {
                                                    userObj[btnTwoFieldKeyValue] !== btnTwoDisabledStr && btnTwoText && btnTwoText.split(' ').length > 1 ? btnTwoText.split(' ')[1] : btnTwoText
                                                }

                                                {
                                                    userObj[btnTwoFieldKeyValue] !== btnTwoDisabledStr && !btnTwoText && (btnTwoIcon || 'No Icon Found')
                                                }

                                                {
                                                    userObj[btnTwoFieldKeyValue] === btnTwoDisabledStr && <TiTick />
                                                }
                                            </span>
                                            <span className='hidden xl:block capitalize'>
                                                {userObj[btnTwoFieldKeyValue] === btnTwoDisabledStr ? <TiTick /> : btnTwoText || (btnTwoIcon || 'No Icon Found')}
                                            </span>
                                        </button>
                                    </td>
                                }

                                {/* button three */}
                                {
                                    delBtn && <td className="border-b p-2 text-center">
                                        <button onClick={btnThreeFunc} className={classNameForBtnThree}>
                                            <span className='xl:hidden capitalize'>
                                                {
                                                    btnThreeText && btnThreeText.split(' ').length > 1 ? btnThreeText.split(' ')[1] : btnThreeText
                                                }
                                                {
                                                    !btnThreeText && (btnThreeIcon || 'No Icon Found')
                                                }
                                            </span>
                                            <span className='hidden xl:block capitalize'>
                                                {btnThreeText || (btnThreeIcon || 'No Icon Found')}
                                            </span>
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    )
}

export default DashboardTableCompOne;