import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registerpage.css";
import Registerform from '../registerform/registerform';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink, Redirect
} from "react-router-dom";


class Registerpage extends Component {
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
    window.scrollTo(0, 0);
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  render() {
    if(this.state.loggedIn === true){
      return <Redirect to="/profile"/>
    }
    return (
      
      <React.Fragment>
          {/* login */}
      <section className="pad-45 bg-grey register-section">
      <div className="container">
       <div className="row">
       
        <div className="offset-md-3 col-md-6 register-contain">
        <Registerform 
     submitname="register"
     rgstrstatus={this.props.rgstrstatus}
     />
        </div>
       </div>
  
      </div>
      </section>
      
     {/* login end */}
      </React.Fragment>
    );
  }
}
export default Registerpage;
