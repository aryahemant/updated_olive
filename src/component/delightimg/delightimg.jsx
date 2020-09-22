import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './delightimg.css';
// import { Route, withRouter } from "react-dom";

class Delightimg extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
        <div className="fl-100 delightimage">
            <img src={this.props.delightimage} />
        </div>
       );
    }
};
export default Delightimg;