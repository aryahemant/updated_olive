import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginpage.css";
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import Loginform from "../loginform/loginform";
import history from '../../lib/history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink, Redirect
} from "react-router-dom";
import { Form, Input, TextArea, Button, Select, Checkbox } from "semantic-ui-react";
// import Form from "react-bootstrap/Form";

// import { Route, withRouter } from "react-dom";

class Loginpage extends Component {
  constructor(props, context) {
    super(props);
    let loggedIn = false
    if(localStorage.getItem('login')){
     loggedIn = true
    }
    this.state = {
      loggedIn,
    
    };
    
  }
  componentDidMount() {
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }


  render() {
    if (this.state.loggedIn===true && this.props.lgnstatus===true) {
      history.push
      ((`/${localStorage.getItem("cityName")}/${localStorage.getItem("apartmenttitle").toLowerCase()}/checkout`));
    }

    if(this.state.loggedIn === true){
      return <Redirect to="/"/>
    }
    return (
      <React.Fragment>
         {/* login */}
         <section className="pad-100 bg-grey login-section">
          <div className="container ">
            <div className="offset-md-3 col-md-6 col-12 login-container">
              <Loginform 
              loginname="Login"
              lgnstatus={this.props.lgnstatus}
              />
            </div>
          </div>
        </section>

        {/* login end */}
      </React.Fragment>
    );
  }
}
export default Loginpage;
