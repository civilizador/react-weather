import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
var data_weather;
 
    // defining main class component App
    class App extends React.Component {
    
    // initializing states 
        state = {
                lat:null, lng:null, cel:null, far:null, low:null, high:null,
                city:null, state:null, country:null, sky:null, desc:null, humid:null, wind:null,
                errMessage:null, icon:null, system:null, average_temp:null,high_cel:null, low_cel:null
        }
    // api call to get weather data. data object that we passing to call contains parametr depending if we search by zip code or by location
      getPositions = async(data)=>{
          data_weather = await $.ajax({
              url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'jsonpcallback',
              data,
                success: function (data) {
                    return data;
                 }
            });
            // setting states after data recieved.
                this.setState({average_temp:Math.round((data_weather.observations.location[0].observation[0].temperature*9/5) + 32) });
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
                this.setState({low: (data_weather.observations.location[0].observation[0].lowTemperature*9/5) + 32});
                this.setState({low_cel: data_weather.observations.location[0].observation[0].lowTemperature});
                this.setState({high: (data_weather.observations.location[0].observation[0].highTemperature*9/5) + 32});
                this.setState({high_cel: data_weather.observations.location[0].observation[0].highTemperature});
                this.setState({system: 'imperial'});
    }
    // dunction that changes displayed values depending on metric or imperial system was chosen. 
        changeSystem = (choise) => {
            if (choise==='imperial'){
                this.setState({low: Math.round((this.state.low_cel*9/5) + 32) });
                this.setState({high: (this.state.high_cel*9/5) + 32});
                this.setState({average_temp: Math.round((this.state.cel*9/5) + 32) });
            }
            if (choise==='metric'){
                this.setState({low:this.state.low_cel});
                this.setState({high:this.state.high_cel});
                this.setState({average_temp:this.state.cel});
            }
        }
// Lifecycle methods 
    // ----------------------------------- 
    //      componentDidMount method
    // -----------------------------------
      
    // Method that determines what exactly to render depending on location sharing settings user choosed.
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
                    <SearchBar  getPositions = {this.getPositions} changeSystem = {this.changeSystem} temp={this.state.average_temp} city    ={this.state.city} country ={this.state.country} state   ={this.state.state}  
                                    far     ={this.state.far}  
                                    desc    ={this.state.desc} humid   ={this.state.humid}  sky     ={this.state.sky} 
                                    high    ={this.state.high} low     ={this.state.low} wind    ={this.state.wind}
                                    icon    ={this.state.icon} system  ={this.state.system} everything={this.state} /> 
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
                    app_id: process.env.REACT_APP_APP_ID,
                    app_code: process.env.REACT_APP_APP_CODE
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

 
 