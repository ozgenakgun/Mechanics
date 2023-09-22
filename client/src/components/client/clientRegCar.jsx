import React from 'react';

const ClientRegCar = ({info, updateFunc=f=>f, deleteFunc=f=>f}) => {

    return (
        <div className="cl_reg_page_vehicle_information">
            &nbsp; Vehicle Information - Please enter a vehicle
            <div className="cl_reg_page_input-box">
                <span className="cl_reg_page_details">Make*</span>
                <select name="make" onChange={(event) => updateFunc(
                        info.id,
                        event.target.value, 
                        info.model, 
                        info.year, 
                        info.mileage, 
                        info.transmission, 
                        info.drivetrain)}>
                    <option value=""> -- </option>
                    <option value="Toyota"> Toyota</option>
                    <option value="Audi"> Audi</option>
                    <option value="BMW"> BMW</option>
                    <option value="Mercedes"> Mercedes</option>
                    <option value="Kia"> Kia</option>
                    <option value="Others"> Others</option>
              </select>
            </div>
            <div className="cl_reg_page_input-box">
                <span className="cl_reg_page_details">Model</span>
                <select name="model" onChange={(event) => updateFunc(
                        info.id,
                        info.make, 
                        event.target.value, 
                        info.year, 
                        info.mileage, 
                        info.transmission, 
                        info.drivetrain)}>
                    <option value=""> -- </option>
                    <option value="Corolla"> Corolla</option>
                    <option value="Rav4"> Rav4</option>
                    <option value="4Runner"> 4Runner</option>
                    <option value="Auris"> Auris</option>
                    <option value="GR86"> GR86</option>
                    <option value="Others"> Others</option>
                </select>
            
            </div>
            <div className="cl_reg_page_input-box">
                <span className="cl_reg_page_details">Year</span>
                <input type="text" placeholder="2005" name='year'
                    onChange={(event) => updateFunc(
                        info.id,
                        info.make, 
                        info.model, 
                        event.target.value, 
                        info.mileage, 
                        info.transmission, 
                        info.drivetrain)} /> 
            </div>
            <div className="cl_reg_page_input-box">
                <span className="cl_reg_page_details">Mileage</span>
                <input type="text" placeholder="in km" name='mileage'
                    onChange={(event) => updateFunc(
                        info.id,
                        info.make, 
                        info.model,
                        info.year,
                        event.target.value, 
                        info.transmission, 
                        info.drivetrain)} /> 
            </div>
            <div className="cl_reg_page_input-box">
                <span className="cl_reg_page_details">Transmission</span>
                <select name="transmission" onChange={(event) => updateFunc(
                        info.id,
                        info.make, 
                        info.model,
                        info.year,
                        info.mileage, 
                        event.target.value, 
                        info.drivetrain)}>
                    <option value=""> -- </option>
                    <option value="Auto"> Auto</option>
                    <option value="Manual"> Manual</option>
                    <option value="Others"> Others</option>
                </select>
            
            </div>
            <div className="cl_reg_page_input-box">
                <span className="cl_reg_page_details">Drivetrain</span>
                <select name="drivetrain" onChange={(event) => updateFunc(
                        info.id,
                        info.make, 
                        info.model,
                        info.year,
                        info.mileage, 
                        info.transmission,
                        event.target.value)}>
                    <option value=""> -- </option>
                    <option value="4x2"> 4x2</option>
                    <option value="4x4"> 4x4</option>
                    <option value="Others"> Others</option>
                </select>
            
            </div>
            <div className="cl_reg_page_button">
                <input type="button" value="Delete this car" onClick={deleteFunc} /> 
            </div>
        </div>
    );
}
 
export default ClientRegCar;