import React from 'react';
const WeatherData = (props) => {
    return (
                <div>
                    <h2> City: {props.city} </h2>
                    <h2> State: {props.state} </h2>
                    <h2> Latitude: {props.lat} </h2>
                    <h2> Latitude: {props.lng} </h2>
                    <h2> Temp C: {props.cel} </h2>
                    <h2> Temp F: {props.far} </h2>
                    <h2> Humidity: {props.humid} </h2>
                    <h2> Sky: {props.sky} </h2>
                    <h2> Weather status: {props.desc} </h2>
    
                </div>
        );
}
export default WeatherData;