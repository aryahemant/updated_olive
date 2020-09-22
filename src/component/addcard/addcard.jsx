import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addcard.css';
import Carousel from 'react-bootstrap/Carousel'
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Route, withRouter } from "react-dom";

class Addcard extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
            <div className="fl-100 add-card">
                    <img  className="d-block w-100"  src={this.props.addImg} alt="First slide"/>
                    <div className="add-text">
                        <p className="fw-700 font-white add-title">{this.props.addTitle}</p>
                        <p className="add-desc font-white">{this.props.addDesc}</p>
                    </div>
                    
            </div>
        );
    }
};
export default Addcard;