import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./locations.css";
import axios from "axios";

// import { Route, withRouter } from "react-dom";

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    // const resp = await axios.get(
    //   `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    // );
    // const value = resp.data;
    // // console.log(value);
    // localStorage.setItem("cities", resp.data);
    // this.setState({
    //   cities: resp.data,
    // });
    // localStorage.setItem("cities", JSON.stringify(this.state.cities));
  }

  render() {
    return (
      <a
        className="location-link"
        onClick={() => {
          this.props.propertysearch(this.props.locationname, this.props.locationId);
        }}
      >
        <div className="location-card">
          <div className="location-card-img">
            <img src={this.props.locationimg} />
            <p className="city-name">{this.props.locationname}</p>
          </div>
          <div className="location-overlay">
            <div className="internal-border">
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
          </div>
        </div>
        <p className="city-name-mob">{this.props.locationnamemob}</p>
      </a>
    );
  }
}
export default Locations;
