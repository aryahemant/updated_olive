import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Checkbox,
} from "semantic-ui-react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  async componentDidMount() {
    const USER_TOKEN = localStorage.getItem("login");
    console.log("hemant", USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    // const headers = {
    //   // 'Content-Type': 'application/json',
    //   'Authorization':"Bearer "+localStorage.getItem("login")
    // }
    console.info("testiwng api");
    console.log("token", AuthStr);
    // const res = await axios.get(`https://www.oliveservicedapartments.com/olive_api/public/api/profile`, {headers: { Authorization: AuthStr }});
    const headers = {
      "Content-Type": "application/json",
      Authorization: AuthStr,
    };
    axios
      .get("https://www.oliveservicedapartments.com/olive_api/public/api/profile", {
        headers: { headers },
      })
      .then((res) => {
        console.info("result", res);
      });
    // console.log("profile data " , res.data);
    // this.setState({
    //   profile: res.data,
    // });
  }
  componentDidUpdate(prevProps, prevState) {
    const USER_TOKEN = localStorage.getItem("login");
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    const headers = {
      "Content-Type": "application/json",
      Authorization: AuthStr,
    };
    console.log("token".AuthStr);
  }
  update() {
    console.warn("state", this.state);
    fetch("https://www.oliveservicedapartments.com/olive_api/public/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("login"),
      },
      body: JSON.stringify(this.state),
    }).then((result) => {
      result.json().then((resp) => {
        console.log("test", resp.token);

        localStorage.setItem("login", JSON.stringify(resp.token));

        // if(this.state.login === this.tokenvalu){
        //   console.log('this is abc')
        // }
      });
    });

    //  alert("login called")
  }
  render() {
    return (
      <React.Fragment>
        {/* login */}
        <section className="pad-100 bg-grey">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="font-green font-cap mb-50">about you</h1>
              </div>
            </div>

            <Form className="registerform">
              <div className="row ">
                <div className="col-md-6">
                  <Form.Field>
                    <label>First Name*</label>
                    <input type="text" placeholder="First Name" />
                  </Form.Field>
                </div>
                <div className="col-md-6">
                  <Form.Field>
                    <label>Last Name*</label>
                    <input type="text" placeholder="Last Name" />
                  </Form.Field>
                </div>
                <div className="col-md-6">
                  <Form.Field>
                    <label>Email Address*</label>
                    <input type="email" placeholder="Email" />
                  </Form.Field>
                </div>

                <div className="col-md-6">
                  <Form.Field>
                    <label>Phone*</label>
                    <input type="number" placeholder="+919191919191" />
                  </Form.Field>
                </div>
                <div className="col-md-6">
                  <Form.Field>
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                  </Form.Field>
                </div>

                <div className="col-md-6">
                  <Form.Field>
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" />
                  </Form.Field>
                </div>

                <div className="col-md-6">
                  <Button className="listing-btn" onClick={() => this.update()}>
                    Save changes
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </section>

        {/* login end */}
      </React.Fragment>
    );
  }
}
export default withRouter(Profile);
