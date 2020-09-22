import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./apartmentlisting.css";
import { Col, Form, Button, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Route, withRouter } from "react-dom";
import Listingcard from "../listingcard/listingcard";
import Listingpageinputs from "../listingpageinputs/listingpageinputs";
import Addcard from "../addcard/addcard";
import Map from "../map/map";
import { Component } from "react";
import moment from "moment";
import { Helmet } from "react-helmet";
import * as Scroll from "react-scroll";
import queryString from "query-string";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
// import { Helmet } from "react-helmet";

class Apartmentlisting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVal: [],
      propertyId: "",
      city_id: "",
      noGuest:
        queryString.parse(this.props.location.search).guests == "" ||
        queryString.parse(this.props.location.search).guests == undefined
          ? 1
          : parseInt(queryString.parse(this.props.location.search).guests),
      startDate: "",
      endDate: "",
      queryParam: [],
      cityName: "",
      cities: [],
      singleStatus: "",
      loader: false,
    };
  }

  async componentDidMount() {
    var field = "city";
    var url = window.location.href;
    if (url.indexOf("?" + field + "=") == -1) {
      console.log("data from url", url.indexOf("?" + field + "="));
      window.location.pathname == "/" + this.props.match.params.cityId + "/h"
        ? this.props.history.push(
            `/${this.props.match.params.cityId}/h?city=${
              this.props.match.params.cityId.charAt(0).toUpperCase() +
              this.props.match.params.cityId.slice(1)
            }&id=${this.state.city_id}&startDate=&endDate=&guests=${
              this.state.noGuest
            }`
          )
        : this.props.history.push(
            `/${this.props.match.params.cityId}?city=${
              this.props.match.params.cityId.charAt(0).toUpperCase() +
              this.props.match.params.cityId.slice(1)
            }&id=${this.state.city_id}&startDate=&endDate=&guests=${
              this.state.noGuest
            }`
          );

      // window.location.reload();
      // e.preventDefault();

      // return false;

      // window.location.reload();
    }
    // getting city id from URL
    // alert(this.props.match.params.cityId);
    let cityArray = 
    url.indexOf("?" + field + "=") == -1 &&
    await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    )
    let cityArray1 = cityArray ? cityArray.data : JSON.parse(localStorage.getItem("cities"));
    const { cityId } = this.props.match.params;
    this.setState({
      cityName: cityId.charAt(0).toUpperCase() + cityId.slice(1),
    });
    const { h } = this.props.match.params;
    h === "h"
      ? this.setState({ singleStatus: "1" })
      : this.setState({ singleStatus: "0" });
    let uniqueId;
    let cityID = cityArray1.map((item) => {
      if (item.city_name.toLowerCase() === cityId) {
        console.log("city id is1: -", item.id);
        this.setState({
          city_id: item.id,
        });
        uniqueId = item.id;
      }
    });

    let datafromurl = queryString.parse(this.props.location.search);
    // getting parameter from query string
    let queryParam =
      queryString.parse(this.props.location.search) &&
      queryString.parse(this.props.location.search);
    this.setState({
      queryParam: queryParam,
    });
    console.log("query param", window.location.pathname);

    console.log(
      `https://www.oliveservicedapartments.com/olive_api/public/api/properties?city_id=${uniqueId}&from=${queryParam.startDate}&to=${queryParam.endDate}&guest=${queryParam.guests}&form_price=1000&to_price`
    );
    const res =
      window.location.pathname == "/" + this.props.match.params.cityId + "/h"
        ? await axios.get(
            `https://www.oliveservicedapartments.com/olive_api/public/api/properties?city_id=${uniqueId}&from=${queryParam.startDate}&to=${queryParam.endDate}&guest=${queryParam.guests}&form_price=1000&to_price=10000&single=1`
          )
        : await axios.get(
            `https://www.oliveservicedapartments.com/olive_api/public/api/properties?city_id=${uniqueId}&from=${queryParam.startDate}&to=${queryParam.endDate}&guest=${queryParam.guests}&form_price=1000&to_price=10000&single=0`
          );
    console.log(res.data);
    this.setState({
      dataVal: res.data,
    });
    let scroll = Scroll.animateScroll;
    scroll.scrollToTop();
    this.setState({
      startDate:
        queryParam.startDate instanceof Date && !NaN(queryParam.startDate)
          ? new Date(queryParam.startDate)
          : "",
      endDate:
        queryParam.endDate instanceof Date &&
        !NaN(queryParam.endDate) &&
        new Date(queryParam.endDate),
      // startDate: new Date(queryParam.startDate),
      // endDate: new Date(queryParam.endDate),
    });
  }

  // function of listingInput
  handleChange = (date) => {
    this.setState({
      startDate: date,
      endDate: new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000),
    });
  };

  handleEndDate = (dateValue) => {
    this.setState({
      endDate: dateValue,
    });
  };
  onclick = (type) => {
    // if (type == "adds") {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) + 1,
    //   });
    // } else {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) - 1,
    //   });
    // }
    this.setState((prevState) => {
      return {
        noGuest:
          type == "subs" && prevState.noGuest > 1
            ? parseInt(prevState.noGuest) - 1
            : type == "adds" && prevState.noGuest >= 1
            ? parseInt(prevState.noGuest) + 1
            : 1,
      };
    });
    // alert(this.state.noGuest);
  };

  handleClickForlisting = (e) => {
    // let scroll = Scroll.animateScroll;
    // scroll.scrollTo(200);
    console.log("no of guests", this.state.noGuest);
    this.setState({
      loader: true,
    });
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 3000);
    this.props.history.push(
      `/${this.state.cityName.toLowerCase()}?city=${this.state.cityName}&id=${
        this.state.city_id
      }&startDate=${
        this.state.startDate
          ? moment(this.state.startDate).format("YYYY-MM-DD")
          : this.state.queryParam.startDate
      }&endDate=${
        this.state.endDate
          ? moment(this.state.endDate).format("YYYY-MM-DD")
          : this.state.queryParam.endDate
      }&guests=${this.state.noGuest ? this.state.noGuest : this.state.queryParam.guests}`
    );
      window.location.pathname == "/" + this.props.match.params.cityId + "/h"
        ?  axios.get(
            `https://www.oliveservicedapartments.com/olive_api/public/api/properties?city_id=${this.state.city_id}
            &from=${this.state.startDate
            ? moment(this.state.startDate).format("YYYY-MM-DD")
            : this.state.queryParam.startDate}
            &to=${this.state.endDate
              ? moment(this.state.endDate).format("YYYY-MM-DD")
              : this.state.queryParam.endDate}
              &guest=${this.state.noGuest ? this.state.noGuest : this.state.queryParam.guests}
              &form_price=1000&to_price=10000&single=1`
          ).then(resp => 
            this.setState({
              dataVal: resp.data,
            }))
        :  axios.get(
            `https://www.oliveservicedapartments.com/olive_api/public/api/properties?city_id=${this.state.city_id}&from=${moment(this.state.startDate).format("YYYY-MM-DD")}&to=${moment(this.state.endDate).format("YYYY-MM-DD")}&guest=${this.state.noGuest}&form_price=1000&to_price=10000&single=0`
          ).then(
            resp => this.setState({
              dataVal: resp.data,
            })
          )
    e.preventDefault();
  };

  handleClick = (apartment, singlestatus) => {
    // localStorage.setItem("single", 0);
    // alert(this.state.noGuest);
    // return false;
    // alert(this.state.noGuest);
    let datafromurl = queryString.parse(this.props.location.search);

    let url;
    singlestatus == "1"
      ? (url = `/${this.state.cityName.toLowerCase()}/h/${apartment}?city=${
          this.state.cityName
        }&id=${this.state.city_id}&startDate=${
          datafromurl.startDate != ""
            ? moment(datafromurl.startDate).format("YYYY-MM-DD")
            : ""
        }&endDate=${
          datafromurl.endDate != ""
            ? moment(datafromurl.endDate).format("YYYY-MM-DD")
            : ""
        }&guests=${this.state.noGuest}`)
      : (url = `/${this.state.cityName.toLowerCase()}/${apartment}?city=${
          this.state.cityName
        }&id=${this.state.city_id}&startDate=${
          datafromurl.startDate != ""
            ? moment(datafromurl.startDate).format("YYYY-MM-DD")
            : ""
        }&endDate=${
          datafromurl.endDate != ""
            ? moment(datafromurl.endDate).format("YYYY-MM-DD")
            : ""
        }&guests=${this.state.noGuest}`);

    window.open(url);
  };

  handleCallbackPropertId = (idForProperty) => {
    this.setState({
      propertyId: idForProperty,
    });
    console.log(idForProperty);
    this.props.handleIdForProperty11(idForProperty);
  };

  render() {
    console.log("queryParammmm", this.state.endDate);
    console.log("single status", queryString.parse(this.props.location.search));
    return (
      <div>
        {this.state.cityName === "Delhi" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Delhi - Rent Best Serviced Apartments in Delhi
            </title>
            <meta
              name="description"
              content="Serviced Apartments Delhi - Best Serviced Apartments in Delhi with Kitchen at City Centre Locations. Furnished Flats Studio/1/2 BHK Vacation Rentals"
            />
          </Helmet>
        )}
        {this.state.cityName === "Gurgaon" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Gurgaon - Rent Serviced Apartments Gurgaon
            </title>
            <meta
              name="description"
              content="Serviced Apartments Gurgaon - Best Serviced Apartments in Gurgaon with Kitchen at prime locations. Furnished Flats Studio/1/2 BHK Vacation Rentals"
            />
          </Helmet>
        )}
        {this.state.cityName === "Hyderabad" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Hyderabad, Rent Serviced Apartments Hyderabad
            </title>
            <meta
              name="description"
              content="Best Serviced Apartments in Hyderabad - Hitech City & Jubilee Hills. Fully Serviced Apartments with Kitchen in Hyderabad - Short Term Rentals Hyderabad"
            />
          </Helmet>
        )}
        {this.state.cityName === "Jaipur" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Jaipur | Rent Best Serviced Apartments Jaipur
            </title>
            <meta
              name="description"
              content="Serviced Apartments Jaipur | Rent Best Serviced Apartments Jaipur"
            />
          </Helmet>
        )}
        {this.state.cityName === "Noida" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Noida | Rent Best Serviced Apartments in Noida
            </title>
            <meta
              name="description"
              content="Best Serviced Apartments in Noida with Kitchen - City Centre & IT Hub SEZ. Corporate Housing, Short Term Rentals Noida - Studio 1/2 BHK Furnished Flats"
            />
          </Helmet>
        )}
        {this.state.cityName === "Kolkata" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Kolkata | Rent Best Serviced Apartments
              Kolkata
            </title>
            <meta
              name="description"
              content="Serviced Apartments Kolkata - Best Serviced Apartments in Kolkata with Kitchen. Salt Lake, NewTown - Furnished Flats Studio/1/2 BHK Vacation Rentals
"
            />
          </Helmet>
        )}
        {this.state.cityName === "Bangalore" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Bangalore | Rent Serviced Apartments Bangalore
            </title>
            <meta
              name="description"
              content="Top Serviced Apartments in Bangalore with Kitchen HSR Layout & Koramangala. Corporate Housing ShortTerm Rentals near Electronic City & Bellandur Bangalore"
            />
          </Helmet>
        )}
        {this.state.cityName === "Goa" && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Serviced Apartments Goa | Rent Best Serviced Apartments in Goa
            </title>
            <meta
              name="description"
              content="Serviced Apartments Goa - Best Serviced Apartments in Goa with Kitchen. North & South Goa - Furnished Flats Studio/1/2 BHK Vacation Rentals Holiday Villa"
            />
          </Helmet>
        )}

        {/* listing page */}
        {/* listing card */}
        <section className="pad-45 bg-grey">
          <div className="container">
            <Listingpageinputs
              cityName={this.state.cityName}
              handleClickForlisting={this.handleClickForlisting}
              queryParam={queryString.parse(this.props.location.search)}
              city_id={this.state.city_id}
              cityName={this.state.cityName}
              handleChange={this.handleChange}
              handleEndDate={this.handleEndDate}
              onclick={this.onclick}
              noGuest={this.state.noGuest}
            />
            <div className="row">
              {this.state.loader == true && (
                <div className="col-md-12">
                  <Loader
                    type="ThreeDots"
                    color="#5db64c"
                    height={80}
                    width={80}
                    timeout={3000} //3 secs
                  />
                </div>
              )}
              {/* <div className=" col-md-12 mb-20"></div> */}
              <div className="col-md-8">
                <h1 className=" mb-20">
                  {this.state.cityName.charAt(0).toUpperCase() +
                    this.state.cityName.slice(1)}
                </h1>
                {this.state.dataVal.map((list) => (
                  <Listingcard
                    key={list.id}
                    keyVal={list.id}
                    limages={list.images}
                    amenities={list.amenities}
                    ratings={parseInt(list.rating)}
                    listingCardTitle={list.property_title}
                    listingregion_name={list.region_name}
                    listingCardDesc={list.short_details}
                    handleClick={this.handleClick}
                    handleIdForProperty1={this.handleCallbackPropertId}
                    listing_slug={list.slug}
                    cityName={
                      this.state.cityName.charAt(0).toUpperCase() +
                      this.state.cityName.slice(1)
                    }
                    property_separate_id={list.property_separate_id}
                  />
                ))}
              </div>
              <div className="col-md-4">
                <p className="fl-100 p2 map-title">Showing map results</p>
                <Map city={this.props.cityName} cityid={this.state.city_id} />
                <Addcard
                  addImg={require("../../assets/listingcard/Saving.png")}
                  addTitle="Bigger space, bigger saving"
                  addDesc="Book a 2 or 3 Bedroom Apartment & Get 15% Weekly & 30% Monthly discount."
                />
                <Addcard
                  addImg={require("../../assets/listingcard/Discount.png")}
                  addTitle="Stay More, Save More!"
                  addDesc="Book a studio or 1 Bedroom Apartment & Get 10% Weekly & 20% Monthly discount."
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Apartmentlisting;
