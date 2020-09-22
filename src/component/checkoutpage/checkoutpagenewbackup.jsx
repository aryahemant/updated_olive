import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkoutpage.css";
import Registerform from "../registerform/registerform";
import Checkoutdetail from "../checkoutdetail/checkoutdetail";
import Addcard from "../addcard/addcard";
import Loginform from "../loginform/loginform";
import axios from "axios";
import moment from "moment";
import Withloginpage from "../WithLoginPage/Withloginpage";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Checkbox,
} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
// import Form from "react-bootstrap/Form";

// import { Route, withRouter } from "react-dom";

class Checkoutpage extends Component {
  constructor(props, context) {
    super(props);
    let loggedIn = false;
    if (localStorage.getItem("login")) {
      loggedIn = true;
    }
    this.state = {
      loggedIn,
      formshow: 2,
      form: "checkoutpage",
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  formchange(valchange) {
    console.info(valchange);
    this.setState({
      formshow: valchange,
    });
  }

  taxcalculation = () => {
    this.props.taxcalculation();
  }

  removediscount = () => {
    this.props.removediscount();
  }
  handleDiscountSection = (discount) => {
    this.props.handleDiscountSection(discount);
  }
  handleGoBack = () => {
    this.props.history.push('/detail/page');
  }

  render() {
    return (
      <React.Fragment>
        {/* login */}
        <section className="pad-45 bg-grey">
          <div className="container ">
            <div className="row">
              <div className="col-md-12">
                <h1 className="font-green font-cap mb-50">checkout</h1>
              </div>
            </div>
            <div className="row">
              {/* <div className="col-md-4">
                <Checkoutdetail
                  amenityDetail={JSON.parse(
                    localStorage.getItem("amenityDetail")
                  )}
                  // apartmentTitle = {this.props.apartmentTitle}
                  // nobeds={this.props.nobeds}
                  // nobath={this.props.nobath}
                  // cancelType={this.props.cancelType}
                  // cancelTypeImage={this.props.cancelTypeImage}
                  // dealPrice={this.props.dealPrice}
                  // apartmentName={this.props.apartmentName}
                  // apartmentImage={this.props.apartmentImage}
                  // stdToSupPrice={this.props.stdToSupPrice}
                  // stdToSupPriceFree={this.props.stdToSupPriceFree}
                  // supToPre={this.props.supToPre}
                  // supToPreFree={this.props.supToPreFree}
                  price={parseInt(localStorage.getItem("amenityPrice"))}
                  days={this.props.days}
                  discountPrice1={this.props.discountPrice}
                />
              </div> */}
             
              <div className="col-md-8">
              {this.state.loggedIn === false && (
                <p className="login-title">
                  Already a member?
                  <span
                    className="font-green fw-700"
                    onClick={() => this.formchange(1)}
                  >
                    Login.
                  </span>
                  <br />
                  <span
                    className="font-green fw-700"
                    onClick={() => this.formchange(2)}
                  >
                    Register
                  </span>{" "}
                  and get
                  <span className="font-green fw-700"> 10% off</span> on
                  booking.
                  <div className="hr-line-left-thick"></div>
                </p>
              )}
                <div className="">
                  {this.state.loggedIn === false ? (
                    this.state.formshow == 1 ? (
                      <React.Fragment>
                        <Loginform
                          loginname="Complete Booking"
                          from="checkoutpag"
                        />
                      </React.Fragment>
                    ) : (
                      <Registerform
                        submitname="complete booking"
                        from="checkoutpage"
                      />
                    )
                  ) : (
                    <Withloginpage />
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <Checkoutdetail
                  amenityDetail={JSON.parse(
                    localStorage.getItem("amenityDetail")
                  )}
                  // apartmentTitle = {this.props.apartmentTitle}
                  // nobeds={this.props.nobeds}
                  // nobath={this.props.nobath}
                  // cancelType={this.props.cancelType}
                  // cancelTypeImage={this.props.cancelTypeImage}
                  // dealPrice={this.props.dealPrice}
                  // apartmentName={this.props.apartmentName}
                  // apartmentImage={this.props.apartmentImage}
                  // stdToSupPrice={this.props.stdToSupPrice}
                  // stdToSupPriceFree={this.props.stdToSupPriceFree}
                  // supToPre={this.props.supToPre}
                  // supToPreFree={this.props.supToPreFree}
                  price={parseInt(localStorage.getItem("amenityPrice"))}
                  days={this.props.days}
                  discountPrice1={this.props.discountPrice}
                  noDays={this.props.noDays}
                  propertyPrice={this.props.price}
                  calculatedtax={this.props.calculatedtax}
                  taxcalculation={this.taxcalculation}
                  // discountsec={this.props.discountsec}
                  removediscount={this.removediscount}
                  handleDiscountSection={this.handleDiscountSection}
                  handleGoBack={this.handleGoBack}
                />
              </div>
            </div>
            <div className="row mt-30">
              <div className="col-md-4">
                <Addcard
                  addImg={require("../../assets/listingcard/Saving.png")}
                  addTitle="Bigger space, bigger saving"
                  addDesc="Book a 2 or 3 Bedroom Apartment & Get 15% Weekly & 30% Monthly discount."
                />
              </div>
              <div className="col-md-4">
                <Addcard
                  addImg={require("../../assets/listingcard/Discount.png")}
                  addTitle="Stay More, Save More!"
                  addDesc="Book a studio or 1 Bedroom Apartment & Get 10% Weekly & 20% Monthly discount."
                />
              </div>
              <div className="col-md-4">
                <div className="fl-100 add-card">
                  <img
                    className="help-img"
                    src={require("../../assets/Booking_Help.png")}
                  />
                  <div className="help-detail">
                    <p className="fw-700  font-cap mb-10">want booking help?</p>
                    <div className="hr-line-left-thick"></div>
                    <p className="fw-700 font-green font-cap mb-10">
                      9015080080
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* login end */}
      </React.Fragment>
    );
  }
}
export default Checkoutpage;
