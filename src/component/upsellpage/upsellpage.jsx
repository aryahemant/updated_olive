import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./upsellpage.css";
import Registerform from "../registerform/registerform";
import Checkoutdetail from "../checkoutdetail/checkoutdetail";
import Addcard from "../addcard/addcard";
import axios from "axios";
import moment from "moment";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Checkbox,
} from "semantic-ui-react";
import Upsell from "../upsell/upsell";
import { Helmet } from "react-helmet";
import queryString from "query-string";
// import Form from "react-bootstrap/Form";

// import { Route, withRouter } from "react-dom";

class Upsellpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amenityName: "",
      amenityPrice: 0,
      amenityDetail: [],
      nobeds: this.props.nobeds,
      selected: "Add",
      addedamenity: "",
      componentType1: false,
      singleStatus: "",
      cityName: "",
      queryParam: "",
      // noDays: null,
      // selectedKey: 'Add'
    };
  }

  componentDidMount() {
    let queryParam = queryString.parse(this.props.location.search);
    if (
      new Date(queryParam.startDate) < new Date(new Date().getDate() - 1) ||
      new Date(queryParam.endDate) < new Date(new Date())
    ) {
      this.props.history.push(
        `/${queryParam.city.toLowerCase()}/${queryParam.property_slug}?city=${
          queryParam.city
        }&id=${queryParam.id}&startDate=&endDate=&guests=1`
      );
    }

    const { h } = this.props.match.params;
    h === "h"
      ? this.setState({ singleStatus: "1" })
      : this.setState({ singleStatus: "0" });

    this.setState({
      componentType1: true,
    });
    this.setState({
      queryParam: queryString.parse(this.props.location.search),
    });
    const { cityName } = this.props.match.params;
    localStorage.setItem(
      "cityName",
      cityName.charAt(0).toUpperCase() + cityName.slice(1)
    );
    this.setState({
      cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1),
    });
    console.log("cityName", this.state.cityName);
    window.scrollTo(0, 0);
  }

  handleAmenityDetail = () => {
    this.props.handleAmenityDetail();
  };
  handleDiscountPrice = (price) => {
    console.log("discount price in upsellpage", price);
    this.props.handleDiscountPrice(price);
  };

  addAmenity = (id, price, name) => {
    this.props.addAmenity(id, price, name);
  };
  handleClick = () => {
    localStorage.getItem("singleStatus") === "1"
      ? this.props.history.push(
          `/${this.state.cityName.toLowerCase()}/h/${localStorage
            .getItem("listing_slug")
            .toLowerCase()}/checkout?city=${this.state.queryParam.city}&id=${
            this.state.queryParam.id
          }&startDate=${this.state.queryParam.startDate}&endDate=${
            this.state.queryParam.endDate
          }&guests=${
            this.state.queryParam.guests
          }&property_slug=${localStorage.getItem("listing_slug").toLowerCase()}`
        )
      : this.props.history.push(
          `/${localStorage
            .getItem("cityName")
            .toLowerCase()}/${localStorage.getItem(
            "listing_slug"
          )}/checkout?city=${this.state.queryParam.city}&id=${
            this.state.queryParam.id
          }&startDate=${this.state.queryParam.startDate}&endDate=${
            this.state.queryParam.endDate
          }&guests=${
            this.state.queryParam.guests
          }&property_slug=${localStorage.getItem("listing_slug").toLowerCase()}`
        );
  };

  handleNoDays = (days) => {
    console.log("days", days);
    // this.setState({
    //   noDays: days,
    //   selectedKey: 'Added'
    // })
    this.props.handleNoDays(days);
  };

  handlePriceForMoreDays = (price, days) => {
    this.props.handlePriceForMoreDays(price, days);
  };

  taxcalculation = () => {
    this.props.taxcalculation();
  };

  handleDiscountSection = (discount) => {
    this.props.handleDiscountSection(discount);
  };
  removediscount = () => {
    this.props.removediscount();
  };
  handleDeSelect = (nodays, checkout, dealprice, layouts, cutprice) => {
    this.props.handleDeSelect(nodays, checkout, dealprice, layouts, cutprice);
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
        </Helmet>
        {/* login */}
        <section className="pad-45 bg-grey">
          <div className="container ">
            <div className="row">
              <div className="col-md-12">
                <h1 className="font-green font-cap mb-50">checkout</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <Upsell
                  addAmenity={this.addAmenity}
                  handleClick={this.handleClick}
                  amenityDetail={this.props.amenityDetail}
                  selectedKey={this.state.selected}
                  handleNoDays={this.handleNoDays}
                  handlePriceForMoreDays={this.handlePriceForMoreDays}
                  taxcalculation={this.taxcalculation}
                  handleDeSelect={this.handleDeSelect}
                  queryParam={queryString.parse(this.props.location.search)}
                />
              </div>
              <div className="col-md-4">
                <Checkoutdetail
                  price={this.props.amenityPrice}
                  amenityDetail={this.props.amenityDetail}
                  apartmentTitle={this.props.apartmentTitle}
                  nobeds={this.props.nobeds}
                  nobath={this.props.nobath}
                  cancelType={this.props.cancelType}
                  cancelTypeImage={this.props.cancelTypeImage}
                  dealPrice={this.props.dealPrice}
                  apartmentName={this.props.apartmentName}
                  apartmentImage={this.props.apartmentImage}
                  stdToSupPrice={this.props.stdToSupPrice}
                  stdToSupPriceFree={this.props.stdToSupPriceFree}
                  supToPre={this.props.supToPre}
                  supToPreFree={this.props.supToPreFree}
                  days={this.props.days}
                  handleDiscountPrice={this.handleDiscountPrice}
                  discountPrice1={this.props.discountPrice}
                  noDays={this.props.noDays}
                  propertyPrice={this.props.price}
                  calculatedtax={this.props.calculatedtax}
                  taxcalculation={this.taxcalculation}
                  handleDiscountSection={this.handleDiscountSection}
                  discountsec={this.props.discountsec}
                  removediscount={this.removediscount}
                  handleClick={this.handleClick}
                  componentType1={this.state.componentType1}
                  cityName={this.state.cityName}
                  queryParam={queryString.parse(this.props.location.search)}
                  regionName={this.props.regionName}
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
                    class="help-img"
                    src={require("../../assets/Booking_Help.png")}
                  />
                  <div className="help-detail">
                    <p class="fw-700  font-cap mb-10">want booking help?</p>
                    <div className="hr-line-left-thick"></div>
                    <p class="fw-700 font-green font-cap mb-10">9015080080</p>
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
export default Upsellpage;
