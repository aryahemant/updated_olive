import React from "react";
import Header from "../header/header";
import Map from "../map/map";
import Apartmentdetails from "../apartmentdetails/apartmentdetails";
import Dealscard from "../dealscard/dealscard";
import Detailsearch from "../detailsearch/detailsearch";
import Apartmentcategory from "../apartmentcategory/apartmentcategory";
import Apartmentdetailstitle from "../apartmentdetailstitle/apartmentdetailstitle";
import Titlebanner from "../titlebanner/titlebanner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reservationpage.css";
import ReadMoreAndLess from "react-read-more-less";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import OwlCarousel from "react-owl-carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";
import parser from "html-react-parser";

import Locations from "../locations/locations";
import Heading from "../heading/heading";
import axios from "axios";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import $ from "jquery";
import ReactTooltip from "react-tooltip";
import { Modal } from "antd";
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
import { Rate } from "antd";
import Dialog from "../dialog/dialog";
import ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";

class Reservationpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      bookingid: props.match.params.bookingId,
      reservationBookingData: [],
      reservationpropertyData: [],
      discount: "Discount",
      property_amenities: [],
      premier_amenities: [],
      room_amenities: [],
      alert: null,
      bookingstatus: 1,
      userDetail: localStorage.getItem("userDetail"),
      extra_ameniteis: [],
      cities: [],
      pastreservationBookingData: [],
      pastreservationpropertyData: [],
      pastproperty_amenities: [],
      pastextra_ameniteis: [],
    };
  }
  openDialog = (name) => {
    console.log(name);

    this.setState(
      {
        isOpen: true,
        dialogtype: name,
      },
      () => {
        console.log("calculation", this.state.dialogtype);
      }
    );
    console.log(this.state.isOpen);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    // equal height jquery
    // $.fn.equalHeights = function(){
    //   var max_height = 0;
    //   $(this).each(function(){
    //     max_height = Math.max($(this).height(), max_height);
    //   });
    //   $(this).each(function(){
    //     $(this).height(max_height);
    //   });
    // };

    // $(document).ready(function(){
    //     $('.product').equalHeights();
    // });
    // equal height jquery ends
    localStorage.removeItem("selectdagree");

    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    await axios
      .get(
        `https://www.oliveservicedapartments.com/olive_api/public/api/booking/${this.state.bookingid}`,
        {
          headers: { Authorization: AuthStr },
        }
      )
      .then((res) => {
        this.setState({
          reservationBookingData: res.data.booking_data,
          room_amenities: res.data.booking_data.room_amenities,
          reservationpropertyData: res.data.property_data,
          property_amenities: res.data.property_data.property_amenities,
          premier_amenities: res.data.property_data.premier_amenities,
          extra_ameniteis: res.data.booking_data.added_amenities,
        });
      });
    console.log("booking detail", this.state.reservationBookingData);
    console.log("booking detail", this.state.reservationpropertyData);
    this.setState({
      userDetail: JSON.parse(this.state.userDetail),
    });

    const resp = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    );
    this.setState({
      cities: resp.data,
    });
    // for all booking list
    await axios
      .get(
        `https://www.oliveservicedapartments.com/olive_api/public/api/bookings`,
        {
          headers: { Authorization: AuthStr },
        }
      )
      .then((res) => {
        console.info("all booking data", res.data.property_data);
        this.setState({
          pastreservationBookingData: res.data,
          // pastreservationpropertyData: res.data.property_data,
          // pastproperty_amenities: res.data.property_data.property_amenities,
          // pastextra_ameniteis: res.data.added_amenities,
        });
      });

    // this.setState({
    //   userDetail: JSON.parse(this.state.userDetail),
    // });
  }
  cancelbooking(id) {
    console.info("booking id", id);
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    axios({
      method: "get",
      url: `https://www.oliveservicedapartments.com/olive_api/public/api/booking/${id}/cancel`,

      headers: { Authorization: AuthStr },
    })
      .then((response) => {
        console.info("status", response);
        const getAlert = () => (
          <SweetAlert
            confirmBtnBsStyle="success"
            success
            title="Successfully Cancelled"
            onConfirm={() => this.hideAlert()}
          >
            <p className="p2">
              Hello! Your booking cancellation request has been forwarded to our
              customer support. We will be calling you shortly for confirmation.
            </p>
          </SweetAlert>
        );

        this.setState({
          alert: getAlert(),
          bookingstatus: 0,
        });
        //handle success
        console.info("alrt status", this.state.alert);
      })
      .catch(function (response) {
        //handle error
        console.log("Error while calling api", response);
      });
  }
  hideAlert() {
    console.log("Hiding alert...");
    this.setState({
      alert: null,
    });
  }

  alertshow() {
    const getAlert = () => (
      <SweetAlert
        confirmBtnBsStyle="success"
        success
        title="Successfully Cancelled"
        onConfirm={() => this.hideAlert()}
      >
        <p className="p2">
          Hello! Your booking cancellation request has been forwarded to our
          customer support. We will be calling you shortly for confirmation.
        </p>
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }

  propertysearch = (name) => {
    this.props.history.push(`/${name.toLocaleLowerCase()}`);
    localStorage.removeItem("single");
  };

  openDialog = (name) => {
    console.log(name);

    this.setState(
      {
        isOpen: true,
        dialogtype: name,
      },
      () => {
        console.log("calculation", this.state.dialogtype);
      }
    );
    console.log(this.state.isOpen);
  };

  render() {
    const regex = /(<([^>]+)>)/gi;
    const result1 = JSON.parse(localStorage.getItem("alltooltips"))
      ? JSON.parse(localStorage.getItem("alltooltips")).cleaning_fees.replace(
          regex,
          ""
        )
      : "";
    const result2 = JSON.parse(localStorage.getItem("alltooltips"))
      ? JSON.parse(localStorage.getItem("alltooltips")).service_fees.replace(
          regex,
          ""
        )
      : "";
    const result3 = JSON.parse(localStorage.getItem("alltooltips"))
      ? JSON.parse(localStorage.getItem("alltooltips")).taxes.replace(regex, "")
      : "";
    // const policy = JSON.stringify(this.state.reservationBookingData.policies);
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Reservation page</title>
          <meta name="description" content="Reservation page" />
        </Helmet>
        <section className="bg-grey apartment-detail-tab pad-45 reservationpage ">
          <div className="container">
            <div className="row mb-100">
              <div className="col-md-12 text-center">
                <div className="ty-img">
                  <img
                    className=" w-100"
                    src={require("../../assets/Tick.png")}
                  />
                </div>
                <h1 className="font-green font-upper mb-10">Thank you!</h1>
                <p>
                  You have successfully booked your Apartment with Olive. <br />
                  Your Booking id is : {this.state.reservationBookingData.id}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="font-green font-cap mb-20">Reservation</h1>
              </div>
            </div>

            <Tabs defaultActiveKey="upcoming" id="uncontrolled-tab-example">
              {/* tab apartment */}
              <Tab
                eventKey="upcoming"
                title="upcoming"
                className="upcoming-tab"
              >
                <div className="row">
                  <div className="col-md-8">
                    <div className="listing-card product">
                      <div className="row">
                        <div className="col-md-8">
                          {/* <div className=" fl-100">
                            <h3 className="apt-det-title fw-700 fl-100 font-green">
                              {this.props.apartmentdetailstitle}
                            </h3>
                            <div className="rating listing-rating mb-10">
                              <Rate
                                disabled
                                allowHalf
                                onFocus
                                defaultValue={4}
                              />
                            </div>
                            <div className="listingcard-icon-list mb-10">
                              <ul>
                                {this.state.premier_amenities.map(
                                  (amenity, index) => (
                                    <li>
                                      <img
                                        className=""
                                        src={amenity.image}
                                        alt="First slide"
                                      />
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div> */}
                          <Apartmentdetailstitle
                            apartmentdetailstitle={
                              this.state.reservationpropertyData.property_title
                            }
                            aminitiesdetail={this.state.property_amenities}
                            apartmentregion={
                              this.state.reservationpropertyData.address
                            }
                          />
                          <div className="fl-100 mt-15">
                            <div className="reserve-img mobview mb-30">
                              <img
                                className=" w-100"
                                // src={require('../../assets/apartmentdetails/IMG_2.jpg')}
                                src={
                                  this.state.reservationpropertyData
                                    .property_image
                                }
                                alt="First slide"
                              />
                            </div>
                          </div>

                          <div
                            className="p2 description"
                            dangerouslySetInnerHTML={{
                              __html: this.state.reservationBookingData
                                .apartment_description,
                            }}
                          />
                          <div className="fl-100 mt-15">
                            <p class="p2 font-cap mb-10">
                              <strong>check in:</strong>{" "}
                              {moment(
                                this.state.reservationBookingData.check_in
                              ).format("ddd,  MMM D , YYYY")}
                            </p>
                            <p class="p2 font-cap mb-10">
                              <strong>check out:</strong>{" "}
                              {moment(
                                this.state.reservationBookingData.check_out
                              ).format("ddd,  MMM D , YYYY")}{" "}
                            </p>
                            <p class="p2 font-cap mb-10">
                              <strong>Guest:</strong>{" "}
                              {this.state.reservationBookingData.guest}{" "}
                            </p>
                            <div className="hr-thin mb-10"></div>
                            <p class="p2 font-cap mb-10">
                              <strong>Address:</strong>{" "}
                              {this.state.reservationpropertyData.address}{" "}
                            </p>
                            <p class="p2 font-cap mb-10">
                              <strong>Phone Number:</strong>{" "}
                              {this.state.reservationBookingData.phone}{" "}
                            </p>
                            <p class="p2 font-cap mb-10">
                              <strong>Email:</strong>{" "}
                              {this.state.reservationBookingData.email}{" "}
                            </p>
                            <div className="hr-thin mb-10"></div>
                            {/* <p class="p2 font-cap mb-10">
                              <strong>Number of rooms:</strong> 1 room
                            </p> */}

                            <p class="p2 font-cap mb-10">
                              <strong>reservation name:</strong>{" "}
                              {this.state.reservationBookingData.first_name}{" "}
                              {this.state.reservationBookingData.last_name}
                            </p>
                            {this.state.reservationBookingData
                              .special_request && (
                              <p class="p2 font-cap mb-10">
                                <strong>Special Request:</strong>{" "}
                                {
                                  this.state.reservationBookingData
                                    .special_request
                                }
                              </p>
                            )}

                            {this.state.reservationBookingData.card_digit && (
                              <React.Fragment>
                                <div className="hr-thin mb-10"></div>

                                <p class="p2 font-cap mb-10">
                                  <strong>Card Type:</strong>{" "}
                                  {this.state.reservationBookingData.card_type}
                                </p>
                                <p class="p2 font-cap mb-10">
                                  <strong>Card:</strong>{" "}
                                  {this.state.reservationBookingData.card_digit}
                                </p>
                                <p class="p2 font-cap mb-10">
                                  <strong>Card Holder:</strong>{" "}
                                  {this.state.reservationBookingData.card_name}
                                </p>
                                <p class="p2 font-cap mb-10">
                                  <strong>Card Expiry Date:</strong>{" "}
                                  {
                                    this.state.reservationBookingData
                                      .expiry_date
                                  }
                                </p>
                              </React.Fragment>
                            )}

                            {this.state.reservationBookingData.gst_number && (
                              <React.Fragment>
                                <div className="hr-thin mb-10"></div>

                                <p class="p2 font-cap mb-10">
                                  <strong>GST:</strong>{" "}
                                  {this.state.reservationBookingData.gst_number}
                                </p>
                                <p class="p2 font-cap mb-10">
                                  <strong>Company Name:</strong>{" "}
                                  {
                                    this.state.reservationBookingData
                                      .company_name
                                  }
                                </p>
                                <p class="p2 font-cap mb-10">
                                  <strong>Company Address:</strong>{" "}
                                  {
                                    this.state.reservationBookingData
                                      .company_address
                                  }
                                </p>
                              </React.Fragment>
                            )}

                            <div className="hr-thin mb-10"></div>
                            <p class="p2 font-cap mb-10">
                              <strong>Amenities:</strong>
                            </p>
                            {this.state.room_amenities &&
                              this.state.room_amenities.map(
                                (amenity, index) => (
                                  <p class="date-guest p2 font-cap ">
                                    <img class="" src={amenity.image} />
                                    {amenity.name}
                                    <p className="amentiesdet">
                                      {amenity.description}
                                    </p>
                                  </p>
                                )
                              )}

                            {this.state.alert}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="reserve-img deskview">
                            <img
                              className=" w-100"
                              src={
                                this.state.reservationpropertyData
                                  .property_image
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-12 mt-15">
                          {/* <p>{parser(policy)}</p> */}
                          <p
                            className="p2 checkoutpolicy"
                            dangerouslySetInnerHTML={{
                              __html: this.state.reservationBookingData
                                .policies,
                            }}
                          />
                          {this.state.bookingstatus == 1 ? (
                            <Button
                              className="cancel-res desktop"
                              onClick={() =>
                                this.cancelbooking(
                                  this.state.reservationBookingData.id
                                )
                              }
                            >
                              Request cancellation
                            </Button>
                          ) : (
                            <Button className="cancel-res ">Cancelled</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="listing-card product">
                      <div className="row">
                        <div className="col-md-12">
                          <p className="p1 font-green font-cap fw-700 mb-10">
                            Summary of Charges
                          </p>
                          <p className="p2 font-cap fw-700">
                            Total Cost: &#8377;{" "}
                            {this.state.reservationBookingData.total_amount ===
                            null
                              ? Number.parseInt(
                                  this.state.reservationBookingData
                                    .booking_amount,
                                  10
                                )
                              : Number.parseInt(
                                  this.state.reservationBookingData
                                    .total_amount,
                                  10
                                )}
                          </p>
                          <div className="hr-thin mb-10"></div>
                          <p className="mbb-5 p2 font-cap ">
                            <strong>Booking Date:</strong>{" "}
                            {moment(
                              this.state.reservationBookingData.created_at
                            ).format("ddd,  MMM D, YYYY")}
                          </p>
                          {/* <p className="mbb-5 p2 font-cap ">
                            <strong>Payment method:</strong> Card
                          </p> */}

                          <p className="mbb-5 p2 font-cap ">
                            <strong>
                              {this.state.reservationBookingData.apartment_name}{" "}
                              -{" "}
                              <span className="font-green">
                                {" "}
                                {
                                  this.state.reservationBookingData
                                    .property_type
                                }{" "}
                              </span>
                            </strong>{" "}
                          </p>
                          <div className="hr-thin mt-10"></div>
                        </div>
                        <div className="col-md-12 reserv-detail mt-15">
                          <div className="fl-100 deals-card">
                            <div className="deals-card-left">
                              <p
                                className="p2 deal-type"
                                onClick={() =>
                                  this.openDialog(
                                    localStorage.getItem("dealType")
                                  )
                                }
                              >
                                {localStorage.getItem("dealType")}
                                <i
                                  class="fa fa-info-circle info-icon"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <div className="deals-hr"></div>
                              <Dialog
                                style="transition:"
                                typeOf={this.state.dialogtype}
                                isOpen={this.state.isOpen}
                                onClose={(e) =>
                                  this.setState({ isOpen: false })
                                }
                              ></Dialog>
                              <p
                                className="cancel-type"
                                onClick={() =>
                                  this.openDialog(
                                    localStorage.getItem("cancelType")
                                  )
                                }
                              >
                                <img
                                  className=""
                                  src={localStorage.getItem("cancelTypeImage")}
                                />
                                {localStorage.getItem("cancelType")}
                                <i
                                  class="fa fa-info-circle info-icon"
                                  aria-hidden="true"
                                ></i>
                              </p>
                            </div>
                            {localStorage.getItem("cancelType") ===
                            "free cancellation" ? (
                              <div
                                className="deals-card-right text-right"
                                onClick={() =>
                                  this.openDialog("Pay On Arrival")
                                }
                              >
                                <p className="cancel-type">
                                  Pay On Arrival
                                  <i
                                    class="fa fa-info-circle info-icon"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                                <p className="deal-price fw-700 p1">
                                  &#8377;{" "}
                                  {this.state.reservationBookingData.cut_price}
                                </p>
                              </div>
                            ) : (
                              <div
                                className="deals-card-right text-right"
                                onClick={() => this.openDialog("Pay Now")}
                              >
                                <p className="cancel-type">
                                  Pay Now
                                  <i
                                    class="fa fa-info-circle info-icon"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                                <p className="deal-price fw-700 p1">
                                  {" "}
                                  &#8377;{" "}
                                  {this.state.reservationBookingData.cut_price}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <ul className="checkout-calculation">
                            <li>
                              <span>
                                {this.state.reservationBookingData.totaldays}{" "}
                                Nights
                              </span>
                              <span>
                                <p
                                  className="font-green view-btn font-16"
                                  // onClick={this.showModal}
                                  onClick={() =>
                                    this.openDialog("pricebreakpopup")
                                  }
                                >
                                  View Details
                                </p>
                              </span>
                              <span className="amount fw-700">
                                {" "}
                                &#8377;{" "}
                                {this.state.reservationBookingData.cut_price}
                              </span>{" "}
                            </li>
                            <Dialog
                              style="transition:"
                              typeOf={this.state.dialogtype}
                              isOpen={this.state.isOpen}
                              onClose={(e) => this.setState({ isOpen: false })}
                            />
                            {this.state.extra_ameniteis.map((item, index) => (
                              <li>
                                {" "}
                                <span className="leftamenity">
                                  {item.amenities_title}
                                </span>{" "}
                                <span className="amount fw-700">
                                  {" "}
                                  &#8377; {parseInt(item.price)}
                                </span>
                              </li>
                            ))}
                            <li>
                              {" "}
                              <span className="colorgreen">Discount</span>
                              <ReactTooltip />
                              <span className="amount fw-700 colorgreen">
                                {" "}
                                - &#8377;{" "}
                                {parseInt(
                                  this.state.reservationBookingData.discount
                                )}
                              </span>{" "}
                            </li>
                            <li>
                              {" "}
                              <span>Cleaning fee</span>
                              <span>
                                <p
                                  className="font-green view-btn font-16"
                                  data-tip={result1}
                                >
                                  {" "}
                                  <i
                                    class="fa fa-info-circle info-icon"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                              </span>
                              <ReactTooltip />
                              <span className="amount fw-700">
                                {" "}
                                &#8377;{" "}
                                {parseInt(
                                  this.state.reservationBookingData
                                    .cleaning_charges
                                )}
                              </span>{" "}
                            </li>

                            <li>
                              {" "}
                              <span>Service fee</span>{" "}
                              <span>
                                <p
                                  className="font-green view-btn font-16"
                                  data-tip={result2}
                                >
                                  {" "}
                                  <i
                                    class="fa fa-info-circle info-icon"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                              </span>
                              <ReactTooltip />
                              <span className="amount fw-700">
                                {" "}
                                &#8377;{" "}
                                {parseInt(
                                  this.state.reservationBookingData.service_fees
                                )}
                              </span>{" "}
                            </li>

                            <li>
                              {" "}
                              <span>
                                {" "}
                                {this.state.reservationBookingData
                                  .discount_amount === null
                                  ? ""
                                  : "Promo Discount"}{" "}
                                {this.state.reservationBookingData
                                  .coupon_code &&
                                  "(" +
                                    this.state.reservationBookingData
                                      .coupon_code +
                                    ")"}
                              </span>{" "}
                              <span className="amount fw-700">
                                {" "}
                                {this.state.reservationBookingData
                                  .discount_amount !== null && (
                                  <React.Fragment>- &#8377; </React.Fragment>
                                )}
                                {this.state.reservationBookingData
                                  .discount_amount !== null
                                  ? parseInt(
                                      this.state.reservationBookingData
                                        .discount_amount
                                    )
                                  : ""}
                              </span>{" "}
                            </li>
                            <li>
                              {" "}
                              <span>Taxes</span>{" "}
                              <span>
                                <p
                                  className="font-green view-btn font-16"
                                  data-tip={result3}
                                >
                                  {" "}
                                  <i
                                    class="fa fa-info-circle info-icon"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                              </span>
                              <ReactTooltip />
                              <span className="amount fw-700">
                                {" "}
                                &#8377;{" "}
                                {parseInt(
                                  this.state.reservationBookingData.tax
                                )}
                              </span>{" "}
                            </li>
                          </ul>
                          <div className="hr-thin"></div>
                          <p className="check-total-amnt font-green font-cap fw-700 p2">
                            Total
                            <span>
                              {" "}
                              &#8377;{" "}
                              {parseInt(
                                this.state.reservationBookingData.total_amount
                              )}{" "}
                            </span>
                          </p>
                        </div>
                        {this.state.bookingstatus == 1 ? (
                          <Button
                            className="cancel-res mobile"
                            onClick={() =>
                              this.cancelbooking(
                                this.state.reservationBookingData.id
                              )
                            }
                          >
                            Request cancellation
                          </Button>
                        ) : (
                          <Button className="cancel-res ">Cancelled</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              {/* tab apartment end */}
            </Tabs>
          </div>
        </section>
        {/* location section */}
        <section className="reservationpamgeback mobview pad-45 ">
          <div className="container">
            <Heading title="Browse Other Locations" />
            <div className="row scroll-div">
              <ul className="ul-flex">
                {this.state.cities.map((city) => {
                  return (
                    // <li className="col-lg-3 col-md-3">
                    <li className="">
                      <Locations
                        locationId={city.id}
                        locationimg={city.image}
                        locationname={city.city_name}
                        propertysearch={this.propertysearch}
                      />
                    </li>
                  );
                })}

                <li className="">
                  <Locations locationimg={require("../../assets/Quote.jpg")} />
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="pad-100 location-section deskview">
          <div className="container">
            <Heading title="Browse by location" />
            <div className="row">
              {this.state.cities.map((city) => {
                return (
                  <div className="col-lg-3 col-md-3">
                    <Locations
                      locationId={city.id}
                      locationimg={city.image}
                      locationname={city.city_name}
                      propertysearch={this.propertysearch}
                    />
                  </div>
                );
              })}
              {/* <div className="col-lg-3 col-md-3">
                <Locations locationimg={require("../../assets/Quote.jpg")} />
              </div> */}
            </div>
          </div>
        </section>
        {/* location section end */}
      </React.Fragment>
    );
  }
}
export default Reservationpage;
