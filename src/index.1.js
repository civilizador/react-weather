import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import keys from "./config/keys";
import WeatherData from './WeatherData';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
let latitude;
let longitude;
let data_weather;
    // defining main class component App
    class App extends React.Component {
    
    // Method 1 of initializing state - No consructor function!
        state = {
                cel:null, far:null, low:null, high:null,
                city:null, state:null, country:null, sky:null, desc:null, humid:null, wind:null,
                errMessage:null, icon:null, system:null
        }
    // Method 2 of initializing state - With constructor function!
        // constructor(props) {
        //     super(props);
        //     // Initializing State. 
        //      this.state={
        //         lat:null,lng:null,cel:null,far:null,city:null,sky:null,humid: null, desc:null,country:null,state: null, errMessage:null,
        //     }
        // }
        
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
                    <SearchBar temp={this.state.cel} /> 
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
              (position) => {
                 latitude =   position.coords.latitude;
                 longitude =   position.coords.latitude;
                  fetchData(latitude,longitude)
        // Making an API call to get weather data and saving result to data_weather variable.
             },
            (err) => { 
                 this.setState({errMessage: err.message});
             }
        )
          
        async function fetchData(latitude,longitude){
             data_weather = await $.ajax({
              url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'jsonpcallback',
              data: {
                    product: 'observation',
                    latitude: latitude,
                    longitude: longitude,
                    oneobservation: 'true',
                    app_id: keys.app_id,
                    app_code: keys.app_code
                },
                success: function (data) {
                    return data;
                 }
            });
            // Updating states with setState
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