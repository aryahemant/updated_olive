import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './whyolivecard.css';
// import { Route, withRouter } from "react-dom";


class Whyolivecard extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
        <div className="fl-100 whyolive-card">
          <div className="whyolive-img fl-100">
              <img src={this.props.whyoliveimg}/>
          </div>
          <div className="why-olive-desc fl-100">
              <p className="text-center">{this.props.whyolivedesc}</p>
          </div>
        </div>
        );
    }
};
export default Whyolivecard;
