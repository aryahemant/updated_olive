import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './olivefeature.css';
// import { Route, withRouter } from "react-dom";


class Olivefeature extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
       <div className="feature-card text-center fl-100">
            <div className="fl-100 ">
                <img src={this.props.featureimg} />
            </div>
            <div className="fl-100">
                <h1 className="font-white olive-feaure-heading">{this.props.olivefeature}</h1>
                <p className="feature-card-text">{this.props.olivefeature_desc} </p>
            </div>
        </div>
        );
    }
};
export default Olivefeature;
