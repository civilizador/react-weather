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
            city:null
        }
        // Getting User's current location information from window object.
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                
                $.ajax({
              url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'jsonpcallback',
              data: {
                    product: 'observation',
                    latitude: 40.4093,
                    longitude: 49.8671,
                    oneobservation: 'true',
                    app_id: keys.app_id,
                    app_code: keys.app_code
                },
                success: function (data) {
                    console.log(JSON.stringify(data.observations.location[0].observation[0]));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].skyDescription));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].humidity));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].temperatureDesc));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].iconLink));
                    console.log(data.observations.location[0].observation[0].temperature);
                    console.log( (data.observations.location[0].observation[0].temperature*9/5) + 32 );
                }
            });
            this.setState({lat: position.coords.latitude})

                console.log(position.coords.latitude, position.coords.longitude )
            },
            (err) => { console.log(err); alert('Please select city manualy or change location permissions') }
        )
    }
    render() {
        return (
            <div>
                <h2> Latitude: {this.state.lat} </h2>
                <h2> Temp C: </h2>
                <h2> Temp F: </h2>
                <h2> Sky: </h2>
                <h2> Weather status: </h2>
            </div>
            )
    } 
}
    $.ajax({
              url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
              type: 'GET',
              dataType: 'jsonp',
              jsonp: 'jsonpcallback',
              data: {
                    product: 'observation',
                    latitude: 40.4093,
                    longitude: 49.8671,
                    oneobservation: 'true',
                    app_id: 'lLg8lP3cuRb0KFN4aUVR',
                    app_code: 'MgkUAlU8bwpPAAKhm3ZXyw'
                },
                success: function (data) {
                    console.log(JSON.stringify(data.observations.location[0].observation[0]));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].skyDescription));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].humidity));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].temperatureDesc));
                    console.log(JSON.stringify(data.observations.location[0].observation[0].iconLink));
                    console.log(data.observations.location[0].observation[0].temperature);
                    console.log( (data.observations.location[0].observation[0].temperature*9/5) + 32 );
                }
            });
    
 
ReactDOM.render(<App />, document.getElementById('root'));

 
