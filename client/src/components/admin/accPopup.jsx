import React from "react";
 
function AccPopup(props) {
    return (props.trigger) ? (
        <div className="admin_popup">
            <div className="admin_popup_inner">
                <button className="admin_popup_close" onClick={() => props.closePopup()}>Close</button>
                {props.children}
            </div>
        </div>
    ): "";
}

export default AccPopup;