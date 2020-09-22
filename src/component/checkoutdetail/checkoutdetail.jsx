import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkoutdetail.css";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Checkbox,
  Sticky,
} from "semantic-ui-react";
import history from "../../lib/history";
import moment from "moment";
import axios from "axios";
import { Modal } from "antd";
import {
  Router,
  Switch,
  Route,
  NavLink,
  withRouter,
  Redirect,
  useLocation,
} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Dialog from "../dialog/dialog";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import queryString from "query-string";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

class Checkoutdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      apartmentTitle: this.props.apartmentTitle,
      // discount_price: 0,
      discountmsg: "",
      noDays: localStorage.getItem("noDays"),
      totalPrice: localStorage.getItem("dealPrice"),
      taxprice: 0,
      calculatedtax: 0,
      discountsec: 0,
      cleaningfee: parseInt(localStorage.getItem("clealing_fee")),
      amenitylist: this.props.price,
      couponcode: "",
      allpolicies: [],
      policies: [],
      amenityArray: [],
      urldata: queryString.parse(this.props.location.search),
    };
    this.changeAmount = this.changeAmount.bind(this);
  }
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
  async componentDidMount() {
    console.info("check url data", this.state.urldata.property_slug);
    // console.log("layouts", this.state.layouts);
    // this.setState(
    //   {
    //     allpolicies: JSON.parse(localStorage.getItem("alltooltips")),
    //     taxes: JSON.parse(localStorage.getItem("alltooltips")).taxes
    //   },
    //   () => {
    //     console.log("amenityd Array ", this.state.allpolicies["hot_deal"]);
    //   }
    // );
    // console.log("amenity Array", this.state.hemant);

    // console.log("all polity", JSON.parse(localStorage.getItem("alltooltips")));
    const resp = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/policies`
    );
    const value = resp.data;
    this.setState({
      policies: resp.data.policies,
    });
    console.log("policy", this.state.policies);

    this.props.taxcalculation();
  }

  getcouponcode = (e) => {
    console.log(e);
    this.setState({
      couponcode: e.target.value,
    });
    console.info("coupon code", this.state.couponcode);
    localStorage.setItem("coponcode", this.state.couponcode);
  };

  handleDiscountApi = () => {
    const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
    console.log(USER_TOKEN);
    const AuthStr = "Bearer ".concat(USER_TOKEN);
    axios({
      method: "post",
      url:
        "https://www.oliveservicedapartments.com/olive_api/public/api/discount",
      data: {
        code: this.state.couponcode,
        property_id: localStorage.getItem("property_id"),
        guest: localStorage.getItem("property_id"),
        roomtype_id: localStorage.getItem("roomType_id"),
        check_in: moment(localStorage.getItem("startDate")).format(
          "YYYY-MM-DD"
        ),
        check_out: moment(localStorage.getItem("endDate")).format("YYYY-MM-DD"),
      },
      headers: { Authorization: AuthStr },
    })
      .then((response) => {
        //handle success
        console.info("response ", response.data.status);
        if (response.data.status === 0) {
          this.setState({
            // discount_price: response.data.discount.discount,
            discountmsg: response.data.message,
            discountsec: 0,
          });
        } else {
          this.setState({
            // discount_price: response.data.discount.discount,
            discountmsg: "Discount Successfully applied ",
            discountsec: 1,
          });
          this.props.handleDiscountPrice(response.data.discount.discount);
          localStorage.setItem("discountId", response.data.discount.id);
          this.props.handleDiscountSection(this.state.discountsec);
          this.props.taxcalculation();
        }
      })
      .catch(function (response) {
        //handle error
        console.log("Error while calling api", response);
      });
  };

  // removediscount = () => {
  // this.props.handleDiscountPrice(0);
  //   localStorage.removeItem("discountId");
  //   this.setState({
  //     discountsec: 0,
  //   });
  // };

  handleApartmentType = (e) => {
    let stdToSupHot = localStorage.getItem("stdToSupHot");
    let stdToSupHotFree = localStorage.getItem("stdToSupHotFree");
    let supToPre = localStorage.getItem("supToPre");
    let supToPreFree = localStorage.getItem("supToPreFree");
    let deal_price_pre = localStorage.getItem("deal_price_pre");
    let deal_price_pre_free = localStorage.getItem("deal_price_pre_free");
    // cut price
    let stdToSupHotcut = localStorage.getItem("stdToSupHotcut");
    let stdToSupHotFreecut = localStorage.getItem("stdToSupHotFreecut");
    let supToPrecut = localStorage.getItem("supToPrecut");
    let supToPreFreecut = localStorage.getItem("supToPreFreecut");
    let deal_price_pre_cut = localStorage.getItem("deal_price_pre_cut");
    let deal_price_pre_free_cut = localStorage.getItem(
      "deal_price_pre_free_cut"
    );

    console.log(stdToSupHot, stdToSupHotFree, supToPre, supToPreFree);
    console.log(
      "fas gya",
      JSON.parse(localStorage.getItem("property_amenity_pre"))
    );

    if (
      localStorage.getItem("apartmentTitle") === "furnished" &&
      localStorage.getItem("dealType") === "hot deal"
    ) {
      localStorage.setItem("apartmentTitle", "Standard");
      localStorage.setItem("dealPrice", stdToSupHot);
      localStorage.setItem("aprtment_type_code", 2);
      localStorage.setItem("price_type", "snrefundable_price");
      localStorage.setItem("cut_price", stdToSupHotcut);
      localStorage.setItem(
        "property_amenity",
        JSON.stringify(JSON.parse(localStorage.getItem("property_amenity_sup")))
      );
      localStorage.setItem("cutprice", localStorage.getItem("cutprice_sup"));
      localStorage.removeItem("amenity_details");
      localStorage.removeItem("amenity_price");
      localStorage.removeItem("amenityDetail");
      localStorage.removeItem("amenitieslist");

      this.setState(
        {
          totalPrice: localStorage.setItem("dealPrice", stdToSupHot),
        },
        () => {
          console.log("calculation", this.state.totalPrice);
        }
      );
      this.props.taxcalculation();
      localStorage.setItem("supToPre", deal_price_pre);
      localStorage.setItem("supToPrecut", deal_price_pre_cut);
      localStorage.setItem(
        "cutprice_sup_pre",
        localStorage.getItem("cutprice_pre")
      );
    } else if (
      localStorage.getItem("apartmentTitle") === "furnished" &&
      localStorage.getItem("dealType") === "best available rate"
    ) {
      localStorage.setItem("apartmentTitle", "Standard");
      localStorage.setItem("dealPrice", stdToSupHotFree);
      localStorage.setItem("aprtment_type_code", 2);
      localStorage.removeItem("amenity_details");
      localStorage.removeItem("amenity_price");
      localStorage.removeItem("amenityDetail");
      localStorage.removeItem("amenitieslist");
      localStorage.setItem(
        "property_amenity",
        JSON.stringify(JSON.parse(localStorage.getItem("property_amenity_sup")))
      );
      localStorage.setItem("cut_price", stdToSupHotFreecut);
      localStorage.setItem(
        "cutprice",
        localStorage.getItem("cutprice_sup_free")
      );
      localStorage.setItem("price_type", "srefundable_price");
      this.setState(
        {
          totalPrice: localStorage.setItem("dealPrice", stdToSupHotFree),
        },
        () => {
          console.log("calculation", this.state.totalPrice);
        }
      );

      this.props.taxcalculation();

      localStorage.setItem("supToPreFree", deal_price_pre_free);
      localStorage.setItem("supToPreFreecut", deal_price_pre_free_cut);
      localStorage.setItem(
        "cutprice_sup_pre_free",
        localStorage.getItem("cutprice_pre_free")
      );
    } else if (
      localStorage.getItem("apartmentTitle") === "Standard" &&
      localStorage.getItem("dealType") === "hot deal"
    ) {
      localStorage.setItem("apartmentTitle", "Superior");
      localStorage.setItem("dealPrice", supToPre);
      localStorage.setItem("cut_price", supToPrecut);
      localStorage.setItem("aprtment_type_code", 3);
      localStorage.removeItem("amenity_details");
      localStorage.removeItem("amenity_price");
      localStorage.removeItem("amenityDetail");
      localStorage.removeItem("amenitieslist");
      localStorage.removeItem("property_amenity");
      localStorage.setItem(
        "cutprice",
        localStorage.getItem("cutprice_sup_pre")
      );
      localStorage.setItem("price_type", "pnrefundable_price");
      localStorage.setItem(
        "property_amenity",
        JSON.stringify(JSON.parse(localStorage.getItem("property_amenity_pre")))
      );
      this.setState(
        {
          totalPrice: localStorage.setItem("dealPrice", supToPre),
        },
        () => {
          console.log("calculation", this.state.totalPrice);
        }
      );

      this.props.taxcalculation();
    } else {
      localStorage.setItem("apartmentTitle", "Superior");
      localStorage.setItem("dealPrice", supToPreFree);
      localStorage.setItem("cut_price", supToPreFreecut);
      localStorage.setItem("aprtment_type_code", 3);
      localStorage.removeItem("amenity_details");
      localStorage.removeItem("amenity_price");
      localStorage.removeItem("amenityDetail");
      localStorage.removeItem("amenitieslist");
      localStorage.removeItem("property_amenity");
      localStorage.setItem("price_type", "prefundable_price");
      localStorage.setItem(
        "cutprice",
        localStorage.getItem("cutprice_sup_pre_free")
      );
      localStorage.setItem(
        "property_amenity",
        JSON.stringify(JSON.parse(localStorage.getItem("property_amenity_pre")))
      );
      this.setState(
        {
          totalPrice: localStorage.setItem("dealPrice", supToPreFree),
        },
        () => {
          console.log("calculation", this.state.totalPrice);
        }
      );

      this.props.taxcalculation();
    }
    // e.preventDefault();
  };

  changeAmount(e) {
    this.setState({ amount: e.target.value });
  }

  // openCheckout() {
  //   const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
  //   console.log(USER_TOKEN);
  //   const AuthStr = "Bearer ".concat(USER_TOKEN);
  //   axios({
  //     method: "post",
  //     url: "https://www.oliveservicedapartments.com/olive_api/public/api/payment",
  //     data: {
  //       property_id: localStorage.getItem("property_id"),
  //       amount: this.state.totalPrice,
  //     },
  //     headers: { Authorization: AuthStr },
  //   }).then((response) => {
  //     let options = {
  //       key: "rzp_test_dPfF4fXMcXM53w",
  //       amount: this.state.totalPrice * 100, // 2000 paise = INR 20, amount in paisa
  //       name: "Olive",
  //       description: "Purchase Description",
  //       image: "https://www.oliveservicedapartments.com/olivelg.png",
  //       handler: function (response) {
  //         // alert(response.razorpay_payment_id);
  //         axios({
  //           method: "post",
  //           url: "https://www.oliveservicedapartments.com/olive_api/public/api/payment/success",
  //           data: {
  //             property_id: localStorage.getItem("property_id"),
  //             amount_paid: "400.00",
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             booking_id: 12345,
  //             phone: "989933343",
  //             name: "hemant arya",
  //             email: "hemant@theantialias.com",
  //           },
  //           headers: { Authorization: AuthStr },
  //         }).then((response) => {});
  //       },
  //       prefill: {
  //         name: "Harshil Mathur",
  //         email: "test@razorpay.com",
  //         contact: "9899299345",
  //       },
  //       notes: {
  //         address: "Hello World",
  //       },
  //       theme: {
  //         color: "#5DB64C",
  //       },
  //     };
  //     let rzp = new window.Razorpay(options);
  //     rzp.open();
  //   });
  // }
  handlePropertyAmenity = () => {
    let array = [];
    JSON.parse(localStorage.getItem("amenVal")) &&
      JSON.parse(localStorage.getItem("amenVal")).map((amenity, index) => {
        amenity.room_type ===
          parseInt(localStorage.getItem("aprtment_type_code")) &&
          array.push({
            id: amenity.id,
            amenities_title: amenity.amenities_title,
            description: amenity.description,
            is_active: amenity.is_active,
            image: amenity.image,
            type: amenity.type,
            price: amenity.price,
            price_type: amenity.price_type,
            room_type: amenity.room_type,
            is_checkout: amenity.is_checkout,
            order_number: amenity.order_number,
            created_at: amenity.created_at,
            updated_at: amenity.updated_at,
          });
      });
    this.setState({
      amenityArray: array,
    });
    console.log("array", array);
    // localStorage.setItem("amenityArray", JSON.stringify(array))
  };
  render() {
    let servicefee;
    let tax = JSON.parse(localStorage.getItem("alltooltips"));
    if (localStorage.getItem("apartmentTitle") === "furnished") {
      tax.fservice_fees
        ? (servicefee = parseInt(
            (localStorage.getItem("dealPrice") * tax.fservice_fees) / 100
          ))
        : (servicefee = 0);
    }
    if (localStorage.getItem("apartmentTitle") === "Standard") {
      tax.sservice_fees
        ? (servicefee = parseInt(
            (localStorage.getItem("dealPrice") * tax.sservice_fees) / 100
          ))
        : (servicefee = 0);
    }
    if (localStorage.getItem("apartmentTitle") === "Superior") {
      tax.suservice_fees
        ? (servicefee = parseInt(
            (localStorage.getItem("dealPrice") * tax.suservice_fees) / 100
          ))
        : (servicefee = 0);
    }

    let total = parseFloat(
      parseInt(localStorage.getItem("dealPrice")) +
        servicefee +
        // *localStorage.getItem("noDays")
        this.props.calculatedtax +
        (localStorage.getItem("amenitieslist") === null ||
        localStorage.getItem("amenitieslist") == ""
          ? 0
          : parseInt(localStorage.getItem("amenityPrice"))) -
        this.props.discountPrice1 +
        (localStorage.getItem("clealing_fee") == null ||
        localStorage.getItem("clealing_fee") == "undefined"
          ? 0
          : parseInt(localStorage.getItem("clealing_fee")))
    ).toFixed();
    localStorage.setItem("totalAmount", total);

    const regex = /(<([^>]+)>)/gi;
    console.log(
      "you before",
      JSON.parse(localStorage.getItem("alltooltips")).cleaning_fees
    );
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
    const renderHTML = (escapedHTML) =>
      React.createElement("div", {
        dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(escapedHTML) },
      });
    console.log(
      "you after",
      <div
        dangerouslySetInnerHTML={{
          __html: JSON.parse(localStorage.getItem("alltooltips")).cleaning_fees,
        }}
      />
    );

    return (
      <React.Fragment>
        <div className="apartmentdetail-area-main">
          <div className="checkout-img">
            <img
              // src={this.props.apartmentImage}
              src={localStorage.getItem("apartmentImage")}
            />
          </div>

          <div className="apartmentdetail-area">
            <p className="apartment-title font-green font-cap fw-700 mb-10">
              {/* {this.props.apartmentName} */}
              {localStorage.getItem("apartmenttitle")}
            </p>
            <p className="d-inline-block">
              {this.props.regionName} | {localStorage.getItem("cityName")}
            </p>
            <p className="d-inline-block chng-btn">
              <a
                className="font-green d-inline"
                onClick={() =>
                  history.push(
                    `/${this.state.urldata.city.toLowerCase()}/${
                      this.state.urldata.property_slug
                    }?city=${this.state.urldata.city}&id=${
                      this.state.urldata.id
                    }&startDate=${
                      this.state.urldata.startDate != ""
                        ? moment(this.state.urldata.startDate).format(
                            "YYYY-MM-DD"
                          )
                        : ""
                    }&endDate=${
                      this.state.urldata.endDate != ""
                        ? moment(this.state.urldata.endDate).format(
                            "YYYY-MM-DD"
                          )
                        : ""
                    }&guests=${this.state.urldata.guests}`
                  )
                }
              >
                Change
              </a>
            </p>
            <div className="hr-thin mb-10"></div>
            <p className="date-guest font-cap mb-10">
              <img
                className=""
                src={require("../../assets/apartmentdetails/calendar20.png")}
              />
              {moment(localStorage.getItem("checkindate")).format(
                "ddd, MMM D , YYYY"
              )}{" "}
              -{" "}
              {moment(localStorage.getItem("checkoutdate")).format(
                "ddd, MMM D , YYYY"
              )}
            </p>
            <p className="date-guest font-cap mb-10">
              <img
                className=""
                src={require("../../assets/apartmentdetails/guest20.png")}
              />
              {this.state.urldata.guests} Guest
            </p>
            <div className="hr-thin mb-10"></div>
            <p className="apartment-type-sel font-cap fw-700">
              <span>{localStorage.getItem("apartmentName")}</span> -
              <span className="font-green">
                {" "}
                {localStorage.getItem("apartmentTitle")}
              </span>
              <a
                className="font-green"
                onClick={() =>
                  history.push(
                    `/${this.state.urldata.city.toLowerCase()}/${
                      this.state.urldata.property_slug
                    }?city=${this.state.urldata.city}&id=${
                      this.state.urldata.id
                    }&startDate=${
                      this.state.urldata.startDate != ""
                        ? moment(this.state.urldata.startDate).format(
                            "YYYY-MM-DD"
                          )
                        : ""
                    }&endDate=${
                      this.state.urldata.endDate != ""
                        ? moment(this.state.urldata.endDate).format(
                            "YYYY-MM-DD"
                          )
                        : ""
                    }&guests=${this.state.urldata.guests}`
                  )
                }
              >
                Change
              </a>
            </p>
            <p className=" font-cap apartment-type-sel-chng ">
              {localStorage.getItem("apartmentTitle") === "furnished" &&
              localStorage.getItem("dealType") === "hot deal" ? (
                <a
                  onClick={() => {
                    this.handleApartmentType();
                  }}
                  className="font-black"
                  href="#"
                >
                  Upgrade to{" "}
                  <span className="font-green fw-700"> Standard </span>
                  for only &#8377; {localStorage.getItem("stdToSupHot")}
                  {/* {this.props.stdToSupPrice} {this.props.stdToSupPriceFree} */}
                </a>
              ) : localStorage.getItem("apartmentTitle") === "furnished" &&
                localStorage.getItem("dealType") === "best available rate" ? (
                <a
                  onClick={() => {
                    this.handleApartmentType();
                  }}
                  className="font-black"
                  href="#"
                >
                  Upgrade to{" "}
                  <span className="font-green fw-700"> Standard </span>
                  for only &#8377; {localStorage.getItem("stdToSupHotFree")}
                  {/* {this.props.stdToSupPrice} {this.props.stdToSupPriceFree} */}
                </a>
              ) : localStorage.getItem("apartmentTitle") === "Standard" &&
                localStorage.getItem("dealType") === "hot deal" ? (
                <a
                  onClick={() => {
                    this.handleApartmentType();
                  }}
                  className="font-black"
                  href="#"
                >
                  Upgrade to{" "}
                  <span className="font-green fw-700"> Superior </span>
                  for only &#8377; {localStorage.getItem("supToPre")}
                  {/* {this.props.supToPre} {this.props.supToPreFree} */}
                </a>
              ) : localStorage.getItem("apartmentTitle") === "Standard" &&
                localStorage.getItem("dealType") === "best available rate" ? (
                <a
                  onClick={() => {
                    this.handleApartmentType();
                  }}
                  className="font-black"
                  href="#"
                >
                  Upgrade to{" "}
                  <span className="font-green fw-700"> Superior </span>
                  for only &#8377; {localStorage.getItem("supToPreFree")}
                  {/* {this.props.supToPre} {this.props.supToPreFree} */}
                </a>
              ) : (
                ""
              )}
            </p>
            {/* <ul className="checkout-amenties">
              <li>
                <p className="date-guest font-cap mb-10">
                  <img
                    className=""
                    src={require("../../assets/apartmentdetails/guest20.png")}
                  />
                  {localStorage.getItem("noGuest")} Guest
                </p>
              </li>
              <li>
                <p className="date-guest font-cap mb-10">
                  <img
                    className=""
                    src={require("../../assets/apartmentdetails/building20.png")}
                  />
                  studio
                </p>
              </li>
              <li>
                <p className="date-guest font-cap mb-10">
                  <img
                    className=""
                    src={require("../../assets/apartmentdetails/bed20.png")}
                  />
                  {localStorage.getItem("nobeds")} Bed
                </p>
              </li>
              <li>
                <p className="date-guest font-cap mb-10">
                  <img
                    className=""
                    src={require("../../assets/apartmentdetails/bathroom20.png")}
                  />
                  {localStorage.getItem("nobath")}
                  Bathroom
                </p>
              </li>
            </ul> */}
            <p
              className="text-center font-green all-det-btn fw-700"
              onClick={() => this.openDialog("aprtmentdetailpopup")}
            >
              View More Details
            </p>
            <div className="hr-thin"></div>
            <p
              className="fw-700 font-upper mt-10"
              onClick={() => this.openDialog(localStorage.getItem("dealType"))}
            >
              {localStorage.getItem("dealType")}
              <i
                class="fa fa-info-circle info-icon font-green"
                aria-hidden="true"
              ></i>
            </p>
            <Dialog
              style="transition:"
              typeOf={this.state.dialogtype}
              isOpen={this.state.isOpen}
              onClose={(e) => this.setState({ isOpen: false })}
              amenityArray={this.state.amenityArray}
            />
            <div>
              <p
                className="date-guest font-cap mb-10 "
                onClick={() =>
                  this.openDialog(localStorage.getItem("cancelType"))
                }
              >
                <img
                  className=""
                  // src={require("../../assets/apartmentdetails/check20.png")}
                  // src={this.props.cancelTypeImage}
                  src={localStorage.getItem("cancelTypeImage")}
                />
                {/* {this.props.cancelType} */}
                {localStorage.getItem("cancelType")}
                <i
                  class="fa fa-info-circle info-icon font-green"
                  aria-hidden="true"
                ></i>
              </p>
              {localStorage.getItem("cancelType") === "free cancellation" ? (
                <p
                  className="date-guest font-cap mb-10"
                  onClick={() => this.openDialog("Pay On Arrival")}
                >
                  <img
                    className=""
                    src={require("../../assets/apartmentdetails/Pay_Now_Later._blk.png")}
                  />
                  Pay On Arrival
                  <i
                    class="fa fa-info-circle info-icon font-green"
                    aria-hidden="true"
                  ></i>
                </p>
              ) : (
                <React.Fragment>
                  <p
                    className="date-guest font-cap mb-10 in30"
                    onClick={() => this.openDialog("Pay Now")}
                  >
                    <img
                      className=""
                      src={require("../../assets/apartmentdetails/Pay_Now_Later._blk.png")}
                    />
                    Pay Now
                    <i
                      class="fa fa-info-circle info-icon font-green"
                      aria-hidden="true"
                    ></i>
                  </p>
                  {/* <button onClick={this.openCheckout}>Pay Now</button> */}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="bg-black padding-10 text-center">
            <p className="whole-amount apartment-title font-cap fw-700 font-white">
              {localStorage.getItem("cutprice") != 0 &&
              localStorage.getItem("cut_price") !=
                localStorage.getItem("dealPrice") ? (
                <React.Fragment>
                  <strike>
                    &#8377;{" "}
                    {localStorage.getItem("cutprice") != null
                      ? (
                          (localStorage.getItem("cutprice") *
                            localStorage.getItem("noDays")) /
                          localStorage.getItem("noDays")
                        ).toFixed()
                      : ""}
                  </strike>
                </React.Fragment>
              ) : (
                ""
              )}
              &#8377;{" "}
              {(
                localStorage.getItem("dealPrice") /
                localStorage.getItem("noDays")
              ).toFixed()}
              /Night
              {/* {this.props.dealPrice*noDays} */}
            </p>
          </div>
          <div className="apartmentdetail-area">
            <ul className="checkout-calculation">
              <li>
                {" "}
                <span>
                  {" "}
                  {/* &#8377; {localStorage.getItem("dealPrice")}{" "} */}
                </span>
                {/* x{" "} */}
                <span>{localStorage.getItem("noDays")} Nights</span>
                <span>
                  <p
                    className="font-green view-btn"
                    onClick={() => this.openDialog("pricebreakpopup")}
                  >
                    View Details
                  </p>
                </span>
                <Modal
                  className="view-total-detail-modal"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  width="700px"
                >
                  <div className="row view-total-details">
                    <div className="col-md-12">
                      <ul>
                        <li className="">
                          <p className="fw-700 p2">
                            Date <span>Price</span>
                          </p>
                        </li>
                        <li>
                          <p className="p4">
                            23/07/2020 <span>&#8377; 2900</span>
                          </p>
                        </li>
                        <li>
                          <p className="p4">
                            23/07/2020 <span>&#8377; 2900</span>
                          </p>
                        </li>
                        <li>
                          <p className="p4">
                            23/07/2020 <span>&#8377; 2900</span>
                          </p>
                        </li>
                        <li>
                          <p className="p4">
                            23/07/2020 <span>&#8377; 2900</span>
                          </p>
                        </li>
                        <li>
                          <p className="p4">
                            23/07/2020 <span>&#8377; 2900</span>
                          </p>
                        </li>
                        <li>
                          <p className="p4">
                            23/07/2020 <span>&#8377; 2900</span>
                          </p>
                        </li>
                        <li className="">
                          <p className="fw-700 p2">
                            Subtotal <span>&#8377; 2900</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Modal>
                <span className="amount fw-700">
                  &#8377;{" "}
                  {localStorage.getItem("cut_price") == 0
                    ? localStorage.getItem("dealPrice")
                    : localStorage.getItem("cut_price")}
                </span>
              </li>
              {/* {this.props.amenityDetail
                ? this.props.amenityDetail.map((detail, index) => (
                    <li>
                      <span className="leftamenity">{detail.amenityName}</span>
                      <span className="amount rightamenity fw-700">
                        &#8377; {detail.amenityprice}
                      </span>
                    </li>
                  ))
                : ""} */}
              {JSON.parse(localStorage.getItem("amenity_details"))
                ? JSON.parse(localStorage.getItem("amenity_details")).map(
                    (detail, index) => (
                      <li>
                        <span className="leftamenity">
                          {detail.amenityName}
                        </span>
                        <span className="amount rightamenity fw-700">
                          &#8377; {detail.amenityprice}
                        </span>
                      </li>
                    )
                  )
                : ""}

              <li>
                {localStorage.getItem("cut_price") == 0 ||
                localStorage.getItem("cut_price") -
                  localStorage.getItem("dealPrice") ==
                  0 ? (
                  ""
                ) : (
                  <React.Fragment>
                    <span className="colorgreen">Discount</span>
                    <span className="amount fw-700 colorgreen">
                      - &#8377;{" "}
                      {localStorage.getItem("cut_price") -
                        localStorage.getItem("dealPrice")}{" "}
                    </span>
                  </React.Fragment>
                )}
              </li>
              {this.props.discountsec == 1 ? (
                <li>
                  <span>
                    Promo Discount ({this.state.couponcode})
                    <i
                      className="fa fa-trash discountdlt"
                      onClick={() => {
                        this.props.removediscount();
                        // this.props.handleDiscountSection(0);
                      }}
                    ></i>
                  </span>
                  <span className="amount fw-700">
                    - &#8377; {parseFloat(this.props.discountPrice1).toFixed()}{" "}
                  </span>
                </li>
              ) : this.props.discountPrice1 == 0 ? (
                ""
              ) : (
                <li>
                  <span>
                    Promo Discount ({localStorage.getItem("coponcode")})
                  </span>
                  <span className="amount fw-700">
                    - &#8377; {parseFloat(this.props.discountPrice1).toFixed()}{" "}
                  </span>
                </li>
              )}

              {localStorage.getItem("clealing_fee") == "undefined" ? (
                ""
              ) : (
                <li>
                  <span>Cleaning fee</span>
                  <span>
                    <p className="font-green view-btn" data-tip={result1}>
                      {" "}
                      <i
                        class="fa fa-info-circle info-icon"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </span>
                  <ReactTooltip />
                  <span className="amount fw-700">
                    &#8377;{" "}
                    {parseFloat(localStorage.getItem("clealing_fee")).toFixed()}
                  </span>
                </li>
              )}
              <li>
                <span>Service Fee</span>
                <span>
                  <p className="font-green view-btn" data-tip={result2}>
                    {" "}
                    <i
                      class="fa fa-info-circle info-icon"
                      aria-hidden="true"
                    ></i>
                  </p>
                </span>
                <span className="amount fw-700">&#8377; {servicefee}</span>
              </li>
              <li>
                <span>Taxes</span>
                <span>
                  <p className="font-green view-btn" data-tip={result3}>
                    {" "}
                    <i
                      class="fa fa-info-circle info-icon"
                      aria-hidden="true"
                    ></i>
                  </p>
                </span>
                <span className="amount fw-700">
                  &#8377; {parseFloat(this.props.calculatedtax).toFixed()}
                </span>{" "}
              </li>

              {/* <li>
                <span>Taxes</span>
                <span>
                  <p
                    className="font-green view-btn"
                    data-tip="Goods & Services Tax (GST) levied by Govt."
                  >
                    {" "}
                    <i
                      class="fa fa-info-circle info-icon"
                      aria-hidden="true"
                    ></i>
                  </p>
                </span>
                <span className="amount fw-700">
                  &#8377; {parseFloat(this.props.calculatedtax).toFixed()}
                </span>{" "}
              </li> */}
            </ul>
            {this.props.discountsec === 0 && (
              <React.Fragment>
                <p className="font-cap fw-700">promocode</p>
                <div className="promocode">
                  <Form.Field>
                    <input
                      type="text"
                      placeholder="Enter Code"
                      defaultValue={this.state.couponcode}
                      onChange={this.getcouponcode}
                    />
                    <Button
                      type="submit"
                      className="apply-btn"
                      onClick={this.handleDiscountApi}
                    >
                      Apply
                    </Button>
                  </Form.Field>
                  <span className="discountmsg">{this.state.discountmsg}</span>
                </div>
              </React.Fragment>
            )}
            <div className="hr-thin"></div>
            <p className="check-total-amnt font-green font-cap fw-700 totalstrip">
              Total
              <span>
                {}
                &#8377;{" "}
                {parseFloat(
                  parseInt(localStorage.getItem("dealPrice")) +
                    servicefee +
                    // *localStorage.getItem("noDays")
                    this.props.calculatedtax +
                    (parseInt(localStorage.getItem("amenity_price"))
                      ? parseInt(localStorage.getItem("amenity_price"))
                      : 0) -
                    this.props.discountPrice1 +
                    (localStorage.getItem("clealing_fee") == null ||
                    localStorage.getItem("clealing_fee") == "undefined"
                      ? 0
                      : parseInt(localStorage.getItem("clealing_fee")))
                ).toFixed()}
              </span>
            </p>
            {this.props.componentType1 === true ? (
              <div className="fl-100 text-center">
                <button
                  onClick={() => this.props.handleClick()}
                  className="listing-btn mt-30 mb-30 wid-60 pad2050 btncomplt"
                >
                  Continue booking
                </button>
              </div>
            ) : (
              <div></div>
            )}

            <p>
              {this.props.componentType === true ? (
                <React.Fragment>
                  {localStorage.getItem("cancelType") === "non refundable" ? (
                    <div className="col-md-12 text-center mt-20 mb-30 registerform">
                      <Button
                        className="listing-btn mb-15 pad2050 wid-60 btncomplt"
                        onClick={() => this.props.openCheckout()}
                      >
                        Complete Booking
                      </Button>
                    </div>
                  ) : (
                    <div className="col-md-12 text-center mt-20 mb-30 registerform">
                      <Button
                        className="listing-btn mb-15 pad2050 wid-60 btncomplt"
                        onClick={() => this.props.handleBookingApi()}
                      >
                        Complete Booking
                      </Button>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </p>
          </div>
          {/* <div className="col-md-12 text-center mt-20 mb-30 ">
            <Button className="listing-btn mb-15 pad2050 wid-60">
              Complete Booking
            </Button>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Checkoutdetail);
