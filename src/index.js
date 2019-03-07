import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import keys from "./config/keys";
import WeatherData from './WeatherData';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
const app_keys={ app_id: process.env.REACT_APP_APP_CODE,
                    app_code: process.env.REACT_APP_APP_ID}
console.log(typeof(process.env.REACT_APP_APP_CODE),app_keys)
    // defining main class component App
    class App extends React.Component {
    
    // initializing state 
        state = {
                lat:null, lng:null, cel:null, far:null, low:null, high:null,
                city:null, state:null, country:null, sky:null, desc:null, humid:null, wind:null,
                errMessage:null, icon:null, system:null
        }
    // 
      getPositions = async(data)=>{
         var data_weather = await $.ajax({
              url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'jsonpcallback',
              data,
                success: function (data) {
                    console.log(data)
                    return data;
                
                 }
            });
            
                this.setState({cel: data_weather.observations.location[0].observation[0].temperature });
                this.setState({far: (data_weather.observations.location[0].observation[0].temperature*9/5) + 32 });
                this.setState({humid: data_weather.observations.location[0].observation[0].humidity});
                this.setState({city: data_weather.observations.location[0].observation[0].city});
                this.setState({sky:  data_weather.observations.location[0].observation[0].skyDescription });
                this.setState({desc: data_weather.observations.location[0].observation[0].temperatureDesc });
                this.setState({country: data_weather.observations.location[0].observation[0].country});
                this.setState({state: data_weather.observations.location[0].observation[0].state});
                this.setState({icon: data_weather.observations.location[0].observation[0].iconLink });
                this.setState({wind: data_weather.observations.location[0].observation[0].windSpeed});
                this.setState({low: data_weather.observations.location[0].observation[0].lowTemperature});
                this.setState({high: data_weather.observations.location[0].observation[0].highTemperature});
                this.setState({system: 'imperial'});
    }
// Lifecycle methods 
    // ----------------------------------- 
    //      componentDidMount method
    // -----------------------------------
      
    // Method that deturmines what exactly to render depending on location sharing settings user choosed.
    renderContent() {
        if(this.state.errMessage && !this.state.lat) {
        // We have condiitonal rendering here. If there is an error and no coordinates was recieved render error related elements.
            return ( <Spinner message={this.state.errMessage}/>
            )
        }
        if(!this.state.errMessage && this.state.lat) {
            return  (
            <div>
                <div id="mainframeDiv">
                    <SearchBar  getPositions = {this.getPositions} temp={this.state.cel} /> 
                    <WeatherData   city    ={this.state.city} country ={this.state.country} state   ={this.state.state}  
                                    far     ={this.state.far}  
                                    desc    ={this.state.desc} humid   ={this.state.humid}  sky     ={this.state.sky} 
                                    high    ={this.state.high} low     ={this.state.low} wind    ={this.state.wind}
                                    icon    ={this.state.icon} system  ={this.state.system} />
                 </div>
            </div>
                )
                
        }
        return <Spinner message='Please allow location sharing in order app to work'/> 
    }
    
// React Render method
    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
            )
    } 
     componentDidMount() {
         
        // Getting User's current location information from window object and passing it as a  'position' object to callback function.
        window.navigator.geolocation.getCurrentPosition(
            async (position) => {
               let  data = await {
                    product: 'observation',
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    oneobservation: 'true',
                    app_id: app_keys.app_id,
                    app_code: app_keys.app_code
                }
                this.setState({lat: position.coords.latitude});
                this.setState({lng: position.coords.longitude});
           
            await this.getPositions(data)
               
             },
            (err) => { 
                 this.setState({errMessage: err.message});
             }
        )
    }
    // ----------------------------------- 
    //      End of componentDidMount
    // -----------------------------------
    
    // componentDidUpdate method will be called once component gets updates and being rerendered.    
    componentDidUpdate() {
     }
}
     
    
 
ReactDOM.render(<App />, document.getElementById('root'));

 
// zip: https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&zipcode=10025&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg