import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";
import axios from "axios";
import history from "../../lib/history";

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
  Link,
} from "react-router-dom";
// import { Route, withRouter } from "react-dom";
const routes = [
  {
    path: "/about",
    exact: true,
    main: About,
  },
  {
    path: "/offers",
    exact: true,
    main: Offers,
  },
  {
    path: "/faqs",
    exact: true,
    main: Faqs,
  },
  {
    path: "/booking",
    exact: true,
    main: Booking,
  },
  {
    path: "/terms-and-conditions",
    exact: true,
    main: Terms,
  },
  {
    path: "/privacy-policy",
    exact: true,
    main: Privacypolicy,
  },
  {
    path: "/refund-cancellation",
    exact: true,
    main: Refundpolicy,
  },
  {
    path: "/lowest-price-guarantee",
    exact: true,
    main: Lowprice,
  },
  {
    path: "/conatct-us",
    exact: true,
    main: Contactus,
  },
  {
    path: "/online-payment",
    exact: true,
    main: Onlinepayment,
  },
  {
    path: "/direct-payment",
    exact: true,
    main: Directpayment,
  },
  {
    path: "/withloginpage",
    exact: true,
    main: Withloginpage,
  },
];

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    };
  }
  async componentDidMount() {
    const resp = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    );
    this.setState({
      cities: resp.data,
    });
  }

  handleReDirect = (id, name) => {
    console.log("city id in top destin", id);
    console.log(name);
    localStorage.setItem("single", "0");
    history.push(
      `/${name.toLocaleLowerCase()}?city=${name}&id=${id}&startDate=&endDate=&guests=1`
    );
  };
  handleReDirect1 = (id, name) => {
    console.log("city id in entire home", id);
    console.log(name);
    localStorage.setItem("single", "1");
    let guest = 1;
    this.props.history.push(
      `/${name.toLocaleLowerCase()}/h?city=${name}&id=${id}&startDate=&endDate=&guests=1`
    );
  };

  render() {
    return (
      <section className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img
                className="footer-logo"
                src={require("../../assets/OLIVE-Logo-Footer.png")}
                alt="First slide"
              />
              <ul className="social-icon-list">
                <li>
                  <a href="https://www.facebook.com/oliveapartmentsdelhi">
                    <i class="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/oliveapartments">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://plus.google.com/+OliveServiceApartmentsinDelhiNewDelhi/">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-2 col-6">
              <ul className="footer-menu">
                <li className="footer-menu-title">top destinations</li>
                {this.state.cities.map((city) => (
                  <li
                    onClick={() => this.handleReDirect(city.id, city.city_name)}
                  >
                    <a
                      href={`/${city.city_name.toLocaleLowerCase()}?city=${
                        city.city_name
                      }&id=${city.id}&startDate=&endDate=&guests=`}
                    >
                      {city.city_name}{" "}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-2 col-6">
              <ul className="footer-menu">
                <li className="footer-menu-title">Entire Home</li>
                {this.state.cities.map((city) => (
                  <li
                    onClick={() =>
                      this.handleReDirect1(city.id, city.city_name)
                    }
                  >
                    <a
                      href={`/${city.city_name.toLocaleLowerCase()}/h?city=${
                        city.city_name
                      }&id=${city.id}&startDate=&endDate=&guests=`}
                    >
                      {city.city_name}{" "}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-2 col-6">
              <Router history={history}>
                <Switch>
                  <ul className="footer-menu">
                    <li className="footer-menu-title">company info</li>
                    <li>
                      {" "}
                      <Link to="/about">about</Link>
                    </li>
                    <li>
                      <Link to="/offers">offers</Link>{" "}
                    </li>
                    <li>
                      <Link to="/contact-us">contact</Link>{" "}
                    </li>
                    <li>
                      <a
                        href="https://www.oliveservicedapartments.com/blog/"
                        target="_blank"
                      >
                        blog
                      </a>
                    </li>
                    <li>
                      <Link to="/faqs">faq</Link>{" "}
                    </li>
                    <li>
                      <Link to="/booking">booking</Link>{" "}
                    </li>

                    <li>
                      <a
                        href="https://www.oliveservicedapartments.com/images/olive-serviced-apartments-ebook.pdf"
                        download
                        target="_blank"
                      >
                        ebook
                      </a>
                    </li>
                  </ul>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/offers">
                    <Offers />
                  </Route>
                  <Route exact path="/faqs">
                    <Faqs />
                  </Route>
                  <Route exact path="/booking">
                    <Booking />
                  </Route>
                </Switch>
              </Router>
            </div>
            <div className="col-md-2 col-6">
              <Router history={history}>
                <Switch>
                  <ul className="footer-menu">
                    <li className="footer-menu-title">learn more</li>
                    <li>
                      <Link to="/terms-and-conditions">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">privacy policy</Link>
                    </li>
                    <li>
                      <Link to="/refund-cancellation">
                        refund & cancellation
                      </Link>
                    </li>
                    <li>
                      <Link to="/online-payment">online payment</Link>
                    </li>
                    <li>
                      <Link to="/direct-payment">direct payment</Link>
                    </li>
                    <li>
                      <Link to="/lowest-price-guarantee">
                        lowest price guarantee
                      </Link>
                    </li>
                  </ul>

                  <Route exact path="/terms-and-conditions">
                    <Terms />
                  </Route>
                  <Route exact path="/privacy-policy">
                    <Privacypolicy />
                  </Route>
                  <Route exact path="/refund-cancellation">
                    <Refundpolicy />
                  </Route>
                  <Route exact path="/lowest-price-guarantee">
                    <Lowprice />
                  </Route>
                  <Route exact path="/contact-us">
                    <Contactus />
                  </Route>
                  <Route exact path="/online-payment">
                    <Onlinepayment />
                  </Route>
                  <Route exact path="/direct-payment">
                    <Directpayment />
                  </Route>
                </Switch>
              </Router>
            </div>
          </div>
        </div>
        {/* <div className="footer-city-img">
                 <img  src={require('../../assets/Cityscape_Footer.png')} alt="First slide"/>
                </div> */}
      </section>
    );
  }
}
export default Footer;
