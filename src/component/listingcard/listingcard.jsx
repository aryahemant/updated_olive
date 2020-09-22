import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./listingcard.css";
import Carousel from "react-bootstrap/Carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { Route, withRouter } from "react-dom";
import axios from "axios";
import { Rate } from "antd";
import he from "he";
import parser from "html-react-parser";

import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

class Listingcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueForEachId: [],
      title: "",
      id: "",
    };
  }
  componentDidMount() {
    // axios.get(`/be/products/getAll.jsohttp://34.93.89.207/olive_api/public/api/property/6n`).then(res => {
    //     console.log('result', res.data)
    // })
  }
  handleIdForProperty = () => {
    this.setState({
      id: this.props.keyVal,
    });
    const val = this.props.keyVal;
    this.props.handleIdForProperty1(val);
  };
  render() {
    const regex = /(<([^>]+)>)/gi;
    const result = this.props.listingCardDesc
      ? this.props.listingCardDesc.replace(regex, "")
      : "";
    const renderHTML = (escapedHTML) =>
      React.createElement("div", {
        dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(escapedHTML) },
      });

    const ratings = [];
    for (let i = 0; i < this.props.ratings; i++) {
      ratings.push(<span key={i}>☆</span>);
    }
    return (
      <div className="listing-card fl-100">
        <Carousel indicators={true}>
          {this.props.limages.map((image) => (
            <Carousel.Item key={image.image_name}>
              <div className="row">
                <div className="col-md-12">
                  <div className="listing-img">
                    <img
                      className="d-block w-100"
                      src={image.image}
                      alt="First slide"
                    />
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <p className="listingcard-title fw-700 fl-100 font-green">
          {this.props.listingCardTitle}
        </p>
        <div className="location-rating">
          {/* <div className="apart-location">
                <p className="fw-700">Gurugram</p>
                </div>  */}
          <span className="listing-city">
            {this.props.listingregion_name}, {this.props.cityName} | {""}
          </span>
          <div className="rating listing-rating mb-10">
            {/* {ratings} */}

            <Rate
              disabled
              allowHalf
              onFocus
              defaultValue={this.props.ratings}
            />
          </div>
        </div>
        {/* <div className="listingcard-icon-list mb-10">
          <ul>
            {this.props.amenities.map((amenity) => {
              if (amenity.image) {
                return (
                  <li key={amenity.id}>
                    <img className="" src={amenity.image} alt="First slide" />
                  </li>
                );
              }
            })}
          </ul>
        </div> */}
        <p className="fl-100 listing-desc">
          {
            renderHTML(result)
            // this.props.listingCardDesc.replace(/[<p></p>]/g, "")
          }
        </p>
        <div className="fl-100 ">
          <button
            className="listing-btn"
            onClick={() => {
              this.handleIdForProperty();
              this.props.handleClick(
                this.props.listing_slug,
                this.props.property_separate_id
              );
            }}
          >
            Select apartment
          </button>
        </div>
      </div>
    );
  }
}
export default Listingcard;
