import React from "react";
import Analysis from "../analysis";
 
function StorePopup(props) {
    return (props.trigger) ? (
        <div className="admin_popup">
            <div className="admin_popup_inner">
                <button className="admin_popup_close" onClick={() => props.closePopup()}>X</button>
                <Analysis urlhead={props.urlhead} email={props.email} />
            </div>
        </div>
    ): "";
}

export default StorePopup;