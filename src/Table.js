import React from 'react';
    const Table = (props) => {
        return ( <div className='table'>
                            <div className='col-md-8 inline' >
                                <table className="ui very basic collapsing celled table">
                                  <tbody>
                                    <tr>
                                        <td>
                                            <div className="ui image header">
                                              <i className="fas fa-tint"></i>
                                                <div className="content">
                                                       <h2> Humidity:  </h2>
                                                </div>
                                            </div></td>
                                            <td>
                                              <h2>{props.humid}</h2>
                                        </td>
                                        <td>
                                            <div className="ui image header">
                                              <i className="fas fa-tint"></i>
                                                <div className="content">
                                                       <h2> Wind:  </h2>
                                                </div>
                                            </div>
                                        </td>
                                            <td>
                                                <h2>{props.wind}</h2>
                                            </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="ui image header">
                                              <i className="fas fa-temperature-low"></i>
                                                <div className="content">
                                                       <h2> Lowest Temp:  </h2>
                                                </div>
                                            </div></td>
                                            <td>
                                              <h2>{props.low}</h2>
                                        </td>
                                        <td>
                                            <div className="ui image header">
                                              <i className="fas fa-temperature-high"></i>
                                                <div className="content">
                                                       <h2> Highest Temp:  </h2>
                                                </div>
                                            </div>
                                        </td>
                                            <td>
                                                <h2>{props.high}</h2>
                                            </td>
                                    </tr>
                                  </tbody>
                                </table>
                            </div>
                            
                        </div>    
    )}
export default Table;