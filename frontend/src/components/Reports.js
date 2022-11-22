import axios from "axios";
import React, { useEffect, useState } from "react";
import ExcessReport from "./ExcessReport";
import ManagerPage from "./ManagerPage";
import MFP from "./MFP";
import RestockReport from "./RestockReport";
import SalesReport from "./SalesReport";

const Reports = () => {
    const [activeIndex, setActiveIndex] = useState(0);

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
            return <MFP />
        } 
        else if(activeIndex === 1){
            return <RestockReport />   
        }
        else if(activeIndex === 2){
            return <ExcessReport />
        }
        else if(activeIndex === 0){
            return <SalesReport />
        }
        else {
            return <div>null</div>;
        }
    };

    return (
        <div>
            <ManagerPage />
            <div class='ui top attached tabular menu'>
                {displayTabList(report_list)}
            </div>

            <div class='ui bottom attached active tab segment'>
                {reportRouter()}
            </div>
        </div>
    );
};

export default Reports;
