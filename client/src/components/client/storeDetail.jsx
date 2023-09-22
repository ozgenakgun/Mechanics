import { useLocation } from "react-router-dom";
import sampleImg from '../../resource/storeSample.jpg';
import Calendar from '../calendar';
import Header from '../header';
import Analysis from '../analysis';
import NavBar from "../navBar";

const StoreDetail = ({url_head}) => {
    const { state } = useLocation();

    return (
<div className="store_detail_body">
    <Header title={"Mechanics"}/>
    <NavBar />

    <div className="store_detail_wrapper">
        <div className="store_detail_pic_and_info">
            <img src={ state.storeInfo.imgurl || sampleImg }  alt="" />
            <table  className="store_detail_info">
                <tbody>
                    <tr>
                        <td className='store_detail_label'>Store Name:</td>
                        <td>{state.storeInfo.name}</td>
                    </tr>
                    <tr>
                        <td className='store_detail_label'>Store Address:</td>
                        <td>{state.storeInfo.address}</td>
                    </tr>
                    <tr>
                        <td className='store_detail_label'>City:</td>
                        <td>{state.storeInfo.city}</td>
                    </tr>
                    <tr>
                        <td className='store_detail_label'>Postal Code:</td>
                        <td>{state.storeInfo.postalCode}</td>
                    </tr>
                    <tr>
                        <td className='store_detail_label'>Province:</td>
                        <td>{state.storeInfo.province}</td>
                    </tr>
                    <tr>
                        <td className='store_detail_label'>Phone Number:</td>
                        <td>{state.storeInfo.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td className='store_detail_label'>Service Scope:</td>
                        <td>{state.storeInfo.service.join(", ")}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Calendar user="client" urlhead={url_head} storeInfo={state.storeInfo} />

        <Analysis urlhead={url_head} email={state.storeInfo.email} />
        
    </div>
    
</div>);
}
 
export default StoreDetail;