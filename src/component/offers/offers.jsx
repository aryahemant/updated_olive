import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './offers.css';
// import { Route, withRouter } from "react-dom";
// import {render} from "react-dom";

const offercardstyle = {
    backgroundImage:`url(${require('../../assets/list-block-bg.jpg')})`,
};
class Offers extends Component {
    componentDidMount() {
      window.scrollTo(0, 0);
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
           <div className="offer-card" style={offercardstyle}>
             <div className="offer-card-overlay">
                <h5 className="offer-card-heading">Early Check-In & Late Checkout</h5>
                <p className="offer-card-desc">simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                <button className="offer-card-btn" >View Offer</button>
             </div>
           </div>
        );
    }
};
export default Offers;
