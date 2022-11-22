import React, {useState} from 'react'
import axios from 'axios';
import Datee from './Date';



const SalesReport = () => {
    const [showList, setShowList] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [list, setList] = useState(null);

    const callApi = async () => {
        const day = startDate.date();
        const month = startDate.month() + 1;
        const year = startDate.year();
        const temp = await axios.get(
            "https://tyson-express.onrender.com/transaction-history/" +
                `${month}-${day}-${year}`
        );
        setList(temp.data);
        console.log(temp.data);
    };

    const submit = () => {
        setWaiting(true);
        callApi();
        setWaiting(false);
        setShowList(true);
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
                            <div className='to-center'>{item.name}</div>
                        </td>
                        <td>
                            <div className='to-center'>
                                {item.amountordered}
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
    } else if (!showList) {
        return (
            <div>
                <h3 className='to-center'>Enter a Date</h3>
                <div className='to-center'>
                    <Datee label='Date' toSet={setStartDate} />
                </div>
                <div className='to-center'>
                    <button className='ui red button' onClick={submit}>
                        Get Sales Report
                    </button>
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
                                <div className='to-center'>Item Name</div>
                            </th>
                            <th className='three wide'>
                                {" "}
                                <div className='to-center'>Amount Ordered</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{displayBody()}</tbody>
                </table>
            </div>
        );
    }}


export default SalesReport;