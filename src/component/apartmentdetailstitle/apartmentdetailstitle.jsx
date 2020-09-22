import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./apartmentdetailstitle.css";
import Carousel from "react-bootstrap/Carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";
import OwlCarousel from "react-owl-carousel";
import { Rate } from "antd";
// import { Route, withRouter } from "react-dom";
class Apartmentdetailstitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  render() {
    return (
      <div className=" fl-100">
        <h3 className="apt-det-title fw-700 fl-100 font-green">
          {this.props.apartmentdetailstitle}
        </h3>
        <div className="location-rating">
          <div className="apart-location">
            <p className="fw-700">
              {this.props.apartmentregion} | {localStorage.getItem("cityName")}
            </p>
          </div>

          <div className="rating listing-rating mb-10">
            {this.props.propertyrating ? (
              <Rate
                disabled
                allowHalf
                onFocus
                defaultValue={this.props.propertyrating}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="listingcard-icon-list mb-10">
          <ul>
            {this.props.propertyAmenities
              ? this.props.propertyAmenities.map((amenity) => (
                  <li>
                    <img className="" src={amenity.image} />
                  </li>
                ))
              : ""}

            {/* <li>
              <img
                className=""
                src={require("../../assets/listingcard/Maintenance.png")}
                alt="First slide"
              />
            </li>
            <li>
              <img
                className=""
                src={require("../../assets/listingcard/Wifi.png")}
                alt="First slide"
              />
            </li>
            <li>
              <img
                className=""
                src={require("../../assets/listingcard/Air Conditioner.png")}
                alt="First slide"
              />
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}
export default Apartmentdetailstitle;
