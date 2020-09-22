import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./upsell.css";
import axios from "axios";
import history from "../../lib/history";
import moment from "moment";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Checkbox,
} from "semantic-ui-react";
import ReactDOMServer from "react-dom/server";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

class Upsell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: [],
      propertyPrice: [],
      priceType: "",
      property_price: "",
      property_price30: 0,
      property_price15: 0,
      propertyPrice15: [],
      propertyPrice30: [],
      selectedDate: "",
      isClicked: false,
      cut_price15: 0,
      cut_price30: 0,
    };
  }
  async componentDidMount() {
    console.log(
      `no of days: ${this.state.noDays} & deal price: ${this.state.dealPrice}`
    );
    const result = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/checkout/amenities`
    );
    console.log(result.data.amenities);
    localStorage.setItem("amenVal", JSON.stringify(result.data.amenities));
    this.setState({
      val: result.data.amenities,
      priceType: localStorage.getItem("price_type"),
    });
    this.handleGetMore15(15);
    this.handleGetMore30(30);
  }

  handleGetMore15 = (days) => {
    const newDate = this.addDays(days);
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    axios({
      method: "post",
      url:
        "https://www.oliveservicedapartments.com/olive_api/public/api/property/price",
      data: {
        property_id: localStorage.getItem("property_id"),
        guest: localStorage.getItem("noGuest"),
        roomtype_id: localStorage.getItem("roomType_id"),
        check_in: moment(localStorage.getItem("startDate")).format(
          "YYYY-MM-DD"
        ),
        check_out: moment(newDate).format("YYYY-MM-DD"),
      },
      headers: { Authorization: AuthStr },
    })
      .then((response) => {
        //handle success
        this.setState({
          propertyPrice15: response.data.data,
        });
        switch (this.state.priceType) {
          case "price":
            let propertyPrice1 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.price;
            },
            0);
            let propertyPricecut1 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dprice;
            },
            0);
            this.setState({
              property_price15: propertyPrice1,
              cut_price15: propertyPricecut1,
            });
            break;

          case "refundable_price":
            let propertyPrice2 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.refundable_price;
            },
            0);
            let propertyPricecut2 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.drefundable_price;
            },
            0);
            this.setState({
              property_price15: propertyPrice2,
              cut_price15: propertyPricecut2,
            });
            break;

          case "snrefundable_price":
            let propertyPrice3 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.snrefundable_price;
            },
            0);
            let propertyPricecut3 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.snrefundable_price;
            },
            0);
            this.setState({
              property_price15: propertyPrice3,
              cut_price15: propertyPricecut3,
            });
            break;

          case "srefundable_price":
            let propertyPrice4 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.srefundable_price;
            },
            0);
            let propertyPricecut4 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dsrefundable_price;
            },
            0);
            this.setState({
              property_price15: propertyPrice4,
              cut_price15: propertyPricecut4,
            });
            break;

          case "pnrefundable_price":
            let propertyPrice5 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.pnrefundable_price;
            },
            0);
            let propertyPricecut5 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dpnrefundable_price;
            },
            0);
            this.setState({
              property_price15: propertyPrice5,
              cut_price15: propertyPricecut5,
            });
            break;

          case "prefundable_price":
            let propertyPrice6 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.prefundable_price;
            },
            0);
            let propertyPricecut6 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dprefundable_price;
            },
            0);
            this.setState({
              property_price15: propertyPrice6,
              cut_price15: propertyPricecut6,
            });
            break;
        }
      })
      .catch(function (response) {
        //handle error
        console.log("Error while calling api", response);
      });
  };

  handleGetMore30 = (days) => {
    const newDate = this.addDays(days);
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    axios({
      method: "post",
      url:
        "https://www.oliveservicedapartments.com/olive_api/public/api/property/price",
      data: {
        property_id: localStorage.getItem("property_id"),
        guest: localStorage.getItem("noGuest"),
        roomtype_id: localStorage.getItem("roomType_id"),
        check_in: moment(localStorage.getItem("startDate")).format(
          "YYYY-MM-DD"
        ),
        check_out: moment(newDate).format("YYYY-MM-DD"),
      },
      headers: { Authorization: AuthStr },
    })
      .then((response) => {
        //handle successoptions
        this.setState({
          propertyPrice30: response.data.data,
        });
        switch (this.state.priceType) {
          case "price":
            let propertyPrice1 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.price;
            },
            0);
            let propertyPricecut1 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dprice;
            },
            0);
            this.setState({
              property_price30: propertyPrice1,
              cut_price30: propertyPricecut1,
            });
            break;

          case "refundable_price":
            let propertyPrice2 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.refundable_price;
            },
            0);
            let propertyPricecut2 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.drefundable_price;
            },
            0);
            this.setState({
              property_price30: propertyPrice2,
              cut_price30: propertyPricecut2,
            });
            break;

          case "snrefundable_price":
            let propertyPrice3 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.snrefundable_price;
            },
            0);
            let propertyPricecut3 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dsnrefundable_price;
            },
            0);
            this.setState({
              property_price30: propertyPrice3,
              cut_price30: propertyPricecut3,
            });
            break;

          case "srefundable_price":
            let propertyPrice4 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.srefundable_price;
            },
            0);
            let propertyPricecut4 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dsrefundable_price;
            },
            0);
            console.log("property price message", propertyPrice4);
            this.setState({
              property_price30: propertyPrice4,
              cut_price30: propertyPricecut4,
            });
            break;

          case "pnrefundable_price":
            let propertyPrice5 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.pnrefundable_price;
            },
            0);
            let propertyPricecut5 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dpnrefundable_price;
            },
            0);
            this.setState({
              property_price30: propertyPrice5,
              cut_price30: propertyPricecut5,
            });
            break;

          case "prefundable_price":
            let propertyPrice6 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.prefundable_price;
            },
            0);
            let propertyPricecut6 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dprefundable_price;
            },
            0);
            this.setState({
              property_price30: propertyPrice6,
              cut_price30: propertyPricecut6,
            });
            break;
        }
      })
      .catch(function (response) {
        //handle error
        console.log("Error while calling api", response);
      });
  };

  handleAmenityIndex(index) {
    let amenityIndex = [];
  }

  addDays = (days) => {
    const copy = new Date(localStorage.getItem("startDate"));
    copy.setDate(copy.getDate() + days);
    console.log(copy);
    return copy;
  };

  handleGetMore = (days) => {
    this.setState({
      selectedDate: days,
    });
    localStorage.setItem("noDays", days);
    const newDate = this.addDays(days);
    localStorage.setItem("endDate", newDate);
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    axios({
      method: "post",
      url:
        "https://www.oliveservicedapartments.com/olive_api/public/api/property/price",
      data: {
        property_id: localStorage.getItem("property_id"),
        guest: localStorage.getItem("noGuest"),
        roomtype_id: localStorage.getItem("roomType_id"),
        check_in: moment(localStorage.getItem("startDate")).format(
          "YYYY-MM-DD"
        ),
        check_out: moment(newDate).format("YYYY-MM-DD"),
      },
      headers: { Authorization: AuthStr },
    })
      .then((response) => {
        //handle success
        this.setState({
          propertyPrice: response.data.data,
        });
        localStorage.setItem(
          "property_price",
          JSON.stringify(this.state.propertyPrice)
        );
        localStorage.setItem(
          "layouts",
          JSON.stringify(this.state.propertyPrice)
        );
        console.log("property price ", this.state.propertyPrice);
        switch (this.state.priceType) {
          case "price":
            let propertyPrice1 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.price;
            },
            0);
            let propertyPricecut1 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dprice;
            },
            0);
            console.log("property price message", propertyPrice1);
            localStorage.setItem("dealPrice", propertyPrice1);
            localStorage.setItem("cut_price", propertyPricecut1);
            this.props.handlePriceForMoreDays(propertyPrice1, days);
            this.setState({ property_price: propertyPrice1 });
            this.props.taxcalculation();
            break;

          case "refundable_price":
            let propertyPrice2 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.refundable_price;
            },
            0);
            let propertyPricecut2 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.drefundable_price;
            },
            0);
            console.log("property price message", propertyPrice2);
            localStorage.setItem("dealPrice", propertyPrice2);
            localStorage.setItem("cut_price", propertyPricecut2);
            this.props.handlePriceForMoreDays(propertyPrice2, days);
            this.setState({ property_price: propertyPrice2 });
            this.props.taxcalculation();
            break;

          case "snrefundable_price":
            let propertyPrice3 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.snrefundable_price;
            },
            0);
            let propertyPricecut3 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dsnrefundable_price;
            },
            0);
            console.log("property price message", propertyPrice3);
            localStorage.setItem("dealPrice", propertyPrice3);
            localStorage.setItem("cut_price", propertyPricecut3);
            this.props.handlePriceForMoreDays(propertyPrice3, days);
            this.setState({ property_price: propertyPrice3 });
            this.props.taxcalculation();
            break;

          case "srefundable_price":
            let propertyPrice4 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.srefundable_price;
            },
            0);
            let propertyPricecut4 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dsrefundable_price;
            },
            0);
            console.log("property price message", propertyPrice4);
            localStorage.setItem("dealPrice", propertyPrice4);
            localStorage.setItem("cut_price", propertyPricecut4);
            this.props.handlePriceForMoreDays(propertyPrice4, days);
            this.setState({ property_price: propertyPrice4 });
            this.props.taxcalculation();
            break;

          case "pnrefundable_price":
            let propertyPrice5 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.pnrefundable_price;
            },
            0);
            let propertyPricecut5 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dpnrefundable_price;
            },
            0);
            console.log("property price message", propertyPrice5);
            localStorage.setItem("dealPrice", propertyPrice5);
            localStorage.setItem("cut_price", propertyPricecut5);
            this.props.handlePriceForMoreDays(propertyPrice5, days);
            this.setState({ property_price: propertyPrice5 });
            this.props.taxcalculation();
            break;

          case "prefundable_price":
            let propertyPrice6 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.prefundable_price;
            },
            0);
            let propertyPricecut6 = response.data.data.reduce(function (
              prev,
              cur
            ) {
              return prev + cur.dprefundable_price;
            },
            0);
            console.log("property price message", propertyPrice6);
            localStorage.setItem("dealPrice", propertyPrice6);
            localStorage.setItem("cut_price", propertyPricecut6);
            this.props.handlePriceForMoreDays(propertyPrice6, days);
            this.setState({ property_price: propertyPrice6 });
            this.props.taxcalculation();
            break;
        }
      })
      .catch(function (response) {
        //handle error
        console.log("Error while calling api", response);
      });
  };

  handleDeSelect = () => {
    this.props.handleDeSelect(
      localStorage.getItem("no_days"),
      localStorage.getItem("checkout"),
      localStorage.getItem("dealprice"),
      JSON.parse(localStorage.getItem("Layouts")),
      localStorage.getItem("cut_price_back")
    );
    this.setState({
      selectedDate: 0,
    });
  };

  render() {
    const regex = /(<([^>]+)>)/gi;
    const result = JSON.parse(localStorage.getItem("alltooltips"))
      ? JSON.parse(localStorage.getItem("alltooltips")).thirtydays.replace(
          regex,
          ""
        )
      : "";
    const renderHTML = (escapedHTML) =>
      React.createElement("div", {
        dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(escapedHTML) },
      });
    return (
      <React.Fragment>
        <p className="fw-700 font-cap font-green">Service Packs</p>

        {this.state.val.map((amenity, index) =>
          amenity.room_type ===
          parseInt(localStorage.getItem("aprtment_type_code")) ? (
            <div key={amenity.id} className="addamentycard mb-15">
              <div className="row">
                <div className="amenty-img col-md-1 col-2">
                  <img className="" src={amenity.image} />
                </div>
                <div className="amenty-desc col-md-7 col-10">
                  <p className="fw-700 p4 font-cap">
                    {amenity.amenities_title}
                  </p>
                  <p className="p4">
                    {amenity.description}
                    {/* Fast wi-fi is accessible all around the apartment. */}
                  </p>
                </div>
                <div className=" col-md-4">
                  <div className="amenty-price">
                    <p className="font-green p2 fw-700">
                      {amenity.price_type === 1 ? (
                        <React.Fragment>
                          &#8377;{" "}
                          {parseInt(
                            (localStorage.getItem("dealPrice") *
                              amenity.price) /
                              100
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>&#8377; {amenity.price}</React.Fragment>
                      )}
                    </p>
                    <button
                      key={index}
                      className="listing-btn"
                      onClick={() => {
                        // this.changeButtonText();
                        this.props.addAmenity(
                          amenity.id,
                          amenity.price_type === 1
                            ? parseInt(
                                (localStorage.getItem("dealPrice") *
                                  amenity.price) /
                                  100
                              )
                            : amenity.price,
                          amenity.amenities_title
                        );
                        console.log(
                          "amenity detail from upsell",
                          this.props.amenityDetail
                        );
                        /* eslint no-restricted-globals:0 */
                        // let object = this.props.amenityDetail.find(o => o.amenityName === amenity.amenities_title);
                        // console.info("object here", object);
                        //   object[0].amenityName===amenity.amenities_title?this.setState({add: "Added"}):this.setState({add: "Add"})
                        // this.props.addAmenityName(amenity.amenities_title);
                      }}
                      // >{this.props.selectedKey}</button>
                    >
                      {/* {this.props.selectedKey} */}
                      {this.props.amenityDetail.find(
                        (a) => a["amenityName"] === amenity.amenities_title
                      )
                        ? "remove"
                        : "add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        )}
        {/* <div className="addamentycard mb-15">
          <div className="row">
            <div className="amenty-img col-md-1 col-2">
              <img className="" src={require("../../assets/Cleaning_Circle.png")} />
            </div>
            <div className="amenty-desc col-md-7 col-10">
              <p className="fw-700 p4 font-cap">Paid cleaning</p>
              <p className="p4">
                Fee charged by host to cover the cost of cleaning.
              </p>
            </div>
            <div className=" col-md-4">
              <div className="amenty-price">
                <p className="font-green p2 fw-700">&#8377; 1000</p>
                <button className="listing-btn">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="addamentycard mb-15">
          <div className="row">
            <div className="amenty-img col-md-1 col-2">
              <img className="" src={require("../../assets/Breakfast_Circle.png")} />
            </div>
            <div className="amenty-desc col-md-7 col-10">
              <p className="fw-700 p4 font-cap">english breakfast (egg, bakon etc)</p>
              <p className="p4">
                update your regular breakfast to english  breakfast.
              </p>
            </div>
            <div className=" col-md-4">
              <div className="amenty-price">
                <p className="font-green p2 fw-700">&#8377; 1000</p>
                <button className="listing-btn">Add</button>
              </div>
            </div>
          </div>
        </div> */}
        {/* <p className="fw-700 font-cap mt-30">get more with more days</p>
        <div className="addamentycard mb-15">
          <div className="row">
            <div className="amenty-img col-md-1 col-2">
              <img className="" src={require("../../assets/Apartment.png")} />
            </div>
            <div className="amenty-desc col-md-7 col-10">
              <p className="fw-700 p4 font-cap">
                Book for 15 Days from the date of Check-In only at
              </p>
              <p className="p4">
                {JSON.parse(localStorage.getItem("alltooltips")).fifteendays}
              </p>
            </div>
            <div className=" col-md-4">
              <div className="amenty-price getmore">
                <p className="font-green p2 fw-700">
                  <strike>&#8377; {this.state.cut_price15} </strike> <br />
                  &#8377; {this.state.property_price15}
                </p>
                <button
                  className="listing-btn"
                  key={1}
                  onClick={
                    this.state.selectedDate != 15
                      ? () => {
                          this.handleGetMore(15);
                        }
                      : () => {
                          this.handleDeSelect();
                        }
                  }
                >
                  {this.state.selectedDate === 15 ? "selected" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {localStorage.getItem("noDays") < 30 && (
          <React.Fragment>
            <div className="addamentycard mb-15">
              <div className="row">
                <div className="amenty-img col-md-1 col-2">
                  <img
                    className=""
                    src={require("../../assets/Apartment.png")}
                  />
                </div>
                <div className="amenty-desc col-md-7 col-10">
                  <p className="fw-700 p4 font-cap">
                    Book for 30 Days from the date of Check-In only at
                  </p>
                  <p className="p4">{renderHTML(result)}</p>
                </div>
                <div className=" col-md-4">
                  <div className="amenty-price getmore">
                    <p className="font-green p2 fw-700">
                      <strike>&#8377; {this.state.cut_price30}</strike> <br />
                      &#8377; {this.state.property_price30}
                    </p>
                    <button
                      className="listing-btn"
                      key={2}
                      onClick={
                        this.state.selectedDate != 30
                          ? () => {
                              this.handleGetMore(30);
                            }
                          : () => {
                              this.handleDeSelect();
                            }
                      }
                    >
                      {this.state.selectedDate === 30 ? "selected" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        <div className="fl-100 text-center">
          <button
            onClick={() => this.props.handleClick()}
            className="listing-btn mt-30 mb-30 wid-60 pad2050"
          >
            Continue booking
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default Upsell;
