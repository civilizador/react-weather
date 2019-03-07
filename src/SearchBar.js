import React from 'react';
// import keys from "./config/keys";
  class SearchBar extends React.Component {
      state={ temperature: null, zipcode:'' }
      
      onFormSubmit=async (event)=>{
         event.preventDefault()
          let  data =  await{
                    zipcode: this.state.zipcode,
                    product: 'observation',
                    oneobservation: 'true',
                    app_id: process.env.REACT_APP_APP_CODE,
                    app_code: process.env.REACT_APP_APP_ID
                }
          this.props.getPositions(data)
      }
             render(){
                 let d = new Date(); const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return(<div>
                    <h2> {d.getDate()} {months[d.getMonth()]} </h2>
                        <div className="btn-group">
                            <div type="button" className="btn btn-secondary onethird"> 
                                <button id='F' onClick={ ()=>{ this.setState({temperature: (this.props.temp)*9/5  + 32 })} } className="btn btn-warning" data-toggle="button"> F </button>
                                <button id='C' onClick={ ()=>{ this.setState({temperature:  this.props.temp})} }  className="btn btn-warning"> C </button></div>
                            <button type="button" className="btn btn-secondary onethird"><h1>  {this.state.temperature} </h1> </button>
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
                        </div>
                       
                    )
            }
            componentWillReceiveProps() {
                this.setState({temperature: (this.props.temp)*9/5  + 32 })
            }
        }

export default SearchBar;
 
            