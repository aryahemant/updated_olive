import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mobheader.css';
import {Navbar,Nav,NavDropdown,Button,Form,FormControl} from 'react-bootstrap';
// import { Route, withRouter } from "react-dom";
import {render} from "react-dom";


class Mobheader extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
            <div className="mobile-head-container container-fluid">
              <div className="row">
                <div className="fl-100 text-center pad-10">
                  <img className="brand-logo" src={require('../../assets/olive-logo.png')} />
                </div>
               </div>
               
            </div>
            
           
          
          

        );
    }
};
export default Mobheader;
