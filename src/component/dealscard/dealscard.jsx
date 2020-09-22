import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dealscard.css";
import Carousel from "react-bootstrap/Carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";
import moment from "moment";
import { Modal } from "antd";
import Dialog from "../dialog/dialog";
// import { Route, withRouter } from "react-dom";
import swal from "sweetalert";
import history from "../../lib/history";
import { stringify } from "query-string";

class Dealscard extends Component {
  // state = { visible: false };
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dialogtype: "",
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
    };
  }
  // showModal = (name) => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // handleCancel = (e) => {
  //   console.log(e);
  //   this.setState({
  //     // apartmentImage={this.state.prope
  //     visible: false,
  //   });
  // };
  componentDidMount() {
    window.scrollTo(0, 0);
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  openDialog = (name) => {
    console.log(name);
    this.setState({});
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

  handleClick = () => {
    console.log(
      this.props.cityName,
      this.props.startDate,
      this.props.slug,
      this.props.singleStatus
    );
    this.props.property_separate_id === "1"
      ? history.push(
          `/${this.props.cityName.toLowerCase()}/h/${
            this.props.slug
          }/upsell?city=${this.props.cityName}&id=${
            this.props.city_id
          }&startDate=${moment(this.props.startDate).format(
            "YYYY-MM-DD"
          )}&endDate=${moment(this.props.endDate).format(
            "YYYY-MM-DD"
          )}&guests=${this.props.noGuest}&property_slug=${
            this.props.slug
          }&property_id=${this.props.property_id}&roomType_id=${
            this.props.roomType_id
          }&apart_cat_title=${this.props.apart_cat_title}&deal_type=${
            this.props.deal_type
          }&cancel_type_img=${this.props.cancel_type_img}&cancel_type=${
            this.props.cancel_type
          }&cut_price=${this.props.cut_price}&deal_price=${
            this.props.deal_price
          }&deal_price_sup_pre=${this.props.deal_price_sup_pre}&real_price=${
            this.props.real_price
          }&clealing_fee=${this.propsclealing_fee}&nobeds=${
            this.props.nobeds
          }&nobath=${this.props.nobath}&price_type=${
            this.props.price_type
          }&apartmentName=${this.props.apartmentName}&apartmentImage=${
            this.props.apartmentImage
          }&price=${this.props.price}&peymentMethod=${
            this.props.peymentMethod
          }&noguest=${this.props.noguest}&prodec=${this.props.prodec}&layouts=${
            this.props.layouts
          }&amenities=${JSON.stringify(
            this.props.amenities
          )}&aprtment_type_code=${this.props.aprtment_type_code}&no_of_days=${
            this.props.no_of_days
          }&property_separate_id=${this.props.property_separate_id}&min_stay=${
            this.props.min_stay
          }&property_title=${this.props.property_title}`
        )
      : history.push(
          `/${this.props.cityName.toLowerCase()}/${
            this.props.slug
          }/upsell?city=${this.props.cityName}&id=${
            this.props.city_id
          }&startDate=${moment(this.props.startDate).format(
            "YYYY-MM-DD"
          )}&endDate=${moment(this.props.endDate).format(
            "YYYY-MM-DD"
          )}&guests=${this.props.noGuest}&property_slug=${
            this.props.slug
          }&property_id=${this.props.property_id}&roomType_id=${
            this.props.roomType_id
          }&apart_cat_title=${this.props.apart_cat_title}&deal_type=${
            this.props.deal_type
          }&cancel_type_img=${this.props.cancel_type_img}&cancel_type=${
            this.props.cancel_type
          }&cut_price=${this.props.cut_price}&deal_price=${
            this.props.deal_price
          }&deal_price_sup_pre=${this.props.deal_price_sup_pre}&real_price=${
            this.props.real_price
          }&clealing_fee=${this.propsclealing_fee}&nobeds=${
            this.props.nobeds
          }&nobath=${this.props.nobath}&price_type=${
            this.props.price_type
          }&apartmentName=${this.props.apartmentName}&apartmentImage=${
            this.props.apartmentImage
          }&price=${this.props.price}&peymentMethod=${
            this.props.peymentMethod
          }&noguest=${this.props.noguest}&prodec=${this.props.prodec}&layouts=${
            this.props.layouts
          }&amenities=${JSON.stringify(
            this.props.amenities
          )}&aprtment_type_code=${this.props.aprtment_type_code}&no_of_days=${
            this.props.no_of_days
          }&property_separate_id=${this.props.property_separate_id}&min_stay=${
            this.props.min_stay
          }&property_title=${this.props.property_title}`
        );
    // this.props.handleClick();
  };

  render() {
    console.log("no of days", this.props.no_of_days, this.props.min_stay);
    return this.props.price ? (
      this.props.apart_cat_title === "furnished" &&
      this.props.no_of_days < 28 ? (
        <React.Fragment>
          <div className="fl-100 deals-card">
            <div className="deals-card-left">
              <p
                className="p2 deal-type"
                onClick={() => this.openDialog(this.props.deal_type)}
              >
                {this.props.deal_type}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              {/* <div className="deals-hr"></div> */}
              <p className="deal-price fw-700">
                &#8377; {this.props.price}{" "}
                <span className="strike-price">
                  {this.props.real_price != 0 &&
                  this.props.real_price != this.props.price ? (
                    <strike>&#8377; {this.props.real_price}</strike>
                  ) : (
                    ""
                  )}
                </span>
                <span className="per-night">/ night</span>
              </p>
              {/* <p className="deal-price fw-700">
                &#8377; {this.props.price}{" "}
                <sup className="">
                  {this.props.real_price!= 0 ?
                    <strike>&#8377; {this.props.real_price }</strike
                    :
                    ""
                    }>
                </sup>
                <span>/ night</span>
              </p> */}
            </div>
            <div className="deals-card-right text-right">
              <p
                className="cancel-type "
                onClick={() => this.openDialog(this.props.peymentMethod)}
              >
                {/* <img
                  className=""
                  src={require("../../assets/apartmentdetails/Pay_Now_Later.png")}
                /> */}
                {this.props.peymentMethod}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              <button
                className="book-btn"
                title="Please select atleast 28 days for furnished apartment"
                onClick={() =>
                  swal(
                    `Please select atleast 28 days for furnished apartment`,
                    {
                      icon: "info",
                    }
                  )
                }
              >
                Book
              </button>
              <Dialog
                handleAllTooltips={this.handleAllTooltips}
                style="transition:"
                typeOf={this.state.dialogtype}
                isOpen={this.state.isOpen}
                onClose={(e) => this.setState({ isOpen: false })}
              ></Dialog>
            </div>
            <p
              className="cancel-type canceltype2"
              onClick={() => this.openDialog(this.props.cancel_type)}
            >
              <img className="" src={this.props.cancel_type_img} />
              {this.props.cancel_type}
              <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
            </p>
          </div>
        </React.Fragment>
      ) : this.props.idx >= 0 &&
        this.props.queryParam.guests > this.props.noguest ? (
        <React.Fragment>
          <div className="fl-100 deals-card">
            <div className="deals-card-left">
              <p
                className="p2 deal-type"
                onClick={() => this.openDialog(this.props.deal_type)}
              >
                {this.props.deal_type}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              {/* <div className="deals-hr"></div> */}
              <p className="deal-price fw-700">
                &#8377; {this.props.price}{" "}
                <span className="strike-price">
                  {this.props.real_price != 0 &&
                  this.props.real_price != this.props.price ? (
                    <React.Fragment>
                      <strike>&#8377; {this.props.real_price}</strike>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </span>
                <span className="per-night">/ night</span>
              </p>
              {/* <p className="cancel-type">
                <img className="" src={this.props.cancel_type_img} />
                {this.props.cancel_type}
              </p> */}
            </div>
            <div className="deals-card-right text-right">
              <p
                className="cancel-type"
                onClick={() => this.openDialog(this.props.peymentMethod)}
              >
                {/* <img
                  className=""
                  src={require("../../assets/apartmentdetails/Pay_Now_Later.png")}
                /> */}
                {this.props.peymentMethod}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              <button
                className="book-btn"
                onClick={() =>
                  swal(`Maximum ${this.props.noguest} guests allowed`, {
                    icon: "info",
                  })
                }
              >
                Book
              </button>
              <Dialog
                style="transition:"
                typeOf={this.state.dialogtype}
                isOpen={this.state.isOpen}
                onClose={(e) => this.setState({ isOpen: false })}
              ></Dialog>
            </div>
            <p
              className="cancel-type canceltype2"
              onClick={() => this.openDialog(this.props.cancel_type)}
            >
              <img className="" src={this.props.cancel_type_img} />
              {this.props.cancel_type}
              <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
            </p>
          </div>
        </React.Fragment>
      ) : this.props.property_separate_id == "1" &&
        this.props.no_of_days < 2 ? (
        <React.Fragment>
          <div className="fl-100 deals-card">
            <div className="deals-card-left">
              <p
                className="p2 deal-type"
                onClick={() => this.openDialog(this.props.deal_type)}
              >
                {this.props.deal_type}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              {/* <div className="deals-hr"></div> */}
              <p className="deal-price fw-700">
                &#8377; {this.props.price}{" "}
                <span className="strike-price">
                  {this.props.real_price != 0 &&
                  this.props.real_price != this.props.price ? (
                    <React.Fragment>
                      <strike>&#8377; {this.props.real_price}</strike>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </span>
                <span className="per-night">/ night</span>
              </p>
              {/* <p className="cancel-type">
                <img className="" src={this.props.cancel_type_img} />
                {this.props.cancel_type}
              </p> */}
            </div>
            <div className="deals-card-right text-right">
              <p
                className="cancel-type"
                onClick={() => this.openDialog(this.props.peymentMethod)}
              >
                {/* <img
                  className=""
                  src={require("../../assets/apartmentdetails/Pay_Now_Later.png")}
                /> */}
                {this.props.peymentMethod}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              <button
                className="book-btn"
                onClick={() =>
                  swal(`Please select atleast 2 days`, {
                    icon: "info",
                  })
                }
              >
                Book
              </button>
              <Dialog
                style="transition:"
                typeOf={this.state.dialogtype}
                isOpen={this.state.isOpen}
                onClose={(e) => this.setState({ isOpen: false })}
              ></Dialog>
            </div>
            <p
              className="cancel-type canceltype2"
              onClick={() => this.openDialog(this.props.cancel_type)}
            >
              <img className="" src={this.props.cancel_type_img} />
              {this.props.cancel_type}
              <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
            </p>
          </div>
        </React.Fragment>
      ) : this.props.no_of_days < this.props.min_stay ? (
        <React.Fragment>
          <div className="fl-100 deals-card">
            <div className="deals-card-left">
              <p
                className="p2 deal-type"
                onClick={() => this.openDialog(this.props.deal_type)}
              >
                {this.props.deal_type}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              {/* <div className="deals-hr"></div> */}
              <p className="deal-price fw-700">
                &#8377; {this.props.price}{" "}
                <span className="strike-price">
                  {this.props.real_price != 0 &&
                  this.props.real_price != this.props.price ? (
                    <React.Fragment>
                      <strike>&#8377; {this.props.real_price}</strike>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </span>
                <span className="per-night">/ night</span>
              </p>
              {/* <p className="cancel-type">
                <img className="" src={this.props.cancel_type_img} />
                {this.props.cancel_type}
              </p> */}
            </div>
            <div className="deals-card-right text-right">
              <p
                className="cancel-type"
                onClick={() => this.openDialog(this.props.peymentMethod)}
              >
                {/* <img
                  className=""
                  src={require("../../assets/apartmentdetails/Pay_Now_Later.png")}
                /> */}
                {this.props.peymentMethod}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              <button
                className="book-btn"
                onClick={() =>
                  swal(`Minimum stay should be ${this.props.min_stay} days`, {
                    icon: "info",
                  })
                }
              >
                Book
              </button>
              <Dialog
                style="transition:"
                typeOf={this.state.dialogtype}
                isOpen={this.state.isOpen}
                onClose={(e) => this.setState({ isOpen: false })}
              ></Dialog>
            </div>
            <p
              className="cancel-type canceltype2"
              onClick={() => this.openDialog(this.props.cancel_type)}
            >
              <img className="" src={this.props.cancel_type_img} />
              {this.props.cancel_type}
              <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
            </p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="fl-100 deals-card">
            <div className="deals-card-left">
              <p
                className="p2 deal-type"
                onClick={() => this.openDialog(this.props.deal_type)}
              >
                {this.props.deal_type}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              {/* <div className="deals-hr"></div> */}
              <p className="deal-price fw-700">
                &#8377; {this.props.price}{" "}
                <span className="strike-price">
                  {this.props.real_price != 0 &&
                  this.props.real_price != this.props.price ? (
                    <React.Fragment>
                      <strike>&#8377; {this.props.real_price}</strike>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </span>
                <span className="per-night">/ night</span>
              </p>
              {/* <p className="deal-price fw-700">
                &#8377; {this.props.price}{" "}
                <sup className="">
                  {
                    <strike>&#8377; </strike>
                </sup>
                <span>/ night</span>
              </p> */}
            </div>
            <div className="deals-card-right text-right">
              <p
                className="cancel-type "
                onClick={() => this.openDialog(this.props.peymentMethod)}
              >
                {/* <img
                  className=""
                  src={require("../../assets/apartmentdetails/Pay_Now_Later.png")}
                /> */}
                {this.props.peymentMethod}
                <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
              </p>
              <button
                className="book-btn"
                onClick={() => {
                  localStorage.setItem("dealType", this.props.deal_type);
                  localStorage.setItem(
                    "apartmentTitle",
                    this.props.apart_cat_title
                  );
                  localStorage.setItem("nobeds", this.props.nobeds);
                  localStorage.setItem("nobath", this.props.nobath);
                  localStorage.setItem("cancelType", this.props.cancel_type);
                  localStorage.setItem("prop_desc", this.props.prodec);
                  localStorage.setItem(
                    "cancelTypeImage",
                    this.props.cancel_type_img
                  );
                  localStorage.setItem("dealPrice", this.props.deal_price);
                  localStorage.setItem("cutprice", this.props.real_price);
                  localStorage.setItem(
                    "cutprice_sup",
                    this.props.real_price_sup
                  );
                  localStorage.setItem(
                    "cutprice_pre",
                    this.props.real_price_pre
                  );
                  localStorage.setItem(
                    "cutprice_sup_free",
                    this.props.real_price_sup_free
                  );
                  localStorage.setItem(
                    "cutprice_pre_free",
                    this.props.real_price_pre_free
                  );
                  localStorage.setItem(
                    "cutprice_sup_pre",
                    this.props.real_price_sup_pre
                  );
                  localStorage.setItem(
                    "cutprice_pre_pre_free",
                    this.props.real_price_sup_pre_free
                  );
                  localStorage.setItem("dealprice", this.props.deal_price);
                  localStorage.setItem("cut_price", this.props.cut_price);
                  localStorage.setItem("cut_price_back", this.props.cut_price);
                  localStorage.setItem("checkindate", this.props.startDate);
                  localStorage.setItem("checkoutdate", this.props.endDate);
                  localStorage.setItem(
                    "aprtment_type_code",
                    this.props.aprtment_type_code
                  );
                  localStorage.setItem(
                    "apartmentName",
                    this.props.apartmentName
                  );
                  localStorage.setItem(
                    "apartmentImage",
                    this.props.apartmentImage
                  );
                  localStorage.setItem(
                    "stdToSupHot",
                    this.props.deal_price_sup
                  );
                  localStorage.setItem(
                    "stdToSupHotcut",
                    this.props.deal_price_sup_cut
                  );
                  localStorage.setItem(
                    "stdToSupHotFree",
                    this.props.deal_price_sup_free
                  );
                  localStorage.setItem(
                    "stdToSupHotFreecut",
                    this.props.deal_price_sup_free_cut
                  );
                  localStorage.setItem(
                    "supToPre",
                    this.props.deal_price_sup_pre
                  );
                  localStorage.setItem(
                    "supToPrecut",
                    this.props.deal_price_sup_pre_cut
                  );
                  localStorage.setItem(
                    "supToPreFree",
                    this.props.deal_price_sup_pre_free
                  );
                  localStorage.setItem(
                    "supToPreFreecut",
                    this.props.deal_price_sup_pre_free_cut
                  );
                  localStorage.setItem(
                    "deal_price_pre",
                    this.props.deal_price_pre
                  );
                  localStorage.setItem(
                    "deal_price_pre_cut",
                    this.props.deal_price_pre_cut
                  );
                  localStorage.setItem(
                    "deal_price_pre_free",
                    this.props.deal_price_pre_free
                  );
                  localStorage.setItem(
                    "deal_price_pre_free_cut",
                    this.props.deal_price_pre_free_cut
                  );
                  localStorage.setItem("property_id", this.props.property_id);
                  localStorage.setItem("roomType_id", this.props.roomType_id);
                  localStorage.setItem("clealing_fee", this.props.clealing_fee);
                  localStorage.setItem("price", this.props.price1);
                  localStorage.setItem("price_type", this.props.price_type);
                  localStorage.setItem(
                    "layouts",
                    JSON.stringify(this.props.layouts)
                  );
                  localStorage.setItem(
                    "Layouts",
                    JSON.stringify(this.props.layouts)
                  );
                  localStorage.setItem(
                    "property_amenity",
                    JSON.stringify(this.props.amenities)
                  );
                  localStorage.setItem(
                    "property_amenity_sup",
                    JSON.stringify(this.props.amenities_sup)
                  );
                  localStorage.setItem(
                    "property_amenity_pre",
                    JSON.stringify(this.props.amenities_pre)
                  );
                  localStorage.setItem(
                    "apartmenttitle",
                    this.props.apartment_title
                  );
                  localStorage.setItem("noDays", this.props.no_of_days);
                  localStorage.setItem("listing_slug", this.props.slug);
                  localStorage.setItem(
                    "singleStatus",
                    this.props.property_separate_id
                  );
                  this.handleClick();
                }}
                disabled={!this.props.price}
              >
                Book
              </button>
              <Dialog
                style="transition:"
                typeOf={this.state.dialogtype}
                isOpen={this.state.isOpen}
                onClose={(e) => this.setState({ isOpen: false })}
              ></Dialog>
            </div>
            <p
              className="cancel-type canceltype2"
              onClick={() => this.openDialog(this.props.cancel_type)}
            >
              <img className="" src={this.props.cancel_type_img} />
              {this.props.cancel_type}
              <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
            </p>
          </div>
        </React.Fragment>
      )
    ) : (
      <React.Fragment>
        <div className="fl-100 deals-card">
          <div className="deals-card-left">
            <p className="p2 deal-type">{this.props.deal_type}</p>
            <div className="deals-hr"></div>
            <p className="deal-price fw-700">
              Sold out{" "}
              <sup className="">
                <strike></strike>
              </sup>
              <span></span>
            </p>
            <p className="cancel-type">
              <img className="" src={this.props.cancel_type_img} />
              {this.props.cancel_type}
            </p>
          </div>
          <div className="deals-card-right text-right">
            <p className="cancel-type">
              <img
                className=""
                src={require("../../assets/apartmentdetails/Pay_Now_Later.png")}
              />
              {this.props.peymentMethod}
            </p>
            <button className="book-btn" disabled={!this.props.price}>
              Book
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Dealscard;
