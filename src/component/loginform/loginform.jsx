import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginform.css";
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Checkbox,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// import Form from "react-bootstrap/Form";
import { PostData } from "../service/postData.js";
import moment from "moment";
import axios from "axios";
import history from "../../lib/history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
// import { Route, withRouter } from "react-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class Loginform extends Component {
  constructor(props) {
    super(props);
    const registertoken = localStorage.getItem("login");
    let registered = true;
    let loggedIn = false;
    if (registertoken == null) {
      registered = false;
    }
    this.state = {
      userDetail: [],
      loggedIn,
      registered,
      msgshow: "",
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  login() {
    console.warn("state", this.state);
    if (this.state.email == "" || this.state.password == "") {
      this.setState({
        msgshow: "Please enter Email and Password",
      });
      return false;
    }
    fetch(
      "https://www.oliveservicedapartments.com/olive_api/public/api/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      }
    ).then((result) => {
      result.json().then((resp) => {
        console.log("msg", resp.error);

        // console.log(this.state.loggedIn)

        if (resp.error) {
          console.info("msg print");
          this.setState({
            loggedIn: false,
            msgshow: resp.error,
          });
        }

        if (resp.token) {
          localStorage.setItem("login", JSON.stringify(resp.token));
          localStorage.setItem("loginstatus", "true");
          console.info("user data", resp.data);
          localStorage.setItem("userDetail", JSON.stringify(resp.data));
          this.setState({
            userDetail: resp.data,
          });

          if (this.props.from == "checkoutpag") {
            this.handleBookingApi();
            this.props.history.push(
              `/${localStorage.getItem("cityName")}/${localStorage
                .getItem("apartmenttitle")
                .toLowerCase()}/thankyou`
            );
          }
          this.setState({
            loggedIn: true,
          });

          // alert('You have succesfully loggedIn')
        } else {
          console.log("else part", resp);
        }
        console.log("login status", this.state.loggedIn);
        // if(this.state.login === this.tokenvalu){
        //   console.log('this is abc')
        // }
        console.log("user detail1", this.state.userDetail);
        localStorage.removeItem("amenities_list");
        localStorage.removeItem("amenityDetail");
        localStorage.removeItem("amenityPrice");
        localStorage.removeItem("discountId");
      });
    });
    //  alert("login called")
  }
  handleBookingApi = () => {
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    let extraamities;
    if (localStorage.getItem("amenities_list") == null) {
      extraamities = 0;
    } else {
      extraamities = localStorage.getItem("amenities_list").split(",");
    }
    axios({
      method: "post",
      url: "http://34.93.89.207/olive_api/public/api/booking",
      data: {
        first_name: this.state.userDetail.first_name,
        last_name: this.state.userDetail.last_name,
        email: this.state.userDetail.email,
        phone: this.state.userDetail.phone,
        property_id: localStorage.getItem("property_id"),
        roomtype_id: localStorage.getItem("roomType_id"),
        property_type: localStorage.getItem("apartmentTitle"),
        check_in: moment(localStorage.getItem("startDate")).format(
          "YYYY-MM-DD"
        ),
        check_out: moment(localStorage.getItem("endDate")).format("YYYY-MM-DD"),
        guest: localStorage.getItem("noGuest"),
        coupon_id: localStorage.getItem("discountId"),
        extra_amenities: extraamities,
        price_type: localStorage.getItem("price_type"),
      },
      headers: { Authorization: AuthStr },
    })
      .then((response) => {
        //handle success
        localStorage.setItem("bookingResponse", response.data);
        localStorage.setItem("bookingid", response.data.booking.id);
      })
      .catch(function (response) {
        //handle error
        console.log("Error while calling api", response);
      });
  };

  render() {
    console.log("checking status for login", this.props.lgnstatus);
    if (this.state.loggedIn === true && this.props.lgnstatus === true) {
      localStorage.getItem("single") === "1" ?
      history.push(
        `/${localStorage
          .getItem("cityName")
          .toLowerCase()}/h/${localStorage
          .getItem("listing_slug")
          .toLowerCase()}/checkout`
      )
      :
      history.push(
        `/${localStorage
          .getItem("cityName")
          .toLowerCase()}/${localStorage
          .getItem("listing_slug")
          .toLowerCase()}/checkout`
      );
    } else if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <p className="login-title">
              Login
              <div className="hr-line-left-thick"></div>
              {this.state.msgshow}
            </p>
          </div>
        </div>

        <Form className="registerform">
          <div className="row ">
            <div className="col-md-12">
              <Form.Field>
                <label>Email Address*</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="username"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  required
                />
              </Form.Field>
            </div>
            <div className="col-md-12">
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  password="password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  required
                />
              </Form.Field>
            </div>

            <div className="col-md-6">
              <Button
                type="submit"
                className="listing-btn mb-15"
                onClick={() => this.login()}
              >
                {this.props.loginname}
              </Button>
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
export default withRouter(Loginform);
