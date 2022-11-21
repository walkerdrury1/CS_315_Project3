import React, { useEffect, useState } from "react";
import axios from "axios";

const RestockReport = () => {
    const [list, setList] = useState(null);
    const [waiting, setWaiting] = useState(false);

    const callApi = async () => {
        const temp = await axios.get(
            "https://tyson-express.onrender.com/restock-report"
        );
        setList(temp.data);
        console.log(temp.data);
    };

    useEffect(() => {
        setWaiting(true);
        callApi();
        setWaiting(false);
    }, []);

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
                            <div className='to-center'>{item.itemname}</div>
                        </td>
                        <td>
                            <div className='to-center'>
                                {item.totalquantity}
                            </div>
                        </td>
                        <td>
                            <div className='to-center'>
                                {item.minimumamount}
                            </div>
                        </td>
                    </tr>
                );
            });
        }
    };

    if (waiting) {
        return (
            <div className='loading-container'>
                <div className='ui active dimmer'>
                    <div className='ui text loader'>Loading...</div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <table class='ui celled table'>
                    <thead>
                        <tr>
                            <th className='three wide'>
                                {" "}
                                <div className='to-center'>Name</div>
                            </th>
                            <th className='three wide'>
                                {" "}
                                <div className='to-center'>Amount</div>
                            </th>
                            <th className='three wide'>
                                {" "}
                                <div className='to-center'>Minimum Amount</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{displayBody()}</tbody>
                </table>
            </div>
        );
    }
};

export default RestockReport;
