import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
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
import Deskheader from "../desktopheader/Deskheader";
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
import Thankyou from "../thankyou/thankyou";

import {
  Router,
  Switch,
  Route,
  NavLink,
  withRouter,
  Redirect,
  useLocation,
} from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    main: Home,
  },

  {
    path: "/:cityName/:apartment",
    exact: true,
    main: ApartmentDetailPage,
  },
  {
    path: "/:cityName/h/:apartment",
    exact: true,
    main: ApartmentDetailPage,
  },
  {
    path: "/olive/auth/register",
    exact: true,
    main: Registerpage,
  },
  {
    path: "/olive/auth/login",
    exact: true,
    main: Loginpage,
  },
  {
    path: "/:cityName/:apartment/checkout",
    exact: true,
    main: Checkoutpage,
  },
  {
    path: "/:cityName/h/:apartment/checkout",
    exact: true,
    main: Checkoutpage,
  },
  {
    path: "/:cityName/:apartment/thankyou",
    exact: true,
    main: Thankyoupage,
  },
  {
    path: "/:cityName/h/:apartment/thankyou",
    exact: true,
    main: Thankyoupage,
  },
  {
    path: "/profile",
    exact: true,
    main: Profile,
  },
  {
    path: "/:cityName/:apartment/reservation",
    exact: true,
    main: Reservationpage,
  },
  {
    path: "/:cityName/h/:apartment/reservation",
    exact: true,
    main: Reservationpage,
  },
  {
    path: "/:cityName/:apartment/upsell",
    exact: true,
    main: Upsellpage,
  },
  {
    path: "/:cityName/h/:apartment/upsell",
    exact: true,
    main: Upsellpage,
  },
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
  {
    path: "/thankyou",
    exact: true,
    main: Thankyou,
  },
  {
    path: "/:cityName",
    exact: true,
    main: Apartmentlisting,
  },
  {
    path: "/:cityName/h",
    exact: true,
    main: Apartmentlisting,
  },
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      propertyId: "",
      city: "",
      noDays: null,
      selectedKey: "Add",
      discountPrice: 0,
      name: "",
      loginstatus: false,
      property_price: 0,
      days: 0,
      layouts: [],
      taxprice: 0,
      calculatedtax: 0,
      taxval: 0,
      discountSec: 0,
      no_days: localStorage.getItem("no_days"),
      checkout: localStorage.getItem("checkout"),
      dealprice: localStorage.getItem("dealprice"),
      layouts: [],
      amenityName: "",
      amenityPrice: 0,
      amenityDetail: [],
      selected: "Add",
      addedamenity: [],
      login: false,
      register: false,
      startDate: "",
      endDate: "",
      cityName: "",
      cityId1: "",
      selected: null,
      singleStatus: "",
    };
  }

  componentDidUpdate() {
    // localStorage.removeItem("amenity_details");
    // localStorage.removeItem("amenitieslist");
    // localStorage.removeItem("amenityDetail");
    // if (!window.location.host.startsWith("www")) {
    //   window.location =
    //     window.location.protocol +
    //     "//" +
    //     "www." +
    //     window.location.host +
    //     window.location.pathname;
    // }

    this.handleAmenityDetail();
  }

  async componentDidMount() {
    const resp = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    );
    const value = resp.data;
    this.setState({
      cities: resp.data,
    });
    // localStorage.setItem("cities", this.state.cities);
    localStorage.setItem("cities", JSON.stringify(this.state.cities));
    console.log("setting cities array/");
  }

  // function called in Headersearch component
  handleChange = (date) => {
    console.log("start date in header", date);
    this.setState({
      startDate: date,
      endDate: new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000),
    });
  };

  handleEndDate = (dateValue) => {
    console.log("end date in header", dateValue);
    this.setState({
      endDate: dateValue,
    });
  };

  handleValue = () => {
    console.info("new change value");
    {
      this.state.cities.map((cityId) => {
        if (cityId.city_name === this.state.cityName) {
          this.setState({
            cityId1: cityId.id,
          });
          localStorage.setItem("single", 0);
        }
      });
    }
  };
  handleOnChange = (e) => {
    console.info("new click value");

    console.log("city name in header", e.target.value);
    var index = e.nativeEvent.target.selectedIndex;
    var text = e.nativeEvent.target[index].text;
    localStorage.setItem("single", 0);
    this.setState({
      cityName: text,
    });
  };

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
    history.push(`/${name.toLowerCase()}`);
  };

  logout() {
    console.info("logout buttton");
    localStorage.removeItem("login");
    localStorage.setItem("loginstatus", false);
    // localStorage.removeItem("login");
    this.setState({
      loginstatus: false,
    });
    return <Redirect to="/" />;
    // history.push("/");
  }

  handlePriceForMoreDays = (price, days) => {
    this.setState({
      property_price: price,
      days: days,
    });
  };

  handleDiscountSection = (discount) => {
    console.info("sectin called", discount);
    this.setState(
      {
        discountSec: discount,
      },
      () => {
        console.log("discount section in header", this.state.discountSec);
      }
    );
  };

  handleRegionName = (region) => {
    console.log("region", region);
    this.setState({
      regionName: region
    })
  }
  // function for setting state of single status
  handleSingleStatus = (status) => {
    console.log("single status", status);
    this.setState({
      singleStatus: status,
    });
  };

  removediscount = () => {
    localStorage.removeItem("discountId");
    this.setState(
      {
        discountSec: 0,
        discountPrice: 0,
      },
      () => {
        console.log("section check on remove ", this.state.discountSec);
        this.taxcalculation();
      }
    );
    // this.handleDiscountSection(0);
  };

  taxcalculation = () => {
    let tax;
    console.log("discount section status", this.state.discountSec);
    console.log("discounted price", this.state.discountPrice);
    this.state.discountSec == 0
      ? (tax =
          (parseInt(localStorage.getItem("dealPrice")) +
            parseInt(this.state.amenityPrice)) /
          localStorage.getItem("noDays"))
      : (tax =
          (parseInt(localStorage.getItem("dealPrice")) +
            parseInt(this.state.amenityPrice) -
            this.state.discountPrice) /
          localStorage.getItem("noDays"));
    console.info("new tax calculation", localStorage.getItem("dealPrice"));
    console.info("price devided by nights", tax);
    const taxwithnight = tax * localStorage.getItem("noDays");
    console.info("price devided by nights", taxwithnight);

    // this.setState(
    //   {
    //     taxprice: tax,
    //   },
    //   () => {
    //     console.log("match found and delete", this.state.taxprice);
    //   }
    // );
    if (tax < 1000) {
      console.log("tax price 100 se kam", this.state.taxprice);
      this.setState(
        {
          calculatedtax: 0,
          taxval: 0,
        },
        () => {
          console.log("calculation", this.state.calculatedtax);
        }
      );
    }
    if (tax > 1000 && tax < 7000) {
      const taxamount = (tax * 12) / 100;
      const totaltx = taxamount * localStorage.getItem("noDays");
      console.log("tax price", totaltx);
      this.setState(
        {
          calculatedtax: totaltx,
          taxval: 12,
        },
        () => {
          console.log("12 percent calculation", this.state.calculatedtax);
        }
      );
    }
    if (tax > 7000) {
      const taxamount = (tax * 18) / 100;
      const totaltx = taxamount * localStorage.getItem("noDays");
      console.log("tax price", totaltx);
      this.setState(
        {
          calculatedtax: totaltx,
          taxval: 18,
        },
        () => {
          console.log("18 percent calculation", this.state.calculatedtax);
        }
      );
    }
    console.log("amenity price in header", this.state.amenityPrice);
  };

  handleAmenityDetail = () => {
    localStorage.setItem(
      "amenityDetail",
      JSON.stringify(this.state.amenityDetail)
    );
    localStorage.setItem("amenityPrice", this.state.amenityPrice);
  };

  addAmenity = (id, price, name) => {
    let obj = this.state.amenityDetail.find((o) => o.amenityName === name);
    console.info("obj check", id);

    let index = this.state.amenityDetail.indexOf(obj);
    const arrayofexisttab = this.state.amenityDetail;

    if (obj) {
      const updateAmenity = this.state.amenityDetail;
      const updateAmenity1 = updateAmenity.splice(index, 1);
      console.log("update amenity ", updateAmenity1);
      const existval = updateAmenity1[0].amenityprice;
      console.log("val", existval);
      const index1 = this.state.addedamenity.indexOf(id);
      console.info("index found", index1);
      console.log("added amenity", typeof this.state.addedamenity);

      let deletedamenity;
      if (index1 > -1) {
        deletedamenity = this.state.addedamenity.filter(function (e) {
          return e !== id;
        });
      }

      console.info("found", deletedamenity);
      this.setState(
        {
          amenityPrice: this.state.amenityPrice - existval,
          amenityDetail: updateAmenity,
          addedamenity: deletedamenity,
        },
        () => {
          console.log("match found and delete", this.state.amenityDetail);
          localStorage.setItem(
            "amenity_details",
            JSON.stringify(this.state.amenityDetail)
          );
          localStorage.setItem("amenitieslist", this.state.addedamenity);
          console.log("after delete", this.state.addedamenity);
          localStorage.setItem("amenity_price", this.state.amenityPrice);
          this.setState({ selected: "Add" });
          this.taxcalculation();
        }
      );
    } else {
      this.setState(
        {
          amenityPrice: this.state.amenityPrice + price,
          amenityDetail: [
            ...this.state.amenityDetail,
            {
              amenityprice: price,
              amenityName: name,
            },
          ],
          addedamenity: [...this.state.addedamenity, id],
        },
        () => {
          console.log("array with amenity detil ", this.state.amenityDetail);
          localStorage.setItem(
            "amenity_details",
            JSON.stringify(this.state.amenityDetail)
          );
          console.info("only amenity adds", this.state.addedamenity);
          localStorage.setItem("amenitieslist", this.state.addedamenity);
          localStorage.setItem("amenity_price", this.state.amenityPrice);

          this.setState({
            selected: "Added",
          });
          this.taxcalculation();
        }
      );

      console.info("obj check detail", this.state.amenityDetail);
    }
  };

  handleDeSelect = (nodays, checkout, dealprice, layouts, cutprice) => {
    this.setState({
      no_days: nodays,
      checkout: checkout,
      dealprice: dealprice,
      layouts: layouts,
      cutprice: cutprice,
    });
    console.log("no days in upsell", nodays);
    localStorage.setItem("noDays", nodays);
    localStorage.setItem("endDate", checkout);
    console.log("new end date", localStorage.getItem("endDate"));
    localStorage.setItem("dealPrice", dealprice);
    localStorage.setItem("layouts", JSON.stringify(layouts));
    console.log("deal price ", dealprice);
    localStorage.setItem("cut_price", cutprice);
    this.taxcalculation();
  };

  handleAuthLogin = () => {
    this.setState({
      login: true,
    });
    console.log("setting status for login", this.state.login);
  };
  handleAuthRegister = () => {
    this.setState({
      register: true,
    });
  };

  render() {
    console.info("location finding", this.state.loginstatus);
    return (
      <Router history={history}>
        <section className="mobview">
          <Mobheader />
        </section>
        <section className="deskview">
          <Deskheader cities={this.state.cities} />
        </section>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                handleValue={this.handleValue}
                handleChange={this.handleChange}
                handleEndDate={this.handleEndDate}
                handleOnChange={this.handleOnChange}
                selected={this.state.selected}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                cityName={this.state.cityName}
                cities={this.state.cities}
                cityId={this.state.cityId1}
              />
            )}
          />
          <Route
            exact
            path="/olive/auth/register"
            render={(props) => (
              <Registerpage {...props} rgstrstatus={this.state.register} />
            )}
          />
          <Route
            exact
            path="/olive/auth/login"
            render={(props) => (
              <Loginpage {...props} lgnstatus={this.state.login} />
            )}
          />
          <Route
            exact
            path="/:cityName/:apartment/checkout"
            render={(props) => (
              <Checkoutpage
                {...props}
                discountPrice={this.state.discountPrice}
                // noDays={this.state.days}
                // price={this.state.property_price}
                calculatedtax={this.state.calculatedtax}
                taxval={this.state.taxval}
                taxcalculation={this.taxcalculation}
                discountsec={this.state.discountSec}
                removediscount={this.removediscount}
                handleDiscountSection={this.handleDiscountSection}
                handleAuthLogin={this.handleAuthLogin}
                handleAuthRegister={this.handleAuthRegister}
                singleStatus={this.state.singleStatus}
                regionName={this.state.regionName}
              />
            )}
          ></Route>
          <Route
            exact
            path="/:cityName/h/:apartment/checkout"
            render={(props) => (
              <Checkoutpage
                {...props}
                handleNoDays={this.handleNoDays}
                handleDiscountPrice={this.handleDiscountPrice}
                discountPrice={this.state.discountPrice}
                handlePriceForMoreDays={this.handlePriceForMoreDays}
                calculatedtax={this.state.calculatedtax}
                taxcalculation={this.taxcalculation}
                handleDiscountSection={this.handleDiscountSection}
                discountsec={this.state.discountSec}
                removediscount={this.removediscount}
                handleDeSelect={this.handleDeSelect}
                addAmenity={this.addAmenity}
                handleAmenityDetail={this.handleAmenityDetail}
                amenityDetail={this.state.amenityDetail}
                amenityPrice={this.state.amenityPrice}
                regionName={this.state.regionName}
              />
            )}
          ></Route>
          <Route
            exact
            path="/:cityName/:apartment/thankyou"
            render={(props) => (
              <Thankyoupage
                {...props}
                handleGoToReservation={this.handleGoToReservation}
              />
            )}
          ></Route>
          <Route
            exact
            path="/:cityName/h/:apartment/thankyou"
            render={(props) => (
              <Thankyoupage
                {...props}
                handleGoToReservation={this.handleGoToReservation}
              />
            )}
          ></Route>
          <Route
            exact
            path="/:cityName/:apartment/reservation/:bookingId"
            render={(props) => <Reservationpage {...props} />}
          ></Route>
          <Route
            exact
            path="/:cityName/h/:apartment/reservation/:bookingId"
            render={(props) => <Reservationpage {...props} />}
          ></Route>
          <Route
            exact
            path="/:cityName/:apartment/upsell"
            render={(props) => (
              <Upsellpage
                {...props}
                handleNoDays={this.handleNoDays}
                handleDiscountPrice={this.handleDiscountPrice}
                discountPrice={this.state.discountPrice}
                handlePriceForMoreDays={this.handlePriceForMoreDays}
                calculatedtax={this.state.calculatedtax}
                taxcalculation={this.taxcalculation}
                handleDiscountSection={this.handleDiscountSection}
                discountsec={this.state.discountSec}
                removediscount={this.removediscount}
                handleDeSelect={this.handleDeSelect}
                addAmenity={this.addAmenity}
                handleAmenityDetail={this.handleAmenityDetail}
                amenityDetail={this.state.amenityDetail}
                amenityPrice={this.state.amenityPrice}
                singleStatus={this.state.singleStatus}
                regionName={this.state.regionName}
                // noDays={this.state.days}
                // price={this.state.property_price}
              />
            )}
          ></Route>
          <Route
            exact
            path="/:cityName/h/:apartment/upsell"
            render={(props) => (
              <Upsellpage
                {...props}
                handleNoDays={this.handleNoDays}
                handleDiscountPrice={this.handleDiscountPrice}
                discountPrice={this.state.discountPrice}
                handlePriceForMoreDays={this.handlePriceForMoreDays}
                calculatedtax={this.state.calculatedtax}
                taxcalculation={this.taxcalculation}
                handleDiscountSection={this.handleDiscountSection}
                discountsec={this.state.discountSec}
                removediscount={this.removediscount}
                handleDeSelect={this.handleDeSelect}
                addAmenity={this.addAmenity}
                handleAmenityDetail={this.handleAmenityDetail}
                amenityDetail={this.state.amenityDetail}
                amenityPrice={this.state.amenityPrice}
                regionName={this.state.regionName}
                // noDays={this.state.days}
                // price={this.state.property_price}
              />
            )}
          ></Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
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
          <Route exact path="/thankyou">
            <Thankyou />
          </Route>
          <Route
            exact
            path="/withloginpage"
            render={(props) => <Withloginpage {...props} />}
          ></Route>
          <Route
            exact
            path={`/:cityId`}
            render={(props) => (
              <Apartmentlisting
                {...props}
                key={props.match.params.cityId}
                //key will mount the lifecycle method if it is unmounted
                cityID={this.state.cityId1}
                handleIdForProperty11={this.handleIdForProperty2}
                name={this.state.name}
                keyId={props.match.params.cityid}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                cityName={this.state.cityName}
                cities={this.state.cities}
              />
            )}
          />
          <Route
            exact
            path={`/:cityId/h`}
            render={(props) => (
              <Apartmentlisting
                {...props}
                key={props.match.params.cityId}
                //key will mount the lifecycle method if it is unmounted
                cityID={this.state.cityId1}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                cityName={this.state.cityName}
                handleIdForProperty11={this.handleIdForProperty2}
                name={this.state.name}
                keyId={props.match.params.cityid}
                handleSingleStatus={this.handleSingleStatus}
              />
            )}
          />
          <Route
            exact
            path="/:cityName/:apartment"
            render={(props) => (
              <ApartmentDetailPage
                {...props}
                key={props.match.params.cityId}
                idVal={this.state.idValue}
                cities={this.state.cities}
                handleSingleStatus={this.handleSingleStatus}
                singleStatus={this.state.singleStatus}
                handleRegionName={this.handleRegionName}
              />
            )}
          />
          <Route
            exact
            path="/:cityName/h/:apartment"
            render={(props) => (
              <ApartmentDetailPage
                {...props}
                key={props.match.params.cityId}
                idVal={this.state.idValue}
                cities={this.state.cities}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default Header;
