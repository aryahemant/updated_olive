import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./thankyoupage.css";
import Locations from "../locations/locations";
import Heading from "../heading/heading";
import axios from "axios";
class Thankyoupage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    const resp = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    );
    this.setState({
      cities: resp.data,
    });
  }

  handleGoToReservation = () => {
    this.props.history.push(
      `/${localStorage
        .getItem("cityName")
        .toLowerCase()}/${localStorage.getItem(
        "listing_slug"
      )}/reservation/${localStorage.getItem("bookingid")}`
    );
  };

  propertysearch = (name) => {
    this.props.history.push(`/${name.toLocaleLowerCase()}`);
  };

  render() {
    return (
      <React.Fragment>
        {/* location section */}
        <section className="pad-100 location-section ">
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
                <p>You have successfully booked your Apartment with Olive.</p>
                <button
                  onClick={this.handleGoToReservation}
                  className="mt-15 listing-btn"
                >
                  View Reservation
                </button>
              </div>
            </div>
            <Heading title="Browse Other Locations" />

            <div className="row deskview">
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
              <div className="col-lg-3 col-md-3">
                <Locations locationimg={require("../../assets/Quote.jpg")} />
              </div>
            </div>

            <div className="row mobview">
              <div className="scroll-div">
                <ul className="ul-flex">
                  {this.state.cities.map((city) => {
                    return (
                      <li>
                        <Locations
                          locationId={city.id}
                          locationimg={city.image}
                          locationname={city.city_name}
                          propertysearch={this.propertysearch}
                        />
                      </li>
                    );
                  })}
                  <li>
                    <Locations
                      locationimg={require("../../assets/Quote.jpg")}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* location section end */}
      </React.Fragment>
    );
  }
}
export default Thankyoupage;
