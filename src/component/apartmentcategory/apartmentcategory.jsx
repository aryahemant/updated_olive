import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./apartmentcategory.css";
import Carousel from "react-bootstrap/Carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";

// import { Route, withRouter } from "react-dom";

class Apartmentcategory extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }

  render() {
    return (
      <div className="fl-100 apartment-category-card product">
        <div className="colored-space"></div>
        <div className="fl-100 apart-cat-desc ">
          <p className="apart-cat-title text-center fw-700">
            {this.props.apart_cat_title}
            <span className="apart-cat-title text-center fw-700 statititle">
              {this.props.static_title}
            </span>
          </p>

          {/* <ul className="apartment-amenities">
                        {this.props.amenities.map((amenity, index) => (
                          <li key={index}><span className="apartment-amenities-icon"><img className="" src={amenity.image}/></span><span className="font-12">{amenity.name}</span>
                                 <span className="p2">{amenity.description}</span>
                          </li>
                        ))}

                    </ul> */}

          {this.props.amenities.map((amenity, index) => (
            <p key={index} class="det-amenities font-cap mb-10">
              <span className="det-amenities-img">
                <img class="" src={amenity.image} />
              </span>
              <span className="font-12 fw-600">{amenity.name}</span>
              <br />
              <span className="font-12">{amenity.description}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}
export default Apartmentcategory;
