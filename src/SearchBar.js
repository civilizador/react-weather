import React from 'react';
import Table from './Table'
class SearchBar extends React.Component {
      state={ temperature: null, zipcode:'' }
      
      onFormSubmit=async (event)=>{
         event.preventDefault()
        let url=`https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&zipcode=10025&oneobservation=true&app_id=${process.env.REACT_APP_APP_ID}&app_code=${process.env.REACT_APP_APP_CODE}`

          let  data =  await{
                    zipcode: this.state.zipcode,
                    product: 'observation',
                    oneobservation: 'true',
                    app_id: process.env.REACT_APP_APP_ID,
                    app_code: process.env.REACT_APP_APP_CODE
                }
          this.props.getPositions(data)
      }
             render(){
                 let d = new Date(); const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return(<div>
                            <h2> {d.getDate()} {months[d.getMonth()]} </h2>
                                <div className="btn-group">
                                    <div type="button" className="btn btn-secondary onethird"> 
                                        <button id='F' onClick={ ()=>{this.props.changeSystem('imperial')} } className="btn btn-warning" data-toggle="button"> F </button>
                                        <button id='C' onClick={ ()=>{this.props.changeSystem('metric')} }  className="btn btn-warning"> C </button></div>
                                    <button type="button" className="btn btn-secondary onethird"><h1>  {this.props.temp} </h1> </button>
                                    <button type="button" className="btn btn-secondary onethird">
                                        <form onSubmit={this.onFormSubmit} >    
                                            <div className="input-group mb-3">
                                            <input type="numbers"  value={this.state.zipcode} maxLength="5" onChange={e => this.setState({zipcode: e.target.value.replace(/\D/g,'') }) } className="form-control" placeholder="zipcode" />
                                            <div className="input-group-append">
                                                <input className="btn btn-outline-warning" type="submit" id="button-addon2"/>
                                            </div>
                                            </div>  
                                        </form>
                                    </button>
                                </div>
                             <div>
                                <div className="col-md-12 col-sm-12">
                                    <img src={this.props.icon}/>
                                    <h2> It is {this.props.desc} in</h2> 
                                    <h2> {this.props.city} , {this.props.state}</h2>
                                </div>
                                <Table      humid   ={this.props.humid} sky     ={this.props.sky} 
                                            high    ={this.props.high}  low     ={this.props.low}
                                            wind    ={this.props.wind}  icon    ={this.props.icon}
                                            />
                                 </div>
                        </div>
                       
                    )
            }
            componentWillReceiveProps() {
                this.setState({temperature: (this.props.temp)*9/5  + 32 })
            }
        }

export default SearchBar;
 
            