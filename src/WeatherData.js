import React from 'react';
import Table from './Table'

const WeatherData = (props) => {
     return (
        <div>
            <div id="mainframeDiv">
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button id='F' type="button" className="btn btn-secondary">F</button>
                  <button id='C' type="button" className="btn btn-secondary">C</button>
                </div>
                    <div className="col-md-12 col-sm-12">
                        <h1>  {props.system == 'imperial' ? 'Temp F:' + props.far : 'Temp C:' + props.cel} </h1>
                        <img src={props.icon}/>
                        <h2> It is {props.desc} in</h2> 
                        <h2> {props.city} , {props.state}</h2>
                    </div>
                    <Table      humid   ={props.humid} 
                                sky     ={props.sky} 
                                high    ={props.high}
                                low     ={props.low}
                                wind    ={props.wind}
                                icon    ={props.icon}
                                />
            </div>
            
        </div>
 
        );
}
export default WeatherData;