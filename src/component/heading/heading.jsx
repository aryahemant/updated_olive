import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './heading.css';
// import { Route, withRouter } from "react-dom";


class Heading extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
          <div className="row">
            <div className="col-lg-12 col-md-12 text-center">
              <h1 className="font-green mb-50 font-cap">{this.props.title}</h1>
            </div>
          </div>
        );
    }
};
export default Heading;
