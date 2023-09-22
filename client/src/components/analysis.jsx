import { useEffect, useState } from 'react';
import axios from "axios";
import {CanvasJSChart} from 'canvasjs-react-charts'

const Analysis = ({urlhead, email}) => {

    const [appoint, setAppoint] = useState([]);
    const rejection = appoint.filter(x => x.cancelledByStore===true).length;
    const historical = appoint.filter(x => x.apptStatus==="Completed" || x.apptStatus==="In-Progress");

    // read appointments data
    useEffect(() => {
        const url = `${urlhead}/appoint/store/${email}`;
        axios
        .get(url)
        .then(res => {
            setAppoint(res.data);
        })
    }, [urlhead, email]);

    // service aggregation
    const allservices = ["Oil Change", "Brake", "Batteries & Electrical", "Cooling System", "Exhaust System", "Scheduled", 
                        "Maintenance", "3D Wheel Alignment", "Tires", "Heating & A/C", "Used Car Inspection", "Car Detailing", "Others"];
    var servicedata = allservices.map((x,i) => ({
        label: x,
        y: 0
    }));
    historical.forEach(x => {
        let theService_list = servicedata.filter(s => s.label === x.problemCate);
        if (theService_list.length !== 0) {
            let theService = theService_list[0];
            let oldvalue = theService.y;
            theService.y = oldvalue + 1;
            servicedata = servicedata.map(s => s.label===x.problemCate? theService : s);
        }
    })
    const options = {
        theme: "light2",
		title:{
			text: "Service Percentage"
		},	
        data: [{
            type: "pie",
			showInLegend: true,
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: servicedata
        }]
    }

    return ( <div className="store_detail_analysis">

    <div className="store_detail_analysis_left">
        <table>
            <tbody>
                <tr>
                    <td>Number of historical orders:</td>
                    <td>{historical.length}</td>
                </tr>
                <tr>
                    <td>Appointment Rejection Rate:</td>
                    <td>{appoint.length === 0? "0.00%":`${(rejection/appoint.length*100).toFixed(2)}%`}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className="store_detail_analysis_mid">
        <CanvasJSChart options = {options} />
    </div>
    {/* <div className="store_detail_analysis_right">
        
    </div> */}

</div> );
}
 
export default Analysis;