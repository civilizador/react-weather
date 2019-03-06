import React from 'react';

  class SearchBar extends React.Component {
            
            render(){
                 let d = new Date(); const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                return(
                        <div class="btn-group">
                            <div type="button" class="btn btn-secondary onethird"> 
                                <button id='F'  className="btn btn-secondary"> F </button>
                                <button id='C'   className="btn btn-secondary"> C </button></div>
                            <button type="button" className="btn btn-secondary onethird"> <h2>{d.getDate()} {months[d.getMonth()]}</h2></button>
                            <button type="button" className="btn btn-secondary onethird">
                                <div className="input-group mb-3">
                                    <input  className="form-control" placeholder="zipcode" />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-warning" type="button" id="button-addon2">Button</button>
                                    </div>
                                </div>  
                            </button>
                        </div>
                       
                    )
            }
        }

export default SearchBar;
 
            