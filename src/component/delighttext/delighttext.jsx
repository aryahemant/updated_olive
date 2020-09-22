import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './delighttext.css';
// import { Route, withRouter } from "react-dom";

class Delighttext extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        
        let delighttext = (
        <div className="fl-100 delight-txt-card">
            {this.props.children}
        </div>
       );
       return <div>{delighttext}</div>;
    }
};
export default Delighttext;