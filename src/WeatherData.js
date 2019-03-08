import React from 'react';
import Table from './Table'

const WeatherData = (props) => {
     return (
        <div>
                    <div className="col-md-12 col-sm-12">
                        <img src={props.state.icon}/>
                        <h2> It is {props.state.desc} in</h2> 
                        <h2> {props.state.city} , {props.state.state}</h2>
                    </div>
        </div>
 
        );
}
export default WeatherData;