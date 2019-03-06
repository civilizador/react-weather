import $ from 'jquery';
import keys from "./keys";
 
    async function getData(position) {
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
                this.setState({low: data_weather.observations.location[0].observation[0].lowTemperature});
                this.setState({high: data_weather.observations.location[0].observation[0].highTemperature});
                this.setState({system: 'imperial'});
             },
            (err) => { 
                 this.setState({errMessage: err.message});
             }
 export default getData();