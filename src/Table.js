import React from 'react';
    const Table = (props) => {
        return ( <div className='main_container'>
                    <div className='row weather_data'>
                        <div className='col-md-5 col-sm-5 ivory'>
                          <div className='float-left'><i className="fas fa-tint">Humidity:</i> </div>
                          <div className='float-right'>{props.humid}</div>
                        </div>
                        <div className='col-md-5 col-sm-5 ivory'>
                          <div className='float-left'><i className="fas fa-wind">Wind:</i></div>
                          <div className='float-right'>{props.wind}</div>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col-md-5 col-sm-5 ivory'>
                          <div className='float-left'><i className="fas fa-temperature-low">Lowest:</i> </div>
                          <div className='float-right'>{props.low}</div>
                        </div>
                        <div className='col-md-5 col-sm-5 ivory'>
                          <div className='float-left'><i className="fas fa-temperature-high">Highest:</i></div>
                          <div className='float-right'>{props.high}</div>
                        </div>
                    </div>
                  </div>
    )}
export default Table;