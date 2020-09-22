import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./apartmentdetails.css";
import Carousel from "react-bootstrap/Carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { Route, withRouter } from "react-dom";
import parser from "html-react-parser";
class Apartmentdetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  render() {
    const renderHTML = (escapedHTML) =>
      React.createElement("div", {
        dangerouslySetInnerHTML: { __html: escapedHTML },
      });
    return (
      <div className="row apartmentdetails">
        <div className="col-md-9">
          <p className="fw-700 mb-10">{this.props.apartmenttypetitle}</p>
          <p className="p2">{renderHTML(this.props.apartmenttypedesc)}</p>
          <span />
          <div className="row icon-list">
            <div className="col-md-2 col-6">
              <span>
                <img
                  className=""
                  src={require("../../assets/apartmentdetails/Guests.png")}
                />
              </span>
              <p>
                <span>{this.props.noguest}</span> Guest
              </p>
            </div>
            <div className="col-md-2 col-6">
              <span>
                <img
                  className=""
                  src={require("../../assets/apartmentdetails/Studio.png")}
                />
              </span>
              <p>{this.props.apartmenttype}</p>
            </div>
            <div className="col-md-2 col-6">
              <span>
                <img
                  className=""
                  src={require("../../assets/apartmentdetails/Bed.png")}
                />
              </span>
              <p>
                <span>{this.props.nobeds}</span> Bed
              </p>
            </div>
            <div className="col-md-2 col-6">
              <span>
                <img
                  className=""
                  src={require("../../assets/apartmentdetails/Bathroom.png")}
                />
              </span>
              <p>
                <span>{this.props.nobath}</span> Bathroom
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="fl-100 text-center heg-100">
            <p className="p2 apartmentdetails-price">
              {this.props.apartmenttupeprice != "Sold out" && "starting from"}
            </p>
            <h3 className="font-green mb-10">
              {this.props.queryParam.startDate != "" &&
              this.props.apartmenttupeprice ? (
                <React.Fragment>&#8377;</React.Fragment>
              ) : (
                ""
              )}
              {this.props.queryParam.startDate == ""
                ? "Enter Date"
                : this.props.apartmenttupeprice}
              {}
            </h3>
            {this.props.cutprice !== 0 &&
              this.props.cutprice != this.props.apartmenttupeprice && (
                <h3 className="striked-start-price">
                  {this.props.cutprice && (
                    <strike> &#8377;{this.props.cutprice}</strike>
                  )}
                </h3>
              )}
            <button className="listing-btn">View Details</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Apartmentdetails;
