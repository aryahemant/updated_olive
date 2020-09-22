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
import queryString from "query-string";
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
import history from "../../lib/history";
import Dialog from "../dialog/dialog";
import { Helmet } from "react-helmet";
import parser from "html-react-parser";
import * as Scroll from "react-scroll";
// import createDOMPurify from "dompurify";
// import { JSDOM } from "jsdom";

// const window = new JSDOM("").window;
// const DOMPurify = createDOMPurify(window);

// import Form from "react-bootstrap/Form";

// import { Route, withRouter } from "react-dom";
const options = [
  { key: "c", text: "MasterCard", value: "MasterCard" },
  { key: "d", text: "Visa", value: "Visa" },
  { key: "e", text: "American Express", value: "americanexpress" },
];

class Checkoutpage extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      loggedIn: false,
      formshow: 2,
      form: "checkoutpage",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      special_request: "",
      card: "",
      name: "",
      cardNo: "",
      exp: "",
      gst_number: "",
      company_name: "",
      company_address: "",
      dayserror: " ",
      status: 0,
      checked: false,
      isOpen: false,
      dialogtype: "",
      discountprice: "",
      value: "2",
      agreeselected: "",
      agreeserror: "",
      disabled: false,
      componentType: false,
    };
    this.openCheckout = this.openCheckout.bind(this);
  }
  handleChange = (e, { value }) => this.setState({ value });
  componentDidMount() {
    window.scrollTo(0, 0);
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
    // let loggedIn = false;
    localStorage.setItem("selectdagree", false);
    this.setState({
      componentType: true,
    });

    if (localStorage.getItem("login")) {
      this.setState({
        loggedIn: true,
      });
    }
    console.info("login fsdfdspage", this.props.discountPrice);
  }

  formchange(valchange) {
    console.info(valchange);
    this.setState({
      formshow: valchange,
    });
  }

  taxcalculation = () => {
    this.props.taxcalculation();
  };

  removediscount = () => {
    this.props.removediscount();
  };
  handleDiscountSection = (discount) => {
    this.props.handleDiscountSection(discount);
  };
  handleGoBack = () => {
    this.props.history.push("/detail/page");
  };
  handleGst = () => {
    // console.info("checked ", this.state.checkedgst);
    this.setState({ checked: !this.state.checked });
  };

  handleBookingApi = () => {
    let scroll = Scroll.animateScroll;
    scroll.scrollTo(200);
    if (
      this.state.first_name == "" ||
      this.state.last_name == "" ||
      this.state.email == "" ||
      this.state.phone == ""
    ) {
      this.nameInput.focus();
      this.setState({
        dayserror: "Please fill all details",
      });
      return false;
    }
    console.info("chekdc", localStorage.getItem("selectdagree"));
    if (localStorage.getItem("selectdagree") === "false") {
      this.setState({
        agreeserror: "Please Select the agree checkbox",
      });
      return false;
    }
    this.setState({
      disabled: true,
    });
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    let extraamities;
    if (
      localStorage.getItem("amenitieslist") == null ||
      localStorage.getItem("amenitieslist") == "" ||
      localStorage.getItem("amenitieslist") == "undefined"
    ) {
      extraamities = 0;
    } else {
      extraamities = localStorage.getItem("amenitieslist").split(",");
    }
    console.log("card type", this.state.card);
    // return false;
    // const paymenttype = "Pay Later";

    // if (this.state.value === "1") {
    //   const paymenttype = "Pay On Arrival";
    // } else {
    //   const paymenttype = "Pay Later";
    // }

    axios({
      method: "post",
      url:
        "https://www.oliveservicedapartments.com/olive_api/public/api/booking",
      data: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.phone,
        property_id: localStorage.getItem("property_id"),
        roomtype_id: localStorage.getItem("roomType_id"),
        property_type: localStorage.getItem("apartmentTitle"),
        cut_price: localStorage.getItem("cut_price"),
        discount:
          localStorage.getItem("cut_price") - localStorage.getItem("dealPrice"),
        check_in: moment(localStorage.getItem("checkindate")).format(
          "YYYY-MM-DD"
        ),
        deal_type: localStorage.getItem("dealType"),
        cancellation_type: localStorage.getItem("cancelType"),
        check_out: moment(localStorage.getItem("checkoutdate")).format(
          "YYYY-MM-DD"
        ),
        guest: localStorage.getItem("noGuest"),
        coupon_id: localStorage.getItem("discountId"),
        extra_amenities: extraamities,
        price_type: localStorage.getItem("price_type"),
        card_type: this.state.card,
        card_name: this.state.name,
        card_digit: this.state.cardNo,
        expiry_date: this.state.exp,
        gst_number: this.state.gst_number,
        company_name: this.state.company_name,
        company_address: this.state.company_address,
        special_request: this.state.special_request,
        payment_type: this.state.value,
      },
      headers: { Authorization: AuthStr },
    })
      .then((response) => {
        //handle success
        localStorage.setItem("bookingResponse", response.data);
        localStorage.setItem("bookingname", this.state.first_name);
        localStorage.setItem("bookingemail", this.state.email);
        localStorage.setItem("bookingphone", this.state.phone);
        localStorage.setItem("bookingid", response.data.booking.id);
        if (localStorage.getItem("cancelType") != "non refundable") {
          localStorage.getItem("singleStatus") === "1"
            ? history.push(
                `/${localStorage
                  .getItem("cityName")
                  .toLowerCase()}/h/${localStorage.getItem(
                  "listing_slug"
                )}/reservation/${localStorage.getItem("bookingid")}`
              )
            : history.push(
                `/${localStorage
                  .getItem("cityName")
                  .toLowerCase()}/${localStorage.getItem(
                  "listing_slug"
                )}/reservation/${localStorage.getItem("bookingid")}`
              );
        }
      })
      // .then((response) => {
      //   //handle success
      //   localStorage.setItem("bookingResponse", response.data);
      //   localStorage.setItem("bookingid", response.data.booking.id);
      // })
      .catch(function (response) {
        //handle error
        console.log("Error while calling api", response);
      });
  };

  openCheckout() {
    let scroll = Scroll.animateScroll;
    scroll.scrollTo(200);
    if (
      this.state.first_name == "" ||
      this.state.last_name == "" ||
      this.state.email == "" ||
      this.state.phone == ""
    ) {
      this.nameInput.focus();
      this.setState({
        dayserror: "Please fill all details",
      });
      return false;
    }
    console.info("chekdc", localStorage.getItem("selectdagree"));
    if (localStorage.getItem("selectdagree") === "false") {
      this.setState({
        agreeserror: "Please Select the agree checkbox",
      });
      return false;
    }
    this.setState({
      agreeserror: "",
    });
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    this.handleBookingApi();
    axios({
      method: "post",
      url:
        "https://www.oliveservicedapartments.com/olive_api/public/api/payment",
      data: {
        property_id: localStorage.getItem("property_id"),
        amount: localStorage.getItem("totalAmount"),
      },
      headers: { Authorization: AuthStr },
    }).then((response) => {
      let options = {
        // key: "rzp_live_OqX0i5UoI1Kf1U",
        key: "rzp_live_dYt1l2s9CEdtjZ",
        amount: localStorage.getItem("totalAmount") * 100, // 2000 paise = INR 20, amount in paisa
        name: "Olive",
        description: "Olive BlueLeafCorp",
        image:
          "https://www.oliveservicedapartments.com/static/media/olive-logo.png",
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          axios({
            method: "post",
            url:
              "https://www.oliveservicedapartments.com/olive_api/public/api/payment/success",
            data: {
              property_id: localStorage.getItem("property_id"),
              amount_paid: localStorage.getItem("totalAmount"),
              razorpay_payment_id: response.razorpay_payment_id,
              booking_id: localStorage.getItem("bookingid"),
              phone: localStorage.getItem("bookingphone"),
              name: localStorage.getItem("bookingname"),
              email: localStorage.getItem("bookingemail"),
            },
            headers: { Authorization: AuthStr },
          }).then((response) => {
            console.info("getting response", response);
            if (response.data.status === "captured") {
              localStorage.getItem("singleStatus") === "1"
                ? history.push(
                    `/${localStorage
                      .getItem("cityName")
                      .toLowerCase()}/h/${localStorage.getItem(
                      "listing_slug"
                    )}/reservation/${localStorage.getItem("bookingid")}`
                  )
                : history.push(
                    `/${localStorage
                      .getItem("cityName")
                      .toLowerCase()}/${localStorage.getItem(
                      "listing_slug"
                    )}/reservation/${localStorage.getItem("bookingid")}`
                  );
              // this.props.history.push(`/thankyou`);
              // this.props.history.push("/detail/page");
            }
          });
        },
        prefill: {
          name: this.state.first_name,
          email: this.state.email,
          contact: this.state.phone,
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#5DB64C",
        },
      };
      let rzp = new window.Razorpay(options);
      rzp.open();
    });
  }
  // radioHandler = (status) => {
  //   this.setState({ status });
  // };

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

  handleChanges = (e) => {
    localStorage.setItem("selectdagree", e.target.value);
    this.setState({
      agreeselected: e.target.value,
    });
    console.info("select agree ", this.state.agreeselected);
  };

  render() {
    const { value } = this.state;
    // const renderHTML = (escapedHTML) =>
    //   React.createElement("div", {
    //     dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(escapedHTML) },
    //   });
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
                <h4 className="errormsg">{this.state.dayserror}</h4>
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
                {/* checkoutnew */}
                {this.state.loggedIn === false && (
                  <p className="login-title">
                    Already a member?{" "}
                    <span
                      className="font-green pointershow fw-700"
                      onClick={() => {
                        this.formchange(1);
                        history.push("/olive/auth/login");
                        localStorage.setItem("stts", "lgn");
                        this.props.handleAuthLogin();
                      }}
                    >
                      Login.
                    </span>
                    <br />
                    <span
                      className="font-green pointershow fw-700"
                      onClick={() => {
                        this.formchange(2);
                        history.push("/olive/auth/register");
                        localStorage.setItem("stts", "rgstr");
                        this.props.handleAuthRegister();
                      }}
                    >
                      Register
                    </span>{" "}
                    and get
                    <span className="font-green fw-700"> 10% off</span> on
                    booking.
                    <div className="hr-line-left-thick"></div>
                  </p>
                )}
                <Form className="registerform">
                  <div className="row ">
                    <span className="errormsg">{this.state.errormsg}</span>
                    <div className="col-md-6">
                      <Form.Field>
                        <label>First Name*</label>
                        <input
                          ref={(input) => {
                            this.nameInput = input;
                          }}
                          type="text"
                          placeholder="First Name"
                          onChange={(e) => {
                            this.setState({ first_name: e.target.value });
                          }}
                          required
                        />
                      </Form.Field>
                    </div>
                    <div className="col-md-6">
                      <Form.Field>
                        <label>Last Name*</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          onChange={(e) => {
                            this.setState({ last_name: e.target.value });
                          }}
                          required
                        />
                      </Form.Field>
                    </div>
                    <div className="col-md-6">
                      <Form.Field>
                        <label>Email Address*</label>
                        <input
                          type="email"
                          placeholder="Email"
                          onChange={(e) => {
                            this.setState({ email: e.target.value });
                          }}
                        />
                      </Form.Field>
                    </div>

                    <Dialog
                      style="transition:"
                      typeOf={this.state.dialogtype}
                      isOpen={this.state.isOpen}
                      onClose={(e) => this.setState({ isOpen: false })}
                    ></Dialog>
                    <div className="col-md-6">
                      <Form.Field>
                        <label>Phone*</label>
                        <input
                          type="number"
                          placeholder="9898989898"
                          onChange={(e) => {
                            this.setState({ phone: e.target.value });
                          }}
                          required
                          maxLength="10"
                        />
                      </Form.Field>
                    </div>
                    <div className="col-md-12">
                      <Form.TextArea
                        label="Special Request"
                        placeholder="Please let us know any special request for your stay"
                        onChange={(e) => {
                          this.setState({ special_request: e.target.value });
                        }}
                      />
                    </div>
                    <div className="col-md-12 gst-checkbox">
                      <Checkbox
                        label="I have a GST number (optional)"
                        onChange={this.handleGst}
                        checked={this.state.checked}
                      />
                    </div>
                    {this.state.checked && (
                      <Form>
                        {/* gst checkbox */}

                        {/* <div className="col-md-12">
                          <p className="login-title">
                            Reservation Guarantee
                            <ul className="gaurantee-check">
                              <li>No online payment.</li>
                              <li>
                                Your credit card details are only used to
                                gaurantee your booking.
                              </li>
                              <li>
                                Full payment need to be paid at the property on
                                arrival.
                              </li>
                            </ul>
                          </p>
                        </div> */}

                        <div className="col-md-12">
                          <Form.Field>
                            <label>GST Number</label>
                            <input
                              placeholder="GST Number"
                              onChange={(e) =>
                                this.setState({ gst_number: e.target.value })
                              }
                            />
                          </Form.Field>
                        </div>
                        <div className="col-md-12">
                          <Form.Field>
                            <label>Company Name</label>
                            <input
                              placeholder="Company Name"
                              onChange={(e) =>
                                this.setState({ company_name: e.target.value })
                              }
                            />
                          </Form.Field>
                        </div>
                        <div className="col-md-12">
                          <Form.Field>
                            <label>Company Address</label>
                            <input
                              placeholder="Company Address"
                              onChange={(e) =>
                                this.setState({
                                  company_address: e.target.value,
                                })
                              }
                            />
                          </Form.Field>
                        </div>
                      </Form>
                    )}

                    {localStorage.getItem("cancelType") ===
                      "non refundable" && (
                      <React.Fragment>
                        <p className="p2 checkoutpolicy">
                          {JSON.parse(localStorage.getItem("alltooltips")) &&
                            parser(
                              JSON.parse(localStorage.getItem("alltooltips"))
                                .non_refundable
                            )}
                        </p>
                        <p className="p2 checkoutpolicy">
                          {JSON.parse(localStorage.getItem("alltooltips")) &&
                            parser(
                              JSON.parse(localStorage.getItem("alltooltips"))
                                .pay_now
                            )}
                        </p>
                      </React.Fragment>
                    )}
                    {localStorage.getItem("cancelType") ===
                      "free cancellation" && (
                      <React.Fragment>
                        {/* checkbox area */}
                        <div className="col-md-12 select-payment">
                          <Form>
                            <div className="col-md-12">
                              <p className="login-title">
                                When Do you Want to pay ?
                              </p>
                            </div>
                            <Form.Field></Form.Field>
                            <Form.Field>
                              <Checkbox
                                radio
                                label="Pay On Arrival"
                                name="checkboxRadioGroup"
                                value="1"
                                checked={this.state.value === "1"}
                                onChange={this.handleChange}
                              />
                              <span>
                                <p className="cbox-desc">
                                  We will need a valid Credit Card to confirm
                                  your booking. Your card won't be charged and
                                  you can Pay on Arrival at the Property as per
                                  Booking Policy.
                                </p>
                                {/* <p className="cbox-desc">
                                  If the Cancellation Policy of this reservation
                                  is violated, this pre-authorization will be
                                  converted to charges for Cancellation and
                                  charged to your Credit Card on the date of
                                  arrival.
                                </p> */}
                              </span>
                            </Form.Field>
                            {this.state.value == "1" && (
                              <React.Fragment>
                                <div className="row">
                                  <div className="col-md-3">
                                    <label className="selctlbl">
                                      Select card
                                    </label>
                                    <select
                                      className="card-type"
                                      onChange={(e) =>
                                        this.setState({
                                          card: e.target.value,
                                        })
                                      }
                                    >
                                      <option>Select Card..</option>
                                      <option value="MasterCard">
                                        MasterCard
                                      </option>
                                      <option value="Visa">Visa</option>
                                      <option value="americanexpress">
                                        American Express
                                      </option>
                                    </select>
                                    {/* <Form.Select
                                      onChange={(e) =>
                                        this.setState({
                                          card: e.target.value,
                                        })
                                      }
                                      fluid
                                      label="Credit Card Type"
                                      options={options}
                                      placeholder="Select Card"
                                      className="card-type"
                                    /> */}
                                  </div>
                                  <div className="col-md-3">
                                    <Form.Field>
                                      <label>Name on card</label>
                                      <input
                                        onChange={(e) =>
                                          this.setState({
                                            name: e.target.value,
                                          })
                                        }
                                        type="text"
                                        placeholder="Name on Card"
                                        required
                                      />
                                    </Form.Field>
                                  </div>
                                  <div className="col-md-3">
                                    <Form.Field>
                                      <label>Credit card</label>
                                      <input
                                        onChange={(e) =>
                                          this.setState({
                                            cardNo: e.target.value,
                                          })
                                        }
                                        type="text"
                                        placeholder="Last 4 digits only"
                                        maxLength="4"
                                        required
                                      />
                                    </Form.Field>
                                  </div>
                                  <div className="col-md-3">
                                    <Form.Field>
                                      <label>Expiry date</label>
                                      <input
                                        onChange={(e) =>
                                          this.setState({ exp: e.target.value })
                                        }
                                        type="text"
                                        placeholder="MM/YY"
                                        required
                                      />
                                    </Form.Field>
                                  </div>
                                  <span className="warnmsg">
                                    {" "}
                                    Your card won't be charged – we only need
                                    your card details to guarantee your booking.
                                  </span>
                                  <br />
                                </div>
                              </React.Fragment>
                            )}
                            <Form.Field>
                              <Checkbox
                                radio
                                label="Pay Later"
                                name="checkboxRadioGroup"
                                value="2"
                                checked={this.state.value === "2"}
                                onChange={this.handleChange}
                              />
                              <span>
                                <p className="cbox-desc">
                                  No payment or Credit Card required to complete
                                  your booking. You will need to pay 25% of your
                                  total reservation price as Advance Payment
                                  atleast 3 days before arrival to confirm your
                                  booking as per Booking Policy.
                                </p>
                                {/* <p className="cbox-desc">
                                  Your Booking will be confirmed only after
                                  receipt of Advance Payment, if Advance Payment
                                  is not received within 7 Days before arrival,
                                  then your booking will be cancelled
                                  automatically.
                                </p> */}
                              </span>
                            </Form.Field>
                          </Form>
                        </div>
                        {/* checkbox area end */}
                      </React.Fragment>
                    )}

                    {localStorage.getItem("dealType") ===
                    "best available rate" ? (
                      <div className="col-md-12 mb-15">
                        {/* <p className="p2">
                          <strong>Best Available Rate:</strong> Book directly on
                          our website and avail of this exclusive online offer
                          that does NOT require you to pay anything when making
                          your booking, Even better, you can also cancel or
                          modify this booking FREE of cost up to 14 days before
                          your date of arrival - NO Cancellation Charges up to
                          14 Days from your arrival.
                        </p> */}

                        {this.state.value == "1" && (
                          <p className="p2 checkoutpolicy">
                            {/* <strong>Pre-Payment Policy:</strong> */}
                            {
                              // renderHTML(result1)
                              JSON.parse(localStorage.getItem("alltooltips")) &&
                                parser(
                                  JSON.parse(
                                    localStorage.getItem("alltooltips")
                                  ).pay_arrival_cancel_policy
                                )
                            }
                            {/* <p className="p2">
                              We will "pre-authorize" your Credit Card 7 Days
                              before date of arrival for an amount equivalent to
                              the Cancellation Charges. This pre-authorization
                              will be removed when you make full Payment On
                              Arrival by Cash or Credit/Debit card.{" "}
                            </p> */}
                            {/* <p className="p2">
                              If the Cancellation Policy of this reservation is
                              violated, this pre-authorization will be converted
                              to charges for Cancellation and charged to your
                              Credit Card on the date of arrival.
                            </p> */}
                          </p>
                        )}

                        {this.state.value == "2" && (
                          <p className="p2 checkoutpolicy">
                            {
                              // renderHTML(result2)
                              JSON.parse(localStorage.getItem("alltooltips")) &&
                                parser(
                                  JSON.parse(
                                    localStorage.getItem("alltooltips")
                                  ).pay_later_cancel_policy
                                )
                            }
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="col-md-12 mb-15">
                        {/* <p className="p2">
                          <strong>Details for Hot Deal:</strong> Book directly
                          on our website to get the HOTTEST Deal for this
                          apartment! It is the Lowest Possible Rate for this
                          Apartment that you get only when you book directly
                          online through the OLIVE website here, backed by our
                          Lowest Price Guarantee - we guarantee that you will
                          NOT find a lower rate for this apartment! If you book
                          online with us and find a better price anywhere else
                          online within 24 hours, let us know and we will:{" "}
                          <br /> * Honour the lower rate and <br />* Upgrade
                          your Apartment to the next category, completely free
                          of charge. <br />
                          You can know more about our Lowest Price Guarantee at
                          - <br />
                          https://www.oliveservicedapartments.com/lowest-price-guarantee
                        </p> */}
                      </div>
                    )}
                    <div className="col-md-12">
                      <Form.Field>
                        <input
                          type="checkbox"
                          className="agreecheckbox"
                          onChange={(e) => {
                            this.handleChanges({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            });
                          }}
                        />
                        <label>
                          I agree to the House Rules and Cancellation
                          Policy,Terms of Service &
                          <a
                            onClick={() =>
                              this.openDialog(
                                localStorage.getItem("apartmentTitle")
                              )
                            }
                          >
                            {" "}
                            Privacy Policy{" "}
                          </a>
                          . I also agree to pay the total amount shown, which
                          includes Occupancy Taxes.
                        </label>
                      </Form.Field>
                      <p className="agreeerrormsg">{this.state.agreeserror}</p>
                    </div>
                    {localStorage.getItem("cancelType") === "non refundable" ? (
                      <div className="col-md-12 text-center mt-20 mb-30 ">
                        <Button
                          className="listing-btn mb-15 pad2050 wid-60"
                          onClick={() => this.openCheckout()}
                          disabled={this.state.disabled}
                        >
                          Complete Booking
                        </Button>
                      </div>
                    ) : (
                      <div className="col-md-12 text-center mt-20 mb-30 ">
                        <Button
                          className="listing-btn mb-15 pad2050 wid-60"
                          onClick={() => this.handleBookingApi()}
                          disabled={this.state.disabled}
                        >
                          Complete Booking
                        </Button>
                      </div>
                    )}
                  </div>
                </Form>
                {/* checkoutnew */}

                {/* {this.state.loggedIn === false && (
                  <p className="login-title">
                    Already a member?
                    <span
                      className="font-green fw-700"
                      onClick={() => {
                        this.formchange(1);
                        history.push("/olive/auth/login");
                        localStorage.setItem("stts", "lgn");
                        this.props.handleAuthLogin();
                      }}
                    >
                      Login.
                    </span>
                    <br />
                    <span
                      className="font-green fw-700"
                      onClick={() => {
                        this.formchange(2);
                        history.push("/olive/auth/register");
                        localStorage.setItem("stts", "rgstr");
                        this.props.handleAuthRegister();
                      }}
                    >
                      Register
                    </span>{" "}
                    and get
                    <span className="font-green fw-700"> 10% off</span> on
                    booking.
                    <div className="hr-line-left-thick"></div>
                  </p>
                )} */}

                <div className="">
                  {/* {localStorage.getItem("login")  ?(
                      <React.Fragment>
                        <Loginform
                          loginname="Complete Booking"
                          from="checkoutpag"
                        />
                      </React.Fragment>
                    ) ? (
                      <Registerform
                        submitname="complete booking"
                        from="checkoutpage"
                      />
                    )
                   : ( */}
                  {/* <Withloginpage /> */}
                  {/* )} */}
                </div>
              </div>
              <div className="col-md-4">
                <Checkoutdetail
                  amenityDetail={JSON.parse(
                    localStorage.getItem("amenityDetail")
                  )}
                  price={parseInt(localStorage.getItem("amenityPrice"))}
                  days={this.props.days}
                  discountPrice1={this.props.discountPrice}
                  noDays={this.props.noDays}
                  propertyPrice={this.props.price}
                  calculatedtax={this.props.calculatedtax}
                  taxval={this.props.taxval}
                  taxcalculation={this.taxcalculation}
                  // discountsec={this.props.discountsec}
                  removediscount={this.removediscount}
                  handleDiscountSection={this.handleDiscountSection}
                  handleGoBack={this.handleGoBack}
                  handleTotalPrice={this.handleTotalPrice}
                  handleBookingApi={this.handleBookingApi}
                  openCheckout={this.openCheckout}
                  componentType={this.state.componentType}
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
