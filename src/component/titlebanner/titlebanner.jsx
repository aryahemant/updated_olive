import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './titlebanner.css';
import Carousel from 'react-bootstrap/Carousel'
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Route, withRouter } from "react-dom";

class Titlebanner extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
           <div className=" titlebanner mb-50">
                <img  src={require('../../assets/apartmentdetails/IMG_Banner.jpg')} alt="First slide"/>
           </div>
           
            
           
           
        );
    }
};
export default Titlebanner;