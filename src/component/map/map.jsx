import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./map.css";
import Carousel from "react-bootstrap/Carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { GoogleApiWrapper } from "google-maps-react";
// import {
//   Map,
//   Listing,
//   InfoWindow,
//   Marker,
//   GoogleApiWrapper,
// } from "google-maps-react";

// import { Route, withRouter } from "react-dom";

const locations = [
  {
    id: 1595,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.16978738894!2d76.81237831274292!3d28.64727852076003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1591528281081!5m2!1sen!2sin",
  },
  {
    id: 443,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224567.66257535445!2d76.84931834811218!3d28.42318747260518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1591528378036!5m2!1sen!2sin",
  },
  {
    id: 3698,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.8803743149!2d78.26761392884052!3d17.41262717904459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1591528453043!5m2!1sen!2sin",
  },
  {
    id: 1066,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.66154973046!2d77.35004967993521!3d12.954516273045533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1591528613172!5m2!1sen!2sin",
  },
  {
    id: 1429,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224368.3944665038!2d77.25769925750842!3d28.516983050962136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1591527899609!5m2!1sen!2sin",
  },
  {
    id: 1554,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471218.38971354614!2d88.04884138512215!3d22.676384559018086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1591528502120!5m2!1sen!2sin",
  },
  {
    id: 36,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.66154973046!2d77.35004967993521!3d12.954516273045533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1591528564527!5m2!1sen!2sin",
  },
  {
    id: 1600,
    name:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d984967.3118402333!2d73.45042238388118!3d15.347834553179945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba106336b741%3A0xeaf887ff62f34092!2sGoa!5e0!3m2!1sen!2sin!4v1595060542987!5m2!1sen!2sin",
  },
];
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      cityid: this.props.city,
    };
  }

  saveLocation = () => {
    this.setState({ places: locations });
  };
  componentDidMount() {
    this.saveLocation();
    console.info("city id fetch", this.props.city);
  }

  render() {
    return (
      <div className="fl-100 map map-card mb-20">
        {/* <Map
          google={this.props.google}
          zoom={2}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Marker onClick={this.onMarkerClick} name={this.state.place} />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.place}</h1>
            </div>
          </InfoWindow>
        </Map> */}
        {
          this.state.places.map(city => 
            city.id==this.props.cityid ?
             (
              <iframe
                className="map"
                src={city.name}
                allowfullscreen=""
              ></iframe>
            )
            : console.log("here id is", city.id)
            )
        }
      </div>
    );
  }
}
export default Map;
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAsG6UPNNFlDqQQnDm1ruLIKXmyvECPjVc",
// })(Maps);
