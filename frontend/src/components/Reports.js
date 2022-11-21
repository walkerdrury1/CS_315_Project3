import axios from "axios";
import React, { useEffect, useState } from "react";
import ManagerPage from "./ManagerPage";
import Date from "./Date";

const Reports = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mfp, setmfp] = useState(null);
    const [waiting, setWaiting] = useState(true);

    const mfpAPI = async () => {
        const frequent_list = await axios.post(
            "https://tyson-express.onrender.com/get-pairs",
            { startDate: "1/1/1000", endDate: "3/3/3000" }
        );
        setmfp(frequent_list.data);
        return;
    };

    useEffect(() => {
        setWaiting(true);
        mfpAPI();
        setWaiting(false);
    }, []);
    const displayTabList = (list) => {
        return list.map((item, index) => {
            return (
                <div
                    onClick={() => setActiveIndex(index)}
                    className={`${
                        activeIndex === index ? "active" : null
                    } item`}
                >
                    <button className='ui button'>{item}</button>
                </div>
            );
        });
    };
    const report_list = [
        "Sales Report",
        "Restock Report",
        "Excess Report",
        "Most sold together",
    ];

    const reportRouter = () => {
        if (activeIndex === 3) {
            const displayBody = () => {
                console.log(mfp);
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
            };

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
        } else {
            return <div>null</div>;
        }
    };
    if (waiting) {
        return (
            <div className='ui active dimmer'>
                <div className='ui text loader'>Loading...</div>
            </div>
        );
    } else {
        return (
            <div>
                <ManagerPage />
                <br />
                <div className='to-center'>
                    {" "}
                    <Date label='from' />
                    <Date label='to' />
                </div>
                <br />
                <div className="to-center">
                    {" "}
                    <button className='blue ui button'>Submit</button>
                </div>
                <div class='ui top attached tabular menu'>
                    {displayTabList(report_list)}
                </div>

                <div class='ui bottom attached active tab segment'>
                    {reportRouter()}
                </div>
            </div>
        );
    }
};

export default Reports;
