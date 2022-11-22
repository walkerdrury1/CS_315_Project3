import React from "react";


const ServerCard = ({title, onClick}) => {
    return(
        <div onClick = {onClick} className="server-card-container">
            <h3 className="server-card-title">{title}</h3>
        </div>
    )
}


export default ServerCard