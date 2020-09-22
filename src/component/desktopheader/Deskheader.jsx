import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Deskheader.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
// import { Route, withRouter } from "react-dom";
import history from "../../lib/history";
import { render } from "react-dom";
import App from "../../App";
import Apartmentlisting from "../apartmentlisting/apartmentlisting";
import ApartmentDetailPage from "../ApartmentDetailPage/ApartmentDetailPage";
import Mobheader from "../mobheader/mobheader";
import axios from "axios";
import Home from "../Home/Home";
import Registerpage from "../registerpage/registerpage";
import Loginpage from "../loginpage/loginpage";
import Checkoutpage from "../checkoutpage/checkoutpage";
import Thankyoupage from "../thankyoupage/thankyoupage";
import Profile from "../profile/profile";
import Reservationpage from "../reservationpage/reservationpage";
import Upsellpage from "../upsellpage/upsellpage";
import About from "../staticpages/about";
import Offers from "../staticpages/offers";
import Faqs from "../staticpages/faqs";
import Booking from "../staticpages/booking";
import Terms from "../staticpages/terms";
import Privacypolicy from "../staticpages/privacypolicy";
import Refundpolicy from "../staticpages/refundpolicy";
import Lowprice from "../staticpages/lowprice";
import Contactus from "../staticpages/contactus";
import Onlinepayment from "../staticpages/onlinepayment";
import Directpayment from "../staticpages/directpayment";
import Withloginpage from "../WithLoginPage/Withloginpage";
import {
  Router,
  Switch,
  Route,
  NavLink,
  withRouter,
  Redirect,
  useLocation,
} from "react-router-dom";

class Deskheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityId: "",
      startDateValue: "",
      endDateVal: "",
      cityName: "",
      idValue: "",
      cities: [],
      apartmentTitle: "",
      nobeds: "",
      nobath: "",
      cancelType: "",
      cancelTypeImage: "",
      dealPrice: "",
      apartmentName: "",
      apartmentImage: "",
      stdToSupPrice: "",
      stdToSupPriceFree: "",
      supToPre: "",
      supToPreFree: "",
      amenityDetail: [],
      amenityPrice: "",
      propertyId: "",
      cityId1: "",
      city: "",
      noDays: null,
      selectedKey: "Add",
      discountPrice: 0,
      name: "",
      loginstatus: false,
    };
  }
  async componentDidMount() {
    // const resp = await axios.get(
    //   `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    // );
    // const value = resp.data;
    // this.setState({
    //   cities: resp.data,
    // });
    // localStorage.setItem("loginstatus", false);
    // this.unlisten = this.props.history.listen((location, action) => {
    //   console.log("on route change");
    // });
  }

  // componentWillUnmount() {
  //   this.unlisten();
  // }

  // handleValue = (id) => {
  //   this.setState({
  //     cityId: id,
  //   });
  // };
  // handleChange = (newDate) => {
  //   this.setState({
  //     startDateValue: newDate,
  //   });
  // };
  // handleEndDate = (newDate) => {
  //   this.setState({
  //     endDateVal: newDate,
  //   });
  // };

  // handleOnChange = (city) => {
  //   this.setState({
  //     cityName: city,
  //   });
  // };
  handleIdForProperty2 = (id) => {
    this.setState({
      idValue: id,
    });
  };

  handleNoDays = (days) => {
    console.log("days", days);
    this.setState({
      noDays: days,
    });
  };
  handleDiscountPrice = (price) => {
    console.log("Discount price in header", price);
    this.setState({
      discountPrice: price,
    });
    console.log("Discount price in header after setting state", price);
  };
  handleValue1 = (id, name) => {
    console.log(id);
    console.log(name);
    this.props.history.push(
      `/${name.toLocaleLowerCase()}?city=${name}&id=${id}&startDate=&endDate=&guests=1`
    );
    localStorage.setItem("single", 0);
  };

  logout() {
    console.info("logout buttton");
    localStorage.removeItem("login");
    localStorage.setItem("loginstatus", false);
    // localStorage.removeItem("login");
    this.setState({
      loginstatus: false,
    });
    // return <Redirect to="/" />;
    history.push("/");
  }

  render() {
    return (
      <React.Fragment>
        <Navbar expand="lg">
          <Nav className="ml-auto desk-navbar navigation">
            <NavDropdown title="Cities" id="basic-nav-dropdown">
              {this.props.cities.map((city) => {
                return (
                  <NavDropdown.Item
                    onClick={() => this.handleValue1(city.id, city.city_name)}
                  >
                    {city.city_name}
                  </NavDropdown.Item>
                );
              })}
              {/* <NavDropdown.Item href="#action/3.1">Delhi</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Noida</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Gurugram</NavDropdown.Item> */}
              <NavDropdown.Divider />
              {/* <NavDropdown.Item href="#action/3.4">
                Seperate apartment
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="#">
              <img
                className="nav-icon"
                src={require("../../assets/Call.png")}
              />{" "}
              9015080080
            </Nav.Link>
            <Navbar.Brand onClick={() => history.push("/")}>
              <img
                className="brand-logo"
                src={require("../../assets/olive-logo.png")}
              />{" "}
            </Navbar.Brand>

            {localStorage.getItem("loginstatus") == "true" ? (
              <React.Fragment>
                {" "}
                <Nav.Link href="/reservation">Reservations</Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link onClick={() => history.push("/olive/auth/register")}>
                  Register
                </Nav.Link>
                <Nav.Link
                  onClick={() => history.push("/olive/auth/login")}
                  className="login-btn"
                >
                  Login
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default withRouter(Deskheader);
