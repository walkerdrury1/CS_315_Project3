import React, { useEffect, useState } from "react";
import Date from "./Date";
import axios from "axios";

const MFP = () => {
    const [waiting, setWaiting] = useState(false);
    const [list, setList] = useState(null);
    const [showList, setShowList] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    /*
    if (mfp === null) {
                    return null;
                }
                return mfp.map((item) => {
                    return (
                        <tr>
                            <td>
                                <div className='to-center'>{item[0]}</div>
                            </td>
                            <td>
                                <div className='to-center'>{item[1]}</div>
                            </td>
                            <td>
                                <div className='to-center'>{item[2]}</div>
                            </td>
                        </tr>
                    );
                });
        */

    const callApi = async () => {
        const frequent_list = await axios.post(
            "https://tyson-express.onrender.com/get-pairs",
            { startDate: fromDate, endDate: toDate }
        );
        setList(frequent_list.data);
        console.log(frequent_list.data);
    };
    const displayBody = () => {
        if (list === null || list.length === 0) {
            return (
                <div className='loading-container'>
                    <div className='ui active dimmer'>
                        <div className='ui text loader'>Loading...</div>
                    </div>
                </div>
            );
        } else {
            return list.map((item) => {
                return (
                    <tr>
                        <td>
                            <div className='to-center'>{item[0]}</div>
                        </td>
                        <td>
                            <div className='to-center'>{item[1]}</div>
                        </td>
                        <td>
                            <div className='to-center'>{item[2]}</div>
                        </td>
                    </tr>
                );
            });
        }
    };

    const submit = () => {
        setWaiting(true);
        callApi();
        setWaiting(false);
        setShowList(true);
    };
    if (waiting) {
        return (
            <div className='loading-container'>
                <div className='ui active dimmer'>
                    <div className='ui text loader'>Loading...</div>
                </div>
            </div>
        );
    } else if (!showList) {
        return (
            <div>
                <div className='to-center'>
                    <Date label='from' toSet={setFromDate} />
                    <Date label='to' toSet={setToDate} />
                </div>
                <br />
                <div className='to-center'>
                    {" "}
                    <div className='red ui button' onClick={submit}>
                        Submit
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <table class='ui celled table'>
                    <thead>
                        <tr>
                            <th className='five wide'>
                                <div className='to-center'>Item 1</div>
                            </th>
                            <th className='five wide'>
                                <div className='to-center'>Item 2</div>
                            </th>
                            <th className='five wide'>
                                <div className='to-center'>Amount sold</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{displayBody()}</tbody>
                </table>
            </div>
        );
    }
};

export default MFP;
