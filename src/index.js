import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import keys from "./config/keys";
 
 class App extends React.Component {
    constructor(props) {
        super(props);
        // Defining initial State
         this.state={
            lat:null,
            lng:null,
            cel:null,
            far:null,
            city:null,
            sky:null,
            humid: null,
            desc:null,
            country:null
        }
        // Getting User's current location information from window object and passing it as a  'position' object to callback function.
        window.navigator.geolocation.getCurrentPosition(
            async (position) => {
        // Making an API call to get weather data.
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
                    console.log(JSON.stringify(data.observations.location[0].observation[0]));
                     // console.log(JSON.stringify(data.observations.location[0].observation[0].humidity));
                     // console.log(JSON.stringify(data.observations.location[0].observation[0].iconLink));
                 }
            });
            console.log(data_weather.observations.location[0].observation[0])
            this.setState({lat: position.coords.latitude});
            this.setState({lng: position.coords.longitude});
            this.setState({cel: data_weather.observations.location[0].observation[0].temperature });
            this.setState({far: (data_weather.observations.location[0].observation[0].temperature*9/5) + 32 });
            this.setState({city: position.coords.latitude});
            this.setState( {sky: JSON.stringify(data_weather.observations.location[0].observation[0].skyDescription) });
            this.setState({desc: JSON.stringify(data_weather.observations.location[0].observation[0].temperatureDesc) });
            this.setState({country: position.coords.longitude});
             },
            (err) => { console.log(err); alert('Please select city manualy or change location permissions') }
        )
    }
    render() {
        return (
            <div>
                <h2> Latitude: {this.state.lat} </h2>
                 <h2> Latitude: {this.state.lng} </h2>
                <h2> Temp C: {this.state.cel} </h2>
                <h2> Temp F: {this.state.far} </h2>
                <h2> Sky: {this.state.sky} </h2>
                <h2> Weather status: {this.state.desc} </h2>
            </div>
            )
    } 
}
     
    
 
ReactDOM.render(<App />, document.getElementById('root'));

 
