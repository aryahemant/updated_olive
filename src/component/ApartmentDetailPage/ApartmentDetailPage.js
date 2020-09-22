import React, { Component } from 'react';
import Header from '../header/header';
import Map from '../map/map';
import Apartmentdetails from '../apartmentdetails/apartmentdetails';
import Dealscard from '../dealscard/dealscard';
import Detailsearch from '../detailsearch/detailsearch';
import Apartmentcategory from '../apartmentcategory/apartmentcategory';
import Apartmentdetailstitle from '../apartmentdetailstitle/apartmentdetailstitle';
import parser from "html-react-parser";
import swal from "sweetalert";

import Titlebanner from '../titlebanner/titlebanner';
import ReadMoreAndLess from 'react-read-more-less';
import LongText from '../Longtext/longtext';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import OwlCarousel from 'react-owl-carousel';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'circular-std';
import { Rate } from "antd";
import './style.css';
import { Modal } from 'antd';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl, Tab, Tabs } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink, Redirect
} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { Helmet } from "react-helmet";
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import MetaTags from 'react-meta-tags';
const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

const TabPane = Tabs.TabPane;
const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

class ApartmentDetailPage extends Component {
  state = { visible: false };
  constructor(props) {
    // let queryParam = queryString.parse(this.props.location.search);

    super(props)
    // const token = localStorage.getItem("login")
    // let loggedIn = true
    // if(token == null)
    // {
    //   loggedIn = false
    // }
    this.state = {
      // loggedIn ,
      propertyData: [],
      idForProperty: '',
      propertyLayouts: [],
      isOpen: true,
      propertyImages: [],
      no_of_days: 0,
      popupfor: '',
      city_id: "",
      noGuest: queryString.parse(this.props.location.search).guests == undefined ? 1 : parseInt(queryString.parse(this.props.location.search).guests),
      startDate:
        queryString.parse(this.props.location.search).startDate == "" || queryString.parse(this.props.location.search).startDate == undefined || new Date(queryString.parse(this.props.location.search).startDate).valueOf() < new Date().valueOf()
          ? ""
          : new Date(queryString.parse(this.props.location.search).startDate),
      endDate:
        queryString.parse(this.props.location.search).endDate == "" || queryString.parse(this.props.location.search).endDate == undefined || new Date(queryString.parse(this.props.location.search).startDate).valueOf() < new Date().valueOf()
          ? ""
          : new Date(queryString.parse(this.props.location.search).endDate),
      property_id: '',
      cityName: window.location.href.indexOf("?" + "city" + "=") == -1 ? "" : queryString.parse(this.props.location.search).city.toLowerCase(),
      singleStatus: '',
      cities: [],
      testimonials: [],
      loader: false,
      no_days: null
    }
  }
  showModal = (name) => {
    this.setState({
      visible: true,
      popupfor: name
    });
  };


  handleCancel = e => {
    console.log(e);
    this.setState({
      // apartmentImage={this.state.prope

      visible: false,
    });
  }
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };
  // handleOk = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // };

  // handleCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     // apartmentImage={this.state.prope
  //     visible: false,
  //   });
  // }

  async componentDidMount() {
    let noGuest = queryString.parse(this.props.location.search).guests == undefined ? 1 : parseInt(queryString.parse(this.props.location.search).guests);
    let startDate =
      queryString.parse(this.props.location.search).startDate == "" || queryString.parse(this.props.location.search).startDate == undefined || new Date(queryString.parse(this.props.location.search).startDate).valueOf() < new Date().valueOf()
        ? ""
        : new Date(queryString.parse(this.props.location.search).startDate);
    let endDate =
      queryString.parse(this.props.location.search).endDate == "" || queryString.parse(this.props.location.search).endDate == undefined || new Date(queryString.parse(this.props.location.search).startDate).valueOf() < new Date().valueOf()
        ? ""
        : new Date(queryString.parse(this.props.location.search).endDate);
    // let cityArray = this.props.cities && this.props.cities;
    // direct link to detail page
    //setState of number of days
    const copy = new Date(startDate ? startDate : new Date());
    const day = Math.ceil((new Date(endDate) - copy) / (1000 * 60 * 60 * 24))
    console.log("date sub", day);
    this.setState({
      no_days: day
    })
    // alert(startDate);
    const { cityName } = this.props.match.params;
    const { apartment } = this.props.match.params;
    var field = "city";
    var url = window.location.href;
    if (url.indexOf("?" + field + "=") == -1 && !this.props.location.search) {
      console.log("data from url");
      window.location.pathname == "/" + cityName + "/h" + apartment
        ? this.props.history.push(
          `/${cityName}/h/${apartment}?city=${
          cityName.charAt(0).toUpperCase() +
          cityName.slice(1)
          }&id=${this.state.city_id}&startDate=${startDate}&endDate=${endDate}&guests=1`
        )
        : this.props.history.push(
          `/${cityName}/${apartment}?city=${
          cityName.charAt(0).toUpperCase() +
          cityName.slice(1)
          }&id=${this.state.city_id}&startDate=${startDate}&endDate=${endDate}&guests=1`
        );
      // window.location.reload();
    }
    let cityArray =
      url.indexOf("?" + field + "=") == -1 &&
      await axios.get(
        `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
      )
    let cityArray1 = cityArray ? cityArray.data : JSON.parse(localStorage.getItem("cities"));

    console.log("city array", url.indexOf("?" + field + "="), cityArray1);
    console.info("all string", queryString.parse(this.props.location.search).endDate);
    if (startDate.valueOf() < new Date().valueOf() || endDate.valueOf() < new Date().valueOf()) {
      console.log("query ", startDate, endDate);
      this.props.history.push(`/${cityName.toLowerCase()}/${apartment}?city=${cityName.charAt(0).toUpperCase() +
        cityName.slice(1)}&id=${this.state.city_id}&startDate=${startDate
        }&endDate=${
        endDate
        }&guests=1`
      );
    }
    setTimeout(function () { localStorage.clear(); }, 1000 * 60 * 60);

    // const res = await axios.get(
    //   `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    // );
    // this.setState({
    //   cities: res.data
    // })
    console.log("city id is: ", this.state.cities);
    this.setState({
      cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1),
      slug: apartment
    })
    let uniqueId;
    cityArray1.map((item) => {
      if (item.city_name === cityName.charAt(0).toUpperCase() + cityName.slice(1)) {
        console.log("city id is in detaial: -", item.id);
        this.setState({
          city_id: item.id,
        });
        uniqueId = item.id;
      }
    });
    const { h } = this.props.match.params;
    h === "h" ?
      this.setState({ singleStatus: '1' })
      :
      this.setState({ singleStatus: '0' })

    const response = h === 'h'
      ? await axios.get(
        `https://www.oliveservicedapartments.com/olive_api/public/api/properties?city_id=${
        uniqueId
        }&from=${moment(this.state.startDate).format(
          "YYYY-MM-DD"
        )}&to=${moment(this.state.endDate).format("YYYY-MM-DD")}&guest=${
        this.state.noGuest
        }&form_price=1000&to_price=10000 &single=${this.state.singleStatus}`
      )
      : await axios.get(
        `https://www.oliveservicedapartments.com/olive_api/public/api/properties?city_id=${
        uniqueId
        }&from=${moment(this.state.startDate).format(
          "YYYY-MM-DD"
        )}&to=${moment(this.state.endDate).format("YYYY-MM-DD")}&guest=${
        this.state.noGuest
        }&form_price=1000&to_price=10000`
      );
    console.log("property slug", apartment, response.data, this.state.noGuest, this.state.startDate);
    let propertyId;
    response.data.map(item => {
      if (item.slug === apartment) {
        this.setState({
          property_id: item.id
        })
        propertyId = item.id;
      }
    })


    const resp = await axios.get(`https://www.oliveservicedapartments.com/olive_api/public/api/property/${propertyId}?from_date=${
      this.state.startDate && moment(this.state.startDate).format("YYYY-MM-DD")}&to_date=${
      this.state.endDate && moment(this.state.endDate).format("YYYY-MM-DD")}&guest=${this.state.noGuest}&from_price=1000&to_price=10000`);
    this.setState({
      propertyData: resp.data.property,
      propertyLayouts: resp.data.property.layouts,
      propertyImages: resp.data.property.layouts.image
    });

    this.setState({
      loader: false,
    })

    const testimonialresp = await axios.get(`https://www.oliveservicedapartments.com/olive_api/public/api/property/reviews/${propertyId}`);

    console.info("testimonials", testimonialresp.data.data);
    for (let i = 0; resp.data.property.layouts.length > i; i++) {
      // console.info("property night lenght", this.state.propertyLayouts[i].prices)
      if (resp.data.property.layouts[i].prices.length > 0) {
        this.setState({
          no_of_days: resp.data.property.layouts[i].prices.length
        })
      }

    }
    console.log("detail type of price", typeof this.state.propertyData.short_details);
    // this.handlePrice1();
    // let scroll = Scroll.animateScroll;
    // scroll.scrollTo(600);
    this.setState({
      startDate:
        this.state.startDate == "" || new Date(this.state.startDate).valueOf() < new Date().valueOf()
          ? ""
          : new Date(this.state.startDate),
      endDate:
        this.state.endDate == "" || new Date(this.state.endDate).valueOf() < new Date().valueOf()
          ? ""
          : new Date(this.state.endDate),
      noGuest: this.state.noGuest,
      testimonials: testimonialresp.data.data,
    })
    console.log("startDate", this.state.startDate);
    if (this.state.propertyData.property_separate_id == 1) {
      if (url.indexOf("?" + field + "=") != -1) {
        this.props.history.push(
          `/${this.state.cityName.toLowerCase()}/h/${
          this.state.propertyData.slug
          }?city=${this.state.cityName}&id=${this.state.city_id}&startDate=${
          queryString.parse(this.props.location.search).startDate != ""
            ? moment(new Date(queryString.parse(this.props.location.search).startDate)).format("YYYY-MM-DD")
            : ""
          }&endDate=${
          queryString.parse(this.props.location.search).endDate != ""
            ? moment(new Date(queryString.parse(this.props.location.search).startDate)).format("YYYY-MM-DD")
            : ""
          }&guests=${this.state.noGuest}`
        );
      }
    } else {
      if (url.indexOf("?" + field + "=") != -1) {
        this.props.history.push(
          `/${this.state.cityName.toLowerCase()}/${
          this.state.propertyData.slug
          }?city=${this.state.cityName}&id=${this.state.city_id}&startDate=${
          queryString.parse(this.props.location.search).startDate != ""
            ? moment(new Date(queryString.parse(this.props.location.search).startDate)).format("YYYY-MM-DD")
            : ""
          }&endDate=${
          queryString.parse(this.props.location.search).endDate != ""
            ? moment(new Date(queryString.parse(this.props.location.search).endDate)).format("YYYY-MM-DD")
            : ""
          }&guests=${queryString.parse(this.props.location.search).guests}`
        );
      }
    }
    if (localStorage.getItem("policies") === null) {
      const policiseresp = await axios.get(
        `https://www.oliveservicedapartments.com/olive_api/public/api/policies`
      );
      localStorage.setItem("policies", JSON.stringify(policiseresp.data.policies));
      localStorage.setItem("alltooltips", JSON.stringify(policiseresp.data.policies));
    }

    this.props.handleRegionName(resp.data.property.region_name);
  }

  handleAccordion = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleApartmentTitle = (title) => {
    console.log("apartmentTitle", title);
    this.props.handleApartmentTitle(title);
  }
  handleNoBeds = (beds) => {
    this.props.handleNoBeds(beds);
  }
  handleNoBath = (bath) => {
    this.props.handleNoBath(bath);
  }
  handleCancelType = (cancel) => {
    this.props.handleCancelType(cancel);
  }
  handleCancelTypeImage = (img) => {
    this.props.handleCancelTypeImage(img);
  }
  handledealPrice = (price) => {
    this.props.handledealPrice(price);
  }
  handleApartmentName = (name) => {
    this.props.handleApartmentName(name);
  }
  handleApartmentImage = (image) => {
    this.props.handleApartmentImage(image);
  }
  handleStdToSupHot = (supPrice) => {
    this.props.handleStdToSupHot(supPrice);
  }
  handleStdToSupHotFree = (stdToSupFree) => {
    this.props.handleStdToSupHotFree(stdToSupFree);
  }
  handleSupToPre = (supToPre) => {
    this.props.handleSupToPre(supToPre);
  }
  handleSupToPreFree = (supToPreFree) => {
    this.props.handleSupToPreFree(supToPreFree);
  }

  // functions of detail search

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDate = (dateValue) => {
    // alert(dateValue);
    // this.setState({
    //   endDate: dateValue,
    // });
    this.setState({
      loader: true,
    })
    this.setState(
      {
        endDate: dateValue,
      },
      () => {
        console.log("arrya with amenity detil ", this.state.endDate);
      }
    );
    this.props.history.push(
      `/${this.state.cityName.toLowerCase()}/${this.state.propertyData.slug}?city=${
      this.state.cityName
      }&id=${this.state.city_id}&startDate=${moment(
        this.state.startDate
      ).format("YYYY-MM-DD")}&endDate=${moment(dateValue).format(
        "YYYY-MM-DD"
      )}&guests=${this.state.noGuest}`
    );
    // alert(`/${this.state.cityName.toLowerCase()}/${this.state.slug}?city=${
    //   this.state.cityName
    //   }&id=${this.state.city_id}&startDate=${moment(
    //     this.state.startDate
    //   ).format("YYYY-MM-DD")}&endDate=${moment(dateValue).format(
    //     "YYYY-MM-DD"
    //   )}&guests=${this.state.noGuest}`)

    // this.componentDidMount();
    let response = [];
    axios.get(`https://www.oliveservicedapartments.com/olive_api/public/api/property/${this.state.property_id}?from_date=${
      this.state.startDate && moment(this.state.startDate).format("YYYY-MM-DD")}&to_date=${
      dateValue && moment(dateValue).format("YYYY-MM-DD")}&guest=${this.state.noGuest}&from_price=1000&to_price=10000`)
      .then(resp => {
        for (let i = 0; resp.data.property.layouts.length > i; i++) {
          console.info("property night lenght again", resp.data.property.layouts[i].prices)
          if (resp.data.property.layouts[i].prices.length > 0) {
            this.setState({
              no_of_days: resp.data.property.layouts[i].prices.length
            })
          }
        }
        this.setState({
          propertyData: resp.data.property,
          propertyLayouts: resp.data.property.layouts,
          propertyImages: resp.data.property.layouts.image,
          loader: false
        });
      }
      )
  };

  showNoDays = (date) => {
    console.log("date ", date);
    const copy = new Date(this.state.startDate ? this.state.startDate : new Date());
    const day = Math.ceil((new Date(date) - copy) / (1000 * 60 * 60 * 24))
    console.log("date sub", day);
    this.setState({
      no_days: day
    })
  }
  show = () => {
    console.log("date ", this.state.endDate);
    const copy = new Date(this.state.startDate ? this.state.startDate : new Date());
    const day = Math.ceil((new Date(this.state.endDate) - copy) / (1000 * 60 * 60 * 24))
    console.log("date sub", day);
    this.setState({
      no_days: day
    })
  }

  onclick = (type) => {
    // if (type == "adds") {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) + 1,
    //     loader: true
    //   });
    // } else {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) - 1,
    //     loader: true
    //   });
    // }
    this.setState({
      loader: true,
    })
    this.setState((prevState) => {
      return {
        noGuest:
          type == "subs" && prevState.noGuest > 1
            ? prevState.noGuest - 1
            : type == "adds" && prevState.noGuest >= 1
              ? prevState.noGuest + 1
              : 1,
      };
    });
    localStorage.setItem("noGuest", type == "subs" && this.state.noGuest > 1
      ? this.state.noGuest - 1
      : type == "adds" && this.state.noGuest >= 1
        ? this.state.noGuest + 1
        : 1);

    // alert(this.state.noGuest);
    this.props.history.push(
      `/${this.state.cityName.toLowerCase()}/${this.state.slug}?city=${
      this.state.cityName
      }&id=${this.state.city_id}&startDate=${moment(
        this.state.startDate
      ).format("YYYY-MM-DD")}&endDate=${moment(this.state.startDate).format(
        "YYYY-MM-DD"
      )}&guests=${type == "subs" && this.state.noGuest > 1
        ? this.state.noGuest - 1
        : type == "adds" && this.state.noGuest >= 1
          ? this.state.noGuest + 1
          : 1}`
    );
    // alert(`/${this.state.cityName.toLowerCase()}/${this.state.slug}?city=${
    //   this.state.cityName
    //   }&id=${this.state.city_id}&startDate=${moment(
    //     this.state.startDate
    //   ).format("YYYY-MM-DD")}&endDate=${moment(dateValue).format(
    //     "YYYY-MM-DD"
    //   )}&guests=${this.state.noGuest}`)
    axios.get(`https://www.oliveservicedapartments.com/olive_api/public/api/property/${this.state.property_id}?from_date=${
      this.state.startDate && moment(this.state.startDate).format("YYYY-MM-DD")}&to_date=${
      this.state.endDate && moment(this.state.endDate).format("YYYY-MM-DD")}&guest=${type == "subs" && this.state.noGuest > 1
        ? this.state.noGuest - 1
        : type == "adds" && this.state.noGuest >= 1
          ? this.state.noGuest + 1
          : 1}&from_price=1000&to_price=10000`)
      .then(resp => {
        for (let i = 0; resp.data.property.layouts.length > i; i++) {
          console.info("property night lenght again", resp.data.property.layouts[i].prices)
          if (resp.data.property.layouts[i].prices.length > 0) {
            this.setState({
              no_of_days: resp.data.property.layouts[i].prices.length
            })
          }
        }
        this.setState({
          propertyData: resp.data.property,
          propertyLayouts: resp.data.property.layouts,
          propertyImages: resp.data.property.layouts.image,
          no_of_days: resp.data.property.layouts[0].prices.length,
          loader: false,

        })
      }
      )

  }

  handleDetailSearch = () => {
    let scroll = Scroll.animateScroll;
    scroll.scrollTo(600);
    console.log("city id", this.state.city_id);
    this.props.history.push(
      `/${this.state.cityName.toLowerCase()}/${this.state.slug}?city=${
      this.state.cityName
      }&id=${this.state.city_id}&startDate=${moment(
        this.state.startDate
      ).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format(
        "YYYY-MM-DD"
      )}&guests=${this.state.noGuest}`
    );
    this.componentDidMount();
  };

  handlePrice = (indexx, price_type) => {
    console.log("indexx & price type", indexx, price_type);
    let propertyPrice = this.state.propertyLayouts[indexx].prices.reduce(function (prev, cur) {
      return prev + cur[price_type];
    }, 0);
    console.log("property price hai re", propertyPrice);
    return propertyPrice;
  }
  render() {
    //     if(this.state.loggedIn === false){
    //   return <Redirect to="/register"/>
    // }
    const urltop = window.location.href;
    // alert(urltop);
    console.log("query inside render", this.state.startDate, this.state.endDate);
    const regex = /(<([^>]+)>)/ig;
    const result = this.state.propertyData.long_details ? this.state.propertyData.long_details.replace(regex, '') : "";
    const shortd = JSON.stringify(this.state.propertyData.short_details);
    const result1 = this.state.propertyData.meta_description ? this.state.propertyData.meta_description.replace(regex, '') : "";
    console.log("ratings render", this.state.propertyData.rating);
    // document.title = this.state.propertyData.meta_title;
    // document.getElementsByTagName("META")[5].content = this.state.propertyData.meta_title;
    // document.getElementsByTagName("META")[6].content = this.state.propertyData.property_image;
    // document.getElementsByTagName("META")[7].content = window.location.href;
    // document.getElementsByTagName("META")[9].content = result1;
    return (
      <React.Fragment>


        {/* <MetaTags>
          <title>{this.state.propertyData.meta_title}</title>
          <meta property="og:url" content={urltop} />
          <meta property="og:type" content="property" />
          <meta property="og:title" content={this.state.propertyData.meta_title} />
          <meta property="og:description" content={result1} />
          <meta property="og:image:url" content={this.state.propertyData.property_image} />
        </MetaTags> */}

        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.propertyData.meta_title}</title>
          <meta
            name="description"
            content={result1}
          />
          <meta
            name="keyword"
            content={this.state.propertyData.meta_keyword}
          />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="property" />
          <meta property="og:title" content={this.state.propertyData.meta_title} />
          <meta property="og:description" content={result1} />
          <meta property="og:image:url" content={this.state.propertyData.property_image} />
        </Helmet>
        {/*aprtments detail */}
        <section className="bg-grey apartment-detail-tab">
          <div className="container pad-0">
            <div className=" titlebanner mb-50">
              <img src={this.state.propertyData.property_image} />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="apt-det-title fw-700 fl-100 font-green mb-20">
                  {this.state.propertyData.property_title}
                </h3>
              </div>
              <div className="col-md-6">
                <div className="location-rating mb-20">
                  <div className="apart-location">
                    <p className="fw-700">{this.state.propertyData.region_name} | {this.state.cityName}</p>
                  </div>

                  <div className="rating listing-rating mb-10">
                    {
                      this.state.propertyData.rating ?
                        <Rate disabled allowHalf onFocus defaultValue={this.state.propertyData.rating} />
                        : ""
                    }
                  </div>
                </div>
                {/* <div className="listingcard-icon-list mb-10">
                  <ul>
                    {this.state.propertyData.amenities ?
                      this.state.propertyData.amenities.map(amenity => (
                        <li>
                          <img
                            className=""
                            src={amenity.image}
                          />
                        </li>
                      )) : ""
                    }

                  </ul>
                </div> */}
              </div>
              <div className="col-md-6">


                <Detailsearch
                  noGuest={this.state.noGuest}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  handleDetailSearch={this.handleDetailSearch}
                  handleChange={this.handleChange}
                  handleEndDate={this.handleEndDate}
                  onclick={this.onclick}
                  slug={this.state.propertyData.slug}
                  queryParam={queryString.parse(this.props.location.search)}
                  cityName={this.state.cityName}
                  city_id={this.state.city_id}
                  showNoDays={this.showNoDays}
                  no_days={this.state.no_days}
                  show={this.show}
                />
                {this.state.loader == true && (
                  <Loader
                    type="ThreeDots"
                    color="#5db64c"
                    height={80}
                    width={80}
                    timeout={5000} //3 secs

                  />
                )}
              </div>

            </div>



            {/* <div className="row mb-20">
              <div className="col-md-6">
                <Apartmentdetailstitle
                  apartmentdetailstitle={this.state.propertyData.property_title}
                  propertyrating={this.state.propertyData.rating}
                  propertyAmenities={this.state.propertyData.amenities}
                />
              </div>
              <div className="col-md-6">
                <Detailsearch
                  handleDetailSearch={this.handleDetailSearch} />
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-12">
                <Tabs defaultActiveKey="apartment" id="uncontrolled-tab-example">
                  {/* tab apartment */}
                  <Tab eventKey="apartment" title="apartment">
                    <div className="fl-100">

                    </div>

                    {/* <ReadMoreAndLess
                      ref={this.ReadMore}
                      className="read-more-content"
                      charLimit={100}
                      readMoreText="View More"
                      readLessText="View Less"

                    > */}
                    {/* {parser(result)} */}
                    <LongText
                      content={<div className="long-dec-show fl-100" dangerouslySetInnerHTML={{
                        __html: this.state.propertyData.long_details,
                      }} />}
                      limit={300}
                    />
                    {/* <span className="long-dec-show" dangerouslySetInnerHTML={{
                      __html: this.state.propertyData.long_details,
                    }} /> */}
                    {/* </ReadMoreAndLess> */}
                    {this.state.propertyLayouts.map((propLayout, index) => (
                      <Accordion defaultActiveKey="0">
                        <Card>
                          <Accordion.Toggle as={Card.Header} eventKey={index}>
                            <Apartmentdetails
                              apartmenttypetitle={propLayout.apartment_name}
                              apartmenttypedesc={propLayout.description}
                              apartmenttupeprice={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].price : "Sold out"}
                              noguest={propLayout.no_of_adults}
                              apartmenttype={propLayout.property_type}
                              nobeds={propLayout.no_of_bedrooms}
                              nobath={propLayout.no_of_bathrooms}
                              cutprice={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dprice : null}
                              queryParam={queryString.parse(this.props.location.search)}
                            />

                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey={index}>
                            <Card.Body>
                              <div className="row apt-det-img-gal mb-20">
                                <div className="col-md-12 pad-0 ">

                                  <OwlCarousel
                                    className="owl-theme deskview"
                                    // loop
                                    margin={10}
                                    items="4"
                                    dots={false}
                                    nav
                                  >
                                    {propLayout.images.map((images, index) => (
                                      <div className="item" onClick={() => this.showModal(propLayout.apartment_name)}>
                                        <img className="" src={images.image} />

                                      </div>))}
                                  </OwlCarousel>
                                  <OwlCarousel
                                    className="owl-theme mobview"
                                    // loop
                                    margin={10}
                                    items="1"
                                    dots={false}
                                    nav

                                  >
                                    {propLayout.images.map((images, index) => (
                                      <div className="item" onClick={() => this.showModal(propLayout.apartment_name)}>
                                        <img className="" src={images.image} />

                                      </div>))}
                                  </OwlCarousel>



                                  {this.state.popupfor == propLayout.apartment_name &&

                                    <Modal
                                      width={700}
                                      visible={this.state.visible}

                                      onCancel={this.handleCancel}
                                    >
                                      <OwlCarousel
                                        className="owl-theme"
                                        // loop
                                        margin={10}
                                        items="1"
                                        dots={true}
                                        nav
                                      >

                                        {propLayout.images.map((images, index) => (
                                          <div className="item">
                                            <img className="" src={images.image} />
                                          </div>))}


                                      </OwlCarousel>
                                    </Modal>
                                  }

                                </div>


                                {/* <div className="col-md-12 pad-0 mobview">
                         
                                        <OwlCarousel
                            className="owl-theme"
                            loop
                            margin={10}
                            items="1"
                            dots={false}
                            nav
                        >
                            <div className="item">
                             <img  className=""  src={require('../../assets/apartmentdetails/IMG_1.jpg')} alt="First slide"/>
                            </div>
                            <div className="item">
                             <img  className=""  src={require('../../assets/apartmentdetails/IMG_2.jpg')} alt="First slide"/>

                            </div>
                            <div className="item">
                             <img  className=""  src={require('../../assets/apartmentdetails/IMG_3.jpg')} alt="First slide"/>

                            </div>
                            <div className="item">
                            <img  className=""  src={require('../../assets/apartmentdetails/IMG_4.jpg')} alt="First slide"/>
                            </div>
                            <div className="item">
                             <img  className=""  src={require('../../assets/apartmentdetails/IMG_1.jpg')} alt="First slide"/>
                            </div>
                            <div className="item">
                             <img  className=""  src={require('../../assets/apartmentdetails/IMG_2.jpg')} alt="First slide"/>

                            </div>
                            <div className="item">
                             <img  className=""  src={require('../../assets/apartmentdetails/IMG_3.jpg')} alt="First slide"/>

                            </div>
                            <div className="item">
                            <img  className=""  src={require('../../assets/apartmentdetails/IMG_4.jpg')} alt="First slide"/>
                            </div>
                            
                        </OwlCarousel>
             
                          </div>   */}
                              </div>
                              <div className="row">
                                <div className="col-md-4 cat-stnd">
                                  <Apartmentcategory
                                    apart_cat_title="furnished"
                                    static_title="No-frills Monthly Rentals"
                                    amenities={propLayout.standard_amenities}
                                  />
                                  <Dealscard
                                    idx={index}
                                    apart_cat_title="furnished"
                                    key={propLayout.id}
                                    property_id={propLayout.property_id}
                                    roomType_id={propLayout.roomtype_id}
                                    deal_type="hot deal"
                                    cancel_type_img={require('../../assets/apartmentdetails/remove.png')}
                                    cancel_type="non refundable"
                                    deal_price={this.handlePrice(index, 'price')}
                                    cut_price={this.handlePrice(index, 'dprice')}
                                    deal_price_sup={this.handlePrice(index, 'snrefundable_price')}
                                    deal_price_pre={this.handlePrice(index, 'pnrefundable_price')}
                                    deal_price_sup_cut={this.handlePrice(index, 'dsnrefundable_price')}
                                    deal_price_pre_cut={this.handlePrice(index, 'dpnrefundable_price')}
                                    real_price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dprice : null}
                                    real_price_sup={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dsnrefundable_price : null}
                                    real_price_pre={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dpnrefundable_price : null}
                                    handleClick={this.handleClick}
                                    handleApartmentTitle={this.handleApartmentTitle}
                                    handleNoBeds={this.handleNoBeds}
                                    handleNoBath={this.handleNoBath}
                                    handleCancelType={this.handleCancelType}
                                    handleCancelTypeImage={this.handleCancelTypeImage}
                                    handledealPrice={this.handledealPrice}
                                    handleApartmentName={this.handleApartmentName}
                                    handleApartmentImage={this.handleApartmentImage}
                                    handleStdToSupHot={this.handleStdToSupHot}
                                    handleStdToSupHotFree={this.handleStdToSupHotFree}
                                    handleSupToPre={this.handleSupToPre}
                                    handleSupToPreFree={this.handleSupToPreFree}
                                    nobeds={propLayout.no_of_bedrooms}
                                    nobath={propLayout.no_of_bathrooms}
                                    clealing_fee={propLayout.cleaning_charges}
                                    //  cleaningCharge={propLayout.cleaning_charges}
                                    apartmentName={propLayout.apartment_name}
                                    price_type="price"
                                    apartmentImage={this.state.propertyData.property_image}
                                    price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].price : null}
                                    peymentMethod="Pay Now"
                                    prodec={propLayout.description}
                                    noguest={propLayout.no_of_adults}
                                    layouts={this.state.propertyLayouts[index] ? this.state.propertyLayouts[index].prices : null}
                                    amenities={propLayout.standard_amenities}
                                    amenities_sup={propLayout.superior_amenities}
                                    amenities_pre={propLayout.premier_amenities}
                                    aprtment_type_code="1"
                                    no_of_days={this.state.no_of_days}
                                    property_separate_id={this.state.propertyData.property_separate_id}
                                    min_stay={this.state.propertyData.min_stay}
                                    apartment_title={this.state.propertyData.property_title}
                                    singleStatus={this.state.singleStatus}
                                    property_title={this.stat}
                                    cityName={this.state.cityName}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    noGuest={this.state.noGuest}
                                    city_id={this.state.city_id}
                                    slug={this.state.propertyData.slug}
                                    queryParam={queryString.parse(this.props.location.search)}
                                  />
                                  <Dealscard
                                    idx={index}
                                    key={propLayout.id}
                                    property_id={propLayout.property_id}
                                    roomType_id={propLayout.roomtype_id}
                                    apart_cat_title="furnished"
                                    static_title="No-frills Monthly Rentals"
                                    deal_type="best available rate"
                                    cancel_type_img={require('../../assets/apartmentdetails/check.png')}
                                    cancel_type="free cancellation"
                                    cut_price={this.handlePrice(index, 'drefundable_price')}
                                    deal_price={this.handlePrice(index, 'refundable_price')}
                                    deal_price_sup_free={this.handlePrice(index, 'srefundable_price')}
                                    deal_price_pre_free={this.handlePrice(index, 'prefundable_price')}
                                    deal_price_sup_free_cut={this.handlePrice(index, 'dsrefundable_price')}
                                    deal_price_pre_free_cut={this.handlePrice(index, 'dprefundable_price')}
                                    real_price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].drefundable_price : null}
                                    real_price_sup_free={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dsrefundable_price : null}
                                    real_price_pre_free={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dprefundable_price : null}
                                    handleClick={this.handleClick}
                                    handleApartmentTitle={this.handleApartmentTitle}
                                    handleNoBeds={this.handleNoBeds}
                                    handleNoBath={this.handleNoBath}
                                    handleCancelType={this.handleCancelType}
                                    handleCancelTypeImage={this.handleCancelTypeImage}
                                    handledealPrice={this.handledealPrice}
                                    handleApartmentName={this.handleApartmentName}
                                    handleApartmentImage={this.handleApartmentImage}
                                    handleStdToSupHot={this.handleStdToSupHot}
                                    handleStdToSupHotFree={this.handleStdToSupHotFree}
                                    handleSupToPre={this.handleSupToPre}
                                    handleSupToPreFree={this.handleSupToPreFree}
                                    nobeds={propLayout.no_of_bedrooms}
                                    nobath={propLayout.no_of_bathrooms}
                                    clealing_fee={propLayout.cleaning_charges}
                                    //  cleaningCharge={propLayout.cleaning_charges}
                                    price_type="refundable_price"
                                    apartmentName={propLayout.apartment_name}
                                    apartmentImage={this.state.propertyData.property_image}
                                    price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].refundable_price : null}
                                    prodec={propLayout.description}
                                    peymentMethod="Pay On Arrival"
                                    noguest={propLayout.no_of_adults}

                                    layouts={this.state.propertyLayouts[index] ? this.state.propertyLayouts[index].prices : null}
                                    amenities={propLayout.standard_amenities}
                                    amenities_sup={propLayout.superior_amenities}
                                    amenities_pre={propLayout.premier_amenities}
                                    aprtment_type_code="1"
                                    no_of_days={this.state.no_of_days}
                                    property_separate_id={this.state.propertyData.property_separate_id}
                                    min_stay={this.state.propertyData.min_stay}
                                    apartment_title={this.state.propertyData.property_title}
                                    singleStatus={this.state.singleStatus}
                                    property_title={this.stat}
                                    cityName={this.state.cityName}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    noGuest={this.state.noGuest}
                                    city_id={this.state.city_id}
                                    slug={this.state.propertyData.slug}
                                    queryParam={queryString.parse(this.props.location.search)}
                                  />
                                </div>

                                <div className="col-md-4 cat-sup">
                                  <Apartmentcategory
                                    apart_cat_title="Standard"
                                    static_title="All Basic Amenities included"
                                    amenities={propLayout.superior_amenities}
                                  />
                                  <Dealscard
                                    idx={index}
                                    key={propLayout.id}
                                    property_id={propLayout.property_id}
                                    roomType_id={propLayout.roomtype_id}
                                    apart_cat_title="Standard"
                                    deal_type="hot deal"
                                    cancel_type_img={require('../../assets/apartmentdetails/remove.png')}
                                    cancel_type="non refundable"
                                    cut_price={this.handlePrice(index, 'dsnrefundable_price')}
                                    deal_price={this.handlePrice(index, 'snrefundable_price')}
                                    deal_price_sup_pre={this.handlePrice(index, 'pnrefundable_price')}
                                    deal_price_sup_pre_cut={this.handlePrice(index, 'dpnrefundable_price')}
                                    handleClick={this.handleClick}
                                    handleApartmentTitle={this.handleApartmentTitle}
                                    handleNoBeds={this.handleNoBeds}
                                    handleNoBath={this.handleNoBath}
                                    handleCancelType={this.handleCancelType}
                                    handleCancelTypeImage={this.handleCancelTypeImage}
                                    handledealPrice={this.handledealPrice}
                                    handleApartmentName={this.handleApartmentName}
                                    handleApartmentImage={this.handleApartmentImage}
                                    handleStdToSupHot={this.handleStdToSupHot}
                                    handleStdToSupHotFree={this.handleStdToSupHotFree}
                                    handleSupToPre={this.handleSupToPre}
                                    handleSupToPreFree={this.handleSupToPreFree}
                                    real_price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dsnrefundable_price : null}
                                    real_price_sup_pre={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dpnrefundable_price : null}
                                    clealing_fee={propLayout.cleaning_charges}
                                    nobeds={propLayout.no_of_bedrooms}
                                    nobath={propLayout.no_of_bathrooms}
                                    //  cleaningCharge={propLayout.cleaning_charges}
                                    price_type="snrefundable_price"
                                    apartmentName={propLayout.apartment_name}
                                    apartmentImage={this.state.propertyData.property_image}
                                    price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].snrefundable_price : null}
                                    peymentMethod="Pay Now"
                                    noguest={propLayout.no_of_adults}
                                    prodec={propLayout.description}
                                    layouts={this.state.propertyLayouts[index] ? this.state.propertyLayouts[index].prices : null}
                                    amenities={propLayout.superior_amenities}
                                    amenities_pre={propLayout.premier_amenities}
                                    aprtment_type_code="2"
                                    no_of_days={this.state.no_of_days}
                                    property_separate_id={this.state.propertyData.property_separate_id}
                                    min_stay={this.state.propertyData.min_stay}
                                    apartment_title={this.state.propertyData.property_title}
                                    singleStatus={this.state.singleStatus}
                                    property_title={this.stat}
                                    cityName={this.state.cityName}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    noGuest={this.state.noGuest}
                                    city_id={this.state.city_id}
                                    slug={this.state.propertyData.slug}
                                    queryParam={queryString.parse(this.props.location.search)}
                                  />
                                  <Dealscard
                                    idx={index}
                                    key={propLayout.id}
                                    property_id={propLayout.property_id}
                                    roomType_id={propLayout.roomtype_id}
                                    apart_cat_title="Standard"
                                    static_title="All Basic Amenities included"
                                    deal_type="best available rate"
                                    cancel_type_img={require('../../assets/apartmentdetails/check.png')}
                                    cancel_type="free cancellation"
                                    cut_price={this.handlePrice(index, 'dsrefundable_price')}
                                    deal_price={this.handlePrice(index, 'srefundable_price')}
                                    deal_price_sup_pre_free={this.handlePrice(index, 'prefundable_price')}
                                    deal_price_sup_pre_free_cut={this.handlePrice(index, 'dprefundable_price')}
                                    real_price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dsrefundable_price : null}
                                    real_price_sup_pre_free={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dprefundable_price : null}
                                    handleClick={this.handleClick}
                                    handleApartmentTitle={this.handleApartmentTitle}
                                    handleNoBeds={this.handleNoBeds}
                                    handleNoBath={this.handleNoBath}
                                    handleCancelType={this.handleCancelType}
                                    handleCancelTypeImage={this.handleCancelTypeImage}
                                    handledealPrice={this.handledealPrice}
                                    handleApartmentName={this.handleApartmentName}
                                    handleApartmentImage={this.handleApartmentImage}
                                    handleStdToSupHot={this.handleStdToSupHot}
                                    handleStdToSupHotFree={this.handleStdToSupHotFree}
                                    handleSupToPre={this.handleSupToPre}
                                    handleSupToPreFree={this.handleSupToPreFree}
                                    nobeds={propLayout.no_of_bedrooms}
                                    nobath={propLayout.no_of_bathrooms}
                                    clealing_fee={propLayout.cleaning_charges}
                                    apartmentName={propLayout.apartment_name}
                                    // apartmentImage={this.state.propeAD
                                    price_type="srefundable_price"
                                    prodec={propLayout.description}
                                    apartmentImage={this.state.propertyData.property_image}
                                    price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].srefundable_price : null}
                                    peymentMethod="Pay On Arrival"
                                    noguest={propLayout.no_of_adults}
                                    layouts={this.state.propertyLayouts[index] ? this.state.propertyLayouts[index].prices : null}
                                    amenities={propLayout.superior_amenities}
                                    amenities_pre={propLayout.premier_amenities}
                                    aprtment_type_code="2"
                                    no_of_days={this.state.no_of_days}
                                    property_separate_id={this.state.propertyData.property_separate_id}
                                    min_stay={this.state.propertyData.min_stay}
                                    apartment_title={this.state.propertyData.property_title}
                                    singleStatus={this.state.singleStatus}
                                    property_title={this.stat}
                                    cityName={this.state.cityName}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    noGuest={this.state.noGuest}
                                    city_id={this.state.city_id}
                                    slug={this.state.propertyData.slug}
                                    queryParam={queryString.parse(this.props.location.search)}
                                  />
                                </div>
                                <div className="col-md-4 cat-prem">
                                  <Apartmentcategory
                                    apart_cat_title="Superior"
                                    static_title="The Full Service Package"
                                    amenities={propLayout.premier_amenities}
                                  />
                                  <Dealscard
                                    idx={index}
                                    key={propLayout.id}
                                    property_id={propLayout.property_id}
                                    roomType_id={propLayout.roomtype_id}
                                    apart_cat_title="Superior"
                                    deal_type="hot deal"
                                    cancel_type_img={require('../../assets/apartmentdetails/remove.png')}
                                    cancel_type="non refundable"
                                    deal_price={this.handlePrice(index, 'pnrefundable_price')}
                                    cut_price={this.handlePrice(index, 'dpnrefundable_price')}
                                    real_price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dpnrefundable_price : null}
                                    handleClick={this.handleClick}
                                    handleApartmentTitle={this.handleApartmentTitle}
                                    handleNoBeds={this.handleNoBeds}
                                    handleNoBath={this.handleNoBath}
                                    handleCancelType={this.handleCancelType}
                                    handleCancelTypeImage={this.handleCancelTypeImage}
                                    handledealPrice={this.handledealPrice}
                                    handleApartmentName={this.handleApartmentName}
                                    handleApartmentImage={this.handleApartmentImage}
                                    handleStdToSupHot={this.handleStdToSupHot}
                                    handleStdToSupHotFree={this.handleStdToSupHotFree}
                                    handleSupToPre={this.handleSupToPre}
                                    handleSupToPreFree={this.handleSupToPreFree}
                                    nobeds={propLayout.no_of_bedrooms}
                                    nobath={propLayout.no_of_bathrooms}
                                    clealing_fee={propLayout.cleaning_charges}
                                    prodec={propLayout.description}
                                    //  cleaningCharge={propLayout.cleaning_charges}
                                    price_type="pnrefundable_price"
                                    apartmentName={propLayout.apartment_name}
                                    apartmentImage={this.state.propertyData.property_image}
                                    price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].pnrefundable_price : null}
                                    peymentMethod="Pay Now"
                                    clealing_fee={propLayout.cleaning_charges}
                                    noguest={propLayout.no_of_adults}
                                    layouts={this.state.propertyLayouts[index] ? this.state.propertyLayouts[index].prices : null}
                                    amenities={propLayout.premier_amenities}
                                    aprtment_type_code="3"
                                    no_of_days={this.state.no_of_days}
                                    property_separate_id={this.state.propertyData.property_separate_id}
                                    min_stay={this.state.propertyData.min_stay}
                                    apartment_title={this.state.propertyData.property_title}
                                    singleStatus={this.state.singleStatus}
                                    property_title={this.stat}
                                    cityName={this.state.cityName}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    noGuest={this.state.noGuest}
                                    city_id={this.state.city_id}
                                    slug={this.state.propertyData.slug}
                                    queryParam={queryString.parse(this.props.location.search)}
                                  />
                                  <Dealscard
                                    idx={index}
                                    key={propLayout.id}
                                    property_id={propLayout.property_id}
                                    roomType_id={propLayout.roomtype_id}
                                    apart_cat_title="Superior"
                                    static_title="The Full Service Package"
                                    deal_type="best available rate"
                                    cancel_type_img={require('../../assets/apartmentdetails/check.png')}
                                    cancel_type="free cancellation"
                                    deal_price={this.handlePrice(index, 'prefundable_price')}
                                    cut_price={this.handlePrice(index, 'dprefundable_price')}
                                    real_price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].dprefundable_price : null}
                                    handleClick={this.handleClick}
                                    handleApartmentTitle={this.handleApartmentTitle}
                                    handleNoBeds={this.handleNoBeds}
                                    handleNoBath={this.handleNoBath}
                                    handleCancelType={this.handleCancelType}
                                    handleCancelTypeImage={this.handleCancelTypeImage}
                                    handledealPrice={this.handledealPrice}
                                    handleApartmentName={this.handleApartmentName}
                                    handleApartmentImage={this.handleApartmentImage}
                                    handleStdToSupHot={this.handleStdToSupHot}
                                    handleStdToSupHotFree={this.handleStdToSupHotFree}
                                    handleSupToPre={this.handleSupToPre}
                                    handleSupToPreFree={this.handleSupToPreFree}
                                    nobeds={propLayout.no_of_bedrooms}
                                    nobath={propLayout.no_of_bathrooms}
                                    clealing_fee={propLayout.cleaning_charges}
                                    prodec={propLayout.description}
                                    //  cleaningCharge={propLayout.cleaning_charges}
                                    price_type="prefundable_price"
                                    apartmentName={propLayout.apartment_name}
                                    apartmentImage={this.state.propertyData.property_image}
                                    price={this.state.propertyLayouts[index].prices[0] ? propLayout.prices[0].prefundable_price : null}
                                    peymentMethod="Pay On Arrival"
                                    clealing_fee={propLayout.cleaning_charges}
                                    noguest={propLayout.no_of_adults}
                                    layouts={this.state.propertyLayouts[index] ? this.state.propertyLayouts[index].prices : null}
                                    amenities={propLayout.premier_amenities}
                                    aprtment_type_code="3"
                                    no_of_days={this.state.no_of_days}
                                    property_separate_id={this.state.propertyData.property_separate_id}
                                    min_stay={this.state.propertyData.min_stay}
                                    apartment_title={this.state.propertyData.property_title}
                                    singleStatus={this.state.singleStatus}
                                    property_title={this.stat}
                                    cityName={this.state.cityName}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    noGuest={this.state.noGuest}
                                    city_id={this.state.city_id}
                                    slug={this.state.propertyData.slug}
                                    queryParam={queryString.parse(this.props.location.search)}
                                  />
                                </div>
                              </div>

                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    ))}

                  </Tab>
                  {/* tab apartment end */}



                  < Tab eventKey="Map" title="Map" >
                    <Map city={this.state.cityName} cityid={this.state.city_id} />
                  </Tab>

                  < Tab eventKey="Testimonials" title="Testimonials" >

                    <OwlCarousel
                      className="owl-theme testemonialtheme"
                      loop
                      margin={10}
                    // nav
                    >
                      {this.state.testimonials.map((list) => (

                        <div className="item"><h4>{list.name}</h4>
                          <p className="testimonialtxttitle">{list.title}</p>
                          <div className="rating listing-rating mb-10">
                            {
                              list.rating ?
                                <Rate disabled allowHalf onFocus defaultValue={list.rating} />
                                : ""
                            }
                          </div>
                          <p className="testimonialtxt">{list.text}</p></div>


                      ))}
                    </OwlCarousel>
                  </Tab>

                  < Tab eventKey="TermsConditions" title="Terms & Conditions" >
                    <div className="long-dec-show fl-100" dangerouslySetInnerHTML={{
                      __html: this.state.propertyData.term_and_cond,
                    }} />
                  </Tab>


                </Tabs>
              </div>
            </div>

          </div>
        </section>
        {/* apartment details end */}


      </React.Fragment>
    );

  }

}

export default ApartmentDetailPage;