import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import keys from "./config/keys";
import WeatherData from './WeatherData'
 
    // defining main class component App
    class App extends React.Component {
    
    // Method 1 of initializing state - No consructor function!
        state = {
                lat:null, lng:null,
                cel:null, far:null,
                city:null, state:null, country:null,
                sky:null, desc:null, humid:null, wind:null,
                errMessage:null, icon:null
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
        // componentDidMount method will be called once component is initilay rendered.
        // In this particular case, once App component did render we will get users
        // geoLocation data and then perfrm api call to get appropriate weather data
    componentDidMount() {
        console.log('Component was mounted successfully');
        // Getting User's current location information from window object and passing it as a  'position' object to callback function.
        window.navigator.geolocation.getCurrentPosition(
            async (position) => {
        // Making an API call to get weather data and saving result to data_weather variable.
              let data_weather = await $.ajax({
              url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'jsonpcallback',
              data: {
                    product: 'observation',
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    oneobservation: 'true',
                    app_id: keys.app_id,
                    app_code: keys.app_code
                },
                success: function (data) {
                    return data;
                 }
            });
            console.log(data_weather.observations.location[0].observation[0])
            // Updating states with setState
                this.setState({lat: position.coords.latitude});
                this.setState({lng: position.coords.longitude});
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
             },
            (err) => { 
                 this.setState({errMessage: err.message});
             }
        )
    }
    // ----------------------------------- 
    //      End of componentDidMount
    // -----------------------------------
    
    
    // ----------------------------------- 
    //      Start of componentDidUpdate
    // -----------------------------------
        // componentDidUpdate method will be called once component gets updates and being rerendered.    
    componentDidUpdate() {
        console.log('Component was UPDATED with weather data or was denied to provide it successfully')        
    }
    // ----------------------------------- 
    //      End of componentDidUpdate
    // -----------------------------------
    
    
// React Render method
        // rendering html elements using JSX. 
    render() {
        if(this.state.errMessage && !this.state.lat) {
        // We have condiitonal rendering here. If there is an error and no coordinates was recieved render error related elements.
            return (
                    <div>
                        <h2> Following Error Occured:  </h2>
                        <h2> {this.state.errMessage}  </h2>
                        <h2> Please reset Location sharing settings or follow the link to know how: </h2>
                            <h4> <a href='https://superuser.com/questions/591758/how-do-i-make-chrome-forget-a-no-to-geolocation-on-a-site'> Reset Refused location sharing permission on Chrome</a>  </h4>
                        
                    </div>
            )
        }
        if(!this.state.errMessage && this.state.lat) {
            return  <WeatherData city   ={this.state.city}
                                lng     ={this.state.lng}
                                lat     ={this.state.lat}  
                                state   ={this.state.state}  
                                far     ={this.state.far} 
                                humid   ={this.state.humid} 
                                sky     ={this.state.sky} 
                                desc    ={this.state.desc}
                                country ={this.state.country}
                                cel     ={this.state.cel}
                                wind    ={this.state.wind}
                                icon    ={this.speed.icon} />
        }
        return (
            <div> 
                <h2> loading . . . </h2>
            </div>
                
            )
    } 
}
     
    
 
ReactDOM.render(<App />, document.getElementById('root'));

 
