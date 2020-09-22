import React from "react";
import Header from "../header/header";
import Offers from "../offers/offers";
import Olivefeature from "../olivefeature/olivefeature";
import Blogcard from "../blogcard/blogcard";
import Locations from "../locations/locations";
import Heading from "../heading/heading";
import Delightimg from "../delightimg/delightimg";
import Delighttext from "../delighttext/delighttext";
import Testimonials from "../testimonials/testimonials";
import axios from 'axios';
import Footer from "../footer/footer";
import Mobilemenu from "../mobilemenu/mobilemenu";
import Mobmenu from "../mobmenu/mobmenu";
import Mobheader from "../mobheader/mobheader";
import Headersearch from "../headersearch/headersearch";
import Locationslider from "../locationslider/locationslider";
import Locationsearchform from "../locationsearchform/locationsearchform";
import Map from "../map/map";
import Apartmentdetails from "../apartmentdetails/apartmentdetails";
import Dealscard from "../dealscard/dealscard";
import Detailsearch from "../detailsearch/detailsearch";
import Apartmentcategory from "../apartmentcategory/apartmentcategory";
import Apartmentdetailstitle from "../apartmentdetailstitle/apartmentdetailstitle";
import Loginform from "../loginform/loginform";
import ReadMoreAndLess from "react-read-more-less";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import OwlCarousel from "react-owl-carousel";
import { withRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "circular-std";
import "./style.css";
import { Helmet } from "react-helmet";
import MetaTags from 'react-meta-tags';

import moment from 'moment';
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  Tab,
  Tabs,
} from "react-bootstrap";
import Whyolivecard from "../whyolivecard/whyolivecard";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Basicform from "../basicform/basicform";

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listpage: [
        "You get Guaranteed LOWEST PRICES!",
        "Special Deals for repeat Guests",
        "Loyalty Offers & Promotions",
        "Complimentary Upgrades",
      ],
      listpage2: [
        "100% Secure Booking Process - your information protected by 128/256 bit SSL encryption",
        "100% Confirmed Bookings with contactless Digital Payments ",
      ],
      listpage3: [
        "Our Team can manage most Special Requests of Guests",
        "Any Special requests from guests are handled better when booked directly with us",
        "Immediate Confirmation",
      ],
      listpage4: [
        "Disinfected & Sanitized Homes",
        "High focus on Hygiene",
        "Contactless Check-In & Digital Payments",
        "Sanitizers, Wipes & Masks for Guests & Staff",
      ],
      loginstatus: false

    };
  }

  async componentDidMount() {
    var token = localStorage.getItem('login');
    var loginstatus = localStorage.getItem('loginstatus');
    var userdetail = localStorage.getItem('userDetail');
    localStorage.clear();
    if (token !== null && loginstatus !== null && userdetail != null) {
      localStorage.setItem('login', token);
      localStorage.setItem('loginstatus', loginstatus);
      localStorage.setItem('userDetail', userdetail);
    }

    // const resp = await axios.get(`https://www.oliveservicedapartments.com/olive_api/public/api/cities`);
    // const value = resp.data;
    // console.log(value);
    // // localStorage.setItem("cities", resp.data);
    // this.setState({
    //   cities: resp.data,
    // })
  }

  handleClick = () => {
    console.log(this.props.startDate);
    this.props.history.push(`/${(this.props.cityName).toLocaleLowerCase()}?city=${this.props.cityName}&id=${this.props.cityId}&startDate=${this.props.startDate != '' ? moment(this.props.startDate).format("YYYY-MM-DD") : ''}&endDate=${this.props.endDate != '' ? moment(this.props.endDate).format("YYYY-MM-DD") : ''}&guests=1`);
  }

  propertysearch = (name, id) => {
    this.props.history.push(`/${(name).toLocaleLowerCase()}?city=${name}&id=${id}&startDate=${this.props.startDate != '' ? moment(this.props.startDate).format("YYYY-MM-DD") : ''}&endDate=${this.props.endDate != '' ? moment(this.props.endDate).format("YYYY-MM-DD") : ''}&guests=1`);
  }

  render() {
    console.log("date in home", this.props.startDate);
    return (
      <React.Fragment>
        {/* desktop menu end */}
        {/* mobile header */}

        {/* mobileheader end */}
        {/* location section mob */}
        <MetaTags>
          <title>Serviced Apartments: Delhi Gurgaon Hyderabad Bangalore Noida Goa Kolkata</title>
          <meta
            name="description"
            content="OLIVE - Award Winning Serviced Apartments across India - Delhi, Gurgaon, Hyderabad, Bangalore, Jaipur, Noida, Kolkata, Goa - Corporate Housing Vacation Rentals"
          />
          <meta property="og:url" content="https://www.oliveservicedapartments.com" />
          <meta property="og:type" content="Serviced Apartments" />
          <meta property="og:title" content="Serviced Apartments: Delhi Gurgaon Hyderabad Bangalore Noida Goa Kolkata" />
          <meta property="og:description" content="OLIVE - Award Winning Serviced Apartments across India - Delhi, Gurgaon, Hyderabad, Bangalore, Jaipur, Noida, Kolkata, Goa - Corporate Housing Vacation Rentals" />
          <meta property="og:image:url" content="https://www.oliveservicedapartments.com/static/media/Banner_1.7ee4f2ce.jpg" />
        </MetaTags>
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>Serviced Apartments: Delhi Gurgaon Hyderabad Bangalore Noida Goa Kolkata</title>
          <meta
            name="description"
            content="OLIVE - Award Winning Serviced Apartments across India - Delhi, Gurgaon, Hyderabad, Bangalore, Jaipur, Noida, Kolkata, Goa - Corporate Housing Vacation Rentals"
          />
          <meta property="og:url" content="https://www.oliveservicedapartments.com" />
          <meta property="og:type" content="Serviced Apartments" />
          <meta property="og:title" content="Serviced Apartments: Delhi Gurgaon Hyderabad Bangalore Noida Goa Kolkata" />
          <meta property="og:description" content="OLIVE - Award Winning Serviced Apartments across India - Delhi, Gurgaon, Hyderabad, Bangalore, Jaipur, Noida, Kolkata, Goa - Corporate Housing Vacation Rentals" />
          <meta property="og:image:url" content="https://www.oliveservicedapartments.com/static/media/Banner_1.7ee4f2ce.jpg" />
        </Helmet> */}
        <section className="pad-100 location-section mobview">
          <div className="container">
            <Heading title="Browse by location" />
            <div className="row">
              <div className="scroll-div">
                <ul className="ul-flex">
                  {
                    this.props.cities.map(
                      (city, index) => {
                        return (
                          <li>
                            <Locations
                              key={index}
                              locationId={city.id}
                              locationimg={city.image}
                              locationname={city.city_name}
                              locationnamemob={city.city_name}
                              propertysearch={this.propertysearch}
                            />
                          </li>
                        )
                      }
                    )
                  }


                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* location section mob end */}
        {/* image section */}
        <section className="header-img mobview">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div>
                  <img
                    className="mob-header-img"
                    src={require("../../assets/Banner_1.jpg")}
                  />
                  {/* <div>
                <p>find your perfect</p>
                <h1 className="font-white">Service apartments</h1></div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* image section end */}
        {/* mobile bottom menu */}
        <Mobmenu />
        {/* mobile bottom menu end */}
        {/*search form mob */}
        <Locationsearchform />
        {/* search form mob end */}
        {/* search section */}
        <section className=" main-container search-section pad-100 deskview">
          <div className="container vt-align">
            <div className="row">
              <div className="col-md-12">
                <p>Find your Perfect</p>
              </div>
              <div className="col-md-4">
                <h1 className="font-white mb-50">Serviced apartments</h1>
              </div>
            </div>
            <Headersearch
              handleClick={this.handleClick}
              handleOnChange={this.props.handleOnChange}
              handleValue={this.props.handleValue}
              handleChange={this.props.handleChange}
              handleEndDate={this.props.handleEndDate}
              selected={this.props.selected}
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              cities={this.props.cities}
              cityName={this.props.cityName}
            />
            <div className="stamp header-stamp">
              <p>Value for money</p>
            </div>
          </div>
        </section>
        {/* search section ends */}
        {/* downlink */}
        <section className="down_arrow_sec deskview">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center">
                {/* <a href="" className="down_arrow"><i className="fa fa-arrow-down" aria-hidden="true"></i></a> */}
                <AnchorLink href="#stat" className="down_arrow">
                  <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </AnchorLink>
              </div>
            </div>
          </div>
        </section>
        {/* downlink end */}

        {/* text section */}
        <section id="stat" className="pad-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 text-center">
                <h1 className="font-green mb-50 font-cap">
                  Serviced Apartments,Vacation Rentals,Holiday Homes,Furnished Flats & more..
                </h1>
                <p className="stat-text">
                  Located in the best neighborhoods, Olive rental apartments offer space, comfort & privacy of a Holiday Home with amenities of a Boutique Hotel. Our non-sharing residences with modern design & contact-free service are designed to be your Home Away From Home!
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* text-section ends */}
        {/* location section */}
        <section className="pad-100 location-section deskview">
          <div className="container">
            <Heading title="Browse by location" />
            <div className="row">
              {
                this.props.cities.map(
                  (city) => {
                    return (

                      <div className="col-lg-3 col-md-3">
                        <Locations
                          locationId={city.id}
                          locationimg={city.image}
                          locationname={city.city_name}
                          propertysearch={this.propertysearch}
                        />
                      </div>

                    )
                  }
                )
              }
              {/* <div className="col-lg-3 col-md-3">
                <Locations locationimg={require("../../assets/Quote.jpg")} />
              </div> */}

            </div>
          </div>
        </section>
        {/* location section end */}

        {/* feature section */}
        <section className="pad-45 feature-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-4">
                <Olivefeature
                  featureimg={require("../../assets/Home.png")}
                  olivefeature="500+"
                  olivefeature_desc="Apartment in selected locations"
                />
              </div>
              <div className="col-md-4 col-4">
                <Olivefeature
                  featureimg={require("../../assets/secure.png")}
                  olivefeature="Best"
                  olivefeature_desc="Rates guaranteed with special long stay offers"
                />
              </div>
              <div className="col-md-4 col-4">
                <Olivefeature
                  featureimg={require("../../assets/profile.png")}
                  olivefeature="24x7"
                  olivefeature_desc="Excellent support for professional hospitality"
                />
              </div>
            </div>
          </div>
        </section>
        {/* feature ends */}
        {/* why olive */}
        <section className="pad-100 deskview">
          <div className="container">
            <Heading title="Why olive?" />
            <div className="row">
              <div className="offset-md-1 col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Private non-sharing homes"
                  whyoliveimg={require("../../assets/whyolive/whyolive1.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Fully serviced apartments"
                  whyoliveimg={require("../../assets/whyolive/whyolive3.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Stay longer save more"
                  whyoliveimg={require("../../assets/whyolive/whyolive2.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Reviewed by real travellers"
                  whyoliveimg={require("../../assets/whyolive/whyolive4.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Value for money"
                  whyoliveimg={require("../../assets/whyolive/whyolive5.jpg")}
                />
              </div>
            </div>
            <div className="row">
              <div className="offset-md-1 col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="We're secure"
                  whyoliveimg={require("../../assets/whyolive/whyolive6.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Enjoy more space"
                  whyoliveimg={require("../../assets/whyolive/whyolive7.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Live like a local"
                  whyoliveimg={require("../../assets/whyolive/whyolive8.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="Feel at home"
                  whyoliveimg={require("../../assets/whyolive/whyolive9.jpg")}
                />
              </div>
              <div className="col-md-2 col-6">
                <Whyolivecard
                  whyolivedesc="More choices"
                  whyoliveimg={require("../../assets/whyolive/whyolive10.jpg")}
                />
              </div>
            </div>
          </div>
        </section>
        {/* why olive end */}
        {/* why olive mobile */}
        <section className="pad-100 mobview">
          <div className="container">
            <Heading title="Why olive?" />
            <div className="row">
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="Private non-sharing apartments"
                  whyoliveimg={require("../../assets/whyolive/whyolive1.jpg")}
                />
              </div>
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="Fully serviced apartemnts"
                  whyoliveimg={require("../../assets/whyolive/whyolive3.jpg")}
                />
              </div>
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="Low rates top savings"
                  whyoliveimg={require("../../assets/whyolive/whyolive2.jpg")}
                />
              </div>
              <div className=" col-6">
                <Whyolivecard
                  whyolivedesc="Reviewed by real travellers"
                  whyoliveimg={require("../../assets/whyolive/whyolive4.jpg")}
                />
              </div>
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="Value for money"
                  whyoliveimg={require("../../assets/whyolive/whyolive5.jpg")}
                />
              </div>

              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="We're secure"
                  whyoliveimg={require("../../assets/whyolive/whyolive6.jpg")}
                />
              </div>
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="Enjoy more space"
                  whyoliveimg={require("../../assets/whyolive/whyolive7.jpg")}
                />
              </div>
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="Live like a local"
                  whyoliveimg={require("../../assets/whyolive/whyolive8.jpg")}
                />
              </div>
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="Feel at home"
                  whyoliveimg={require("../../assets/whyolive/whyolive9.jpg")}
                />
              </div>
              <div className="col-6">
                <Whyolivecard
                  whyolivedesc="More choices"
                  whyoliveimg={require("../../assets/whyolive/whyolive10.jpg")}
                />
              </div>
            </div>
          </div>
        </section>
        {/* why olive mobile end */}
        {/* delight */}
        <section className="pad-100 bg-grey deskview">
          <div className="container">
            <Heading title="Let us Delight you" />
            <div className="row">
              <div className="col-md-8">
                <Delightimg
                  delightimage={require("../../assets/letsdelight/Delight_1.jpg")}
                />
                <div className="stamp rot-45 stamp-1-pull">
                  <p>so many choices</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className=" del-vt-align del-pull-l-200">
                  <Delighttext>
                    <p className="delight-card-title fw-700">Sanitized Stays</p>
                    <div className="delighlistarea">
                      <ul className="delight-list">
                        {" "}
                        {this.state.listpage4.map((item, i) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Delighttext>
                </div>
              </div>
            </div>
            <div className="row pull-up">
              <div className="col-md-4">
                <div className=" del-vt-align-btm del-pull-r-200 zup">
                  <Delighttext>
                    <p className="delight-card-title fw-700">Book Direct</p>
                    <div className="delighlistarea">
                      <ul className="delight-list">
                        {" "}
                        {this.state.listpage.map((item, i) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Delighttext>
                </div>
              </div>
              <div className="col-md-8">
                <Delightimg
                  delightimage={require("../../assets/letsdelight/Delight_4.jpg")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <Delightimg
                  delightimage={require("../../assets/letsdelight/Delight_2.jpg")}
                />
              </div>
              <div className="col-md-4">
                <div className=" del-vt-align del-pull-l-200">
                  <Delighttext>
                    <p className="delight-card-title fw-700">Secure Payments</p>
                    <div className="delighlistarea">
                      <ul className="delight-list">
                        {" "}
                        {this.state.listpage2.map((item, i) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Delighttext>
                </div>
              </div>
            </div>
            <div className="row pull-up">
              <div className="col-md-4">
                <div className=" del-vt-align-btm del-pull-r-200 zup">
                  <Delighttext>
                    <p className="delight-card-title fw-700">Special Requests</p>
                    <div className="delighlistarea">
                      <ul className="delight-list">
                        {" "}
                        {this.state.listpage3.map((item, i) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Delighttext>
                </div>
                <div className="stamp rot-a-45 pull-stamp-2">
                  <p>No extra cost</p>
                </div>
              </div>
              <div className="col-md-8">
                <Delightimg
                  delightimage={require("../../assets/letsdelight/Delight_3.jpg")}
                />
              </div>
            </div>
          </div>
        </section>
        {/* delight end */}

        {/* delight mob */}
        <section className="pad-100 bg-grey mobview">
          <div className="container">
            <Heading title="Let us Delight you" />
            <div className="row ">
              <div className="scroll-div">
                <ul className="ul-flex">
                  <li>
                    <div className="delight-mob-width">
                      <Delightimg
                        delightimage={require("../../assets/letsdelight/Delight_4.jpg")}
                      />
                      <Delighttext>
                        <p className="delight-card-title fw-700">Book Direct</p>

                        <ul className="delight-list">
                          {" "}
                          {this.state.listpage.map((item, i) => (
                            <li>
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                      </Delighttext>
                    </div>
                  </li>
                  <li>
                    <div className="delight-mob-width">
                      <Delightimg
                        delightimage={require("../../assets/letsdelight/Delight_2.jpg")}
                      />
                      <Delighttext>
                        <p className="delight-card-title fw-700">Secure Payments</p>

                        <ul className="delight-list">
                          {" "}
                          {this.state.listpage2.map((item, i) => (
                            <li>
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                      </Delighttext>
                    </div>
                  </li>
                  <li>
                    <div className="delight-mob-width">
                      <Delightimg
                        delightimage={require("../../assets/letsdelight/Delight_3.jpg")}
                      />
                      <Delighttext>
                        <p className="delight-card-title fw-700">
                          Special Requests
                        </p>

                        <ul className="delight-list">
                          {" "}
                          {this.state.listpage3.map((item, i) => (
                            <li>
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                      </Delighttext>
                    </div>
                  </li>
                  <li>
                    <div className="delight-mob-width">
                      <Delightimg
                        delightimage={require("../../assets/letsdelight/Delight_4.jpg")}
                      />
                      <Delighttext>
                        <p className="delight-card-title fw-700">Loyalty Awards</p>

                        <ul className="delight-list">
                          {" "}
                          {this.state.listpage4.map((item, i) => (
                            <li>
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                      </Delighttext>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* delight mob end */}
        {/* blog */}
        <section className="bg-grey deskview">
          <div className="container">
            <Heading title="Blogs" />
            <div className="row">
              <div className="col-md-4">
                <Blogcard
                  blogimg={require("../../assets/Blogs/Blog_1.jpg")}
                  blog_title="Serviced Apartment vs. Hotel in Delhi"
                  bloglink="https://www.oliveservicedapartments.com/blog/serviced-apartment-vs-hotel-in-delhi/"

                />
              </div>
              <div className="col-md-4">
                <Blogcard
                  blogimg={require("../../assets/Blogs/Blog_2.jpg")}
                  blog_title="The Perfect Travel Accommodation"
                  bloglink="https://www.oliveservicedapartments.com/blog/the-perfect-travel-accommodation/"
                />
              </div>
              <div className="col-md-4">
                <Blogcard
                  blogimg={require("../../assets/Blogs/Blog_3.jpg")}
                  blog_title="Delhi Travel Tips: Things to Keep in Mind"
                  bloglink="https://www.oliveservicedapartments.com/blog/delhi-travel-tips-things-to-keep-in-mind/"
                />
              </div>
            </div>
          </div>
        </section>
        {/* blog ends */}
        {/* blog mob*/}
        <section className="bg-grey mobview">
          <div className="container">
            <Heading title="Blogs" />
            <div className="row">
              <div className="scroll-div">
                <ul className="ul-flex">
                  <li>
                    <Blogcard
                      blogimg={require("../../assets/Blogs/Blog_1.jpg")}
                      blog_title="Serviced Apartment vs. Hotel in Delhi"
                      bloglink="https://www.oliveservicedapartments.com/blog/serviced-apartment-vs-hotel-in-delhi/"
                    />
                  </li>
                  <li>
                    <Blogcard
                      blogimg={require("../../assets/Blogs/Blog_2.jpg")}
                      blog_title="The Perfect Travel Accommodation"
                      bloglink="https://www.oliveservicedapartments.com/blog/the-perfect-travel-accommodation/"
                    />
                  </li>
                  <li>
                    <Blogcard
                      blogimg={require("../../assets/Blogs/Blog_3.jpg")}
                      blog_title="Delhi Travel Tips: Things to Keep in Mind"
                      bloglink="https://www.oliveservicedapartments.com/blog/delhi-travel-tips-things-to-keep-in-mind/"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* blog ends */}
        {/* testimonial */}
        <section className="testimonial-section bg-grey pad-100">
          <div className="container">
            <Heading title="What People Say About Olive" />
            <div className="row">
              <div className="col-md-12">
                <div class="stamp rot-a-45 pull-stamp-2"><p>Thousands
                of happy
customers</p></div>
                <Testimonials />
              </div>
            </div>
          </div>
        </section>

        {/* testimonial ends */}
        {/* footer */}

        {/* footer end */}
        {/* empty space */}
        <div className="fl-100 empty-55 mobview"></div>
        {/* empty space end */}

      </React.Fragment>
    );
  }
}
export default withRouter(Home);
