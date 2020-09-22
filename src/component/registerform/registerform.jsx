import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registerform.css";
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
import history from "../../lib/history";
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
import swal from "@sweetalert/with-react";

class Registerform extends Component {
  componentDidMount() {
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }
  constructor(props) {
    super(props);
    let registered = false;

    this.state = {
      registered,
      userDetail: [],
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      special_request: "",
      errormsg: "",
      ragreeserror: "",
      regagreeselected: "",
      dob: "",
    };
  }
  componentDidMount() {
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
    // let loggedIn = false;
    localStorage.setItem("regselectdagree", false);
  }
  handleChanges = (e) => {
    localStorage.setItem("regselectdagree", e.target.value);
    this.setState({
      regagreeselected: e.target.value,
    });
    console.info("select agree ", this.state.regagreeselected);
  };
  register() {
    console.warn("state", this.props.from);

    if (
      this.state.first_name == "" ||
      this.state.last_name == "" ||
      this.state.email == "" ||
      this.state.phone == "" ||
      this.state.password == "" ||
      this.state.password_confirmation == "" ||
      this.state.dob == ""
    ) {
      this.setState({
        errormsg: "All fields are required",
      });
      return false;
    }
    if (this.state.password != this.state.password_confirmation) {
      this.setState({
        errormsg: "Password does not matched",
      });
      return false;
    }
    if (localStorage.getItem("regselectdagree") === "false") {
      this.setState({
        ragreeserror: "Please Select the agree checkbox",
      });
      return false;
    }
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
        console.log("abcd", resp.data);
        console.log(this.state.registered);
        console.log("efgh");
        console.log(this.props.from);
        if (resp.token) {
          localStorage.setItem("login", JSON.stringify(resp.token));
          localStorage.setItem("loginstatus", "true");
          localStorage.setItem("userDetail", JSON.stringify(resp.data));
          this.setState({
            userDetail: resp.data,
          });
          // if (this.props.from == "checkoutpage") {
          //   // this.handleBookingApi();
          //   this.props.history.push(
          //     `/${localStorage.getItem("cityName")}/${localStorage
          //       .getItem("apartmenttitle")
          //       .toLowerCase()}/thankyou`
          //   );
          // }
          this.setState({
            registered: true,
            errormsg: "Registered Successfully",
          });
          // alert("Registered successfuly");

          console.log(this.state.registered);
          console.log("ijk", this.state.userDetail);
        } else {
          this.setState({
            registered: true,
            errormsg: "The email has already been taken",
          });
          return false;
          // alert("The email has already been taken");
        }

        // if(this.state.login === this.tokenvalu){
        //   console.log('this is abc')
        // }
        localStorage.removeItem("amenities_list");
        localStorage.removeItem("amenityDetail");
        localStorage.removeItem("amenityPrice");
        localStorage.removeItem("discountId");
        return <Redirect to="/" />;
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
    console.log("checking status for register", this.props.rgstrstatus);
    if (this.state.registered && this.props.rgstrstatus) {
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
    } else if (this.state.registered) {
      return <Redirect to="/" />;
    }
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
            <div className="col-md-12">
              <p className="login-title">
                Register
                <div className="hr-line-left-thick"></div>
              </p>
            </div>
            <p className="errormsgr">{this.state.errormsg}</p>
            <div className="col-md-6">
              <Form.Field>
                <label>First Name*</label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    this.setState({ first_name: e.target.value });
                  }}
                  required
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
                  required
                />
              </Form.Field>
            </div>
            <div className="col-md-6">
              <Form.Field>
                <label>DOB*</label>
                <input
                  type="text"
                  placeholder="Date Of Birth"
                  onChange={(e) => {
                    this.setState({ dob: e.target.value });
                  }}
                />
              </Form.Field>
            </div>

            <div className="col-md-6">
              <Form.Field>
                <label>Phone*</label>
                <input
                  type="number"
                  placeholder="9898989898"
                  onChange={(e) => {
                    this.setState({ phone: e.target.value });
                  }}
                  required
                />
              </Form.Field>
            </div>
            <div className="col-md-12">
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
            <div className="col-md-6">
              <Form.Field>
                <label>Password*</label>
                <input
                  type="password"
                  placeholder="9898989898"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  required
                />
              </Form.Field>
            </div>
            <div className="col-md-6">
              <Form.Field>
                <label>Confirm Password*</label>
                <input
                  type="password"
                  placeholder="9898989898"
                  onChange={(e) => {
                    this.setState({ password_confirmation: e.target.value });
                  }}
                  required
                />
              </Form.Field>
            </div>
            <div className="col-md-12">
              {/* <Form.TextArea
                label="Special Request"
                placeholder="Tell us more about you..."
                onChange={(e) => {
                  this.setState({ special_request: e.target.value });
                }}
                required
              /> */}
            </div>
            {/* <div className="col-md-12 mb-15">
            <p className="p2"><strong>Best Available Rate:</strong> Book directly on our website and avail of this exclusive online offer that does NOT require you to pay anything when making your booking, Even better, you can also cancel or modify this
              booking FREE of cost up to 14 days before your date of arrival - NO Cancellation Charges up to 14 Days from your arrival.</p>
            <p className="p2">
            <strong>Cancellation Policy:</strong> Please note, if cancelled or modified up to 14 days before date of arrival, no fee will be charged. 
If cancelled or modified later or in case of no-show, 25 percent of the total price of the reservation will be charged.
            </p>
            <p className="p2">
<strong>Pre-Payment Policy:</strong> No payment will be required at the time of booking unless Check-in 
date is within 14 Days from Booking Date. You will need to pay 25% advance payment atleast
 14 days before arrival to confirm your booking.
  </p>
  <p className="p2">
The Booking will only be confirmed after receipt of advance payment,  if we don't receive payment 14 Days before arrival, Then booking will be cancelled automatically.
  </p>
            </div> */}

            <div className="col-md-12">
              <Form.Field>
                <input
                  type="checkbox"
                  className="agreecheckbox"
                  onChange={(e) => {
                    this.handleChanges({
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    });
                  }}
                />
                <label>I agree to the Terms of Service & Privacy Policy.</label>
              </Form.Field>
              <p className="agreeerrormsg">{this.state.ragreeserror}</p>
            </div>

            <div className="col-md-6">
              <Button
                className="listing-btn mb-15"
                onClick={() => this.register()}
              >
                {this.props.submitname}
              </Button>
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
export default withRouter(Registerform);
