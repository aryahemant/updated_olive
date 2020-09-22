import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Withloginpage.css";
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
// import { Route, withRouter } from "react-dom";
import moment from "moment";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

class Withloginpage extends Component {
  constructor(props) {
    super(props);
    let registered = false;

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      errormsg: "",
      registered,
      userDetail: localStorage.getItem("userDetail"),
    };
  }

  componentDidMount() {
    console.log("all user detail", this.state.userDetail);
    console.log("user detail", JSON.parse(this.state.userDetail).first_name);
    this.setState({
      userDetail: JSON.parse(this.state.userDetail),
    });
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  register() {
    console.warn("state", this.state);
    fetch(
      "https://www.oliveservicedapartments.com/olive_api/public/api/auth/register",
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
        console.log(resp.token);
        console.log("abcd");
        console.log(this.state.registered);
        console.log("efgh");
        console.log(this.props.from);
        if (resp.token) {
          localStorage.setItem("login", JSON.stringify(resp.token));
          // localStorage.setItem("userDetail", resp.data);
          localStorage.setItem("userDetail", resp.data);
          this.setState({
            userDetail: resp.data,
          });

          this.handleBookingApi();
          if (this.props.from == "checkoutpage") {
            this.props.history.push(`/thankyou`);
          }
          this.setState({
            registered: true,
          });
          alert("Registered successfuly");
        }
        console.log("user detail withlogin", this.state.userDetail);
        localStorage.removeItem("amenities_list");
        localStorage.removeItem("amenityDetail");
        localStorage.removeItem("amenityPrice");
        localStorage.removeItem("discountId");
      });
    });
  }
  //   //  alert("login called")
  // }
  completeBooking = () => {
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    let extraamities;
    if (localStorage.getItem("amenities_list") == null) {
      extraamities = 0;
    } else {
      extraamities = localStorage.getItem("amenities_list").split(",");
    }
    if (
      this.state.first_name == "" ||
      this.state.last_name == "" ||
      this.state.email == "" ||
      this.state.phone == ""
    ) {
      this.setState({
        errormsg: "Please fill All the requied fileds",
      });
    } else {
      axios({
        method: "post",
        url:
          "https://www.oliveservicedapartments.com/olive_api/public/api/booking",
        data: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          phone: this.state.phone,
          property_id: localStorage.getItem("property_id"),
          roomtype_id: localStorage.getItem("roomType_id"),
          property_type: localStorage.getItem("apartmentTitle"),
          check_in: moment(localStorage.getItem("startDate")).format(
            "YYYY-MM-DD"
          ),
          check_out: moment(localStorage.getItem("endDate")).format(
            "YYYY-MM-DD"
          ),
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
          this.props.history.push(`/thankyou`);
          localStorage.setItem("bookingid", response.data.booking.id);
        })
        .catch(function (response) {
          //handle error
          console.log("Error while calling api", response);
        });
    }
  };
  render() {
    // if(this.state.registered){
    //   return <Redirect to="/login"/>
    // }
    return (
      <React.Fragment>
        {/* <Form>
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </div>
          </div>
        </Form> */}
        <Form className="registerform">
          <div className="row ">
            <span className="errormsg">{this.state.errormsg}</span>

            <div className="col-md-6">
              <Form.Field>
                <label>First Name*</label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    this.setState({ first_name: e.target.value });
                  }}
                />
              </Form.Field>
            </div>
            <div className="col-md-6">
              <Form.Field>
                <label>Last Name*</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => {
                    this.setState({ last_name: e.target.value });
                  }}
                />
              </Form.Field>
            </div>
            <div className="col-md-6">
              <Form.Field>
                <label>Email Address*</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </Form.Field>
            </div>
            {/* <div className="col-md-1 col-3">
              <Form.Field>
                <label>Phone*</label>
                <input type="number" placeholder="+91" />
              </Form.Field>
            </div> */}
            <div className="col-md-6">
              <Form.Field>
                <label>Phone No.</label>
                <input
                  type="number"
                  placeholder="9898989898"
                  onChange={(e) => {
                    this.setState({ phone: e.target.value });
                  }}
                />
              </Form.Field>
            </div>

            <div className="col-md-6">
              <Button
                className="listing-btn mb-15"
                onClick={() => this.completeBooking()}
              >
                Complete Booking
              </Button>
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
export default withRouter(Withloginpage);
