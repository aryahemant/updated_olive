import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./thankyou.css";
import Locations from "../locations/locations";
import Heading from "../heading/heading";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
class Thankyou extends Component {
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
                <p>Payment is successfully done.</p>
                {/* <button
                  onClick={this.handleGoToReservation}
                  className="mt-15 listing-btn"
                >
                  View Reservation
                </button> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="font-green font-cap mb-20">Payment Details</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="listing-card product">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="hr-thin mb-10"></div>
                      <p class="p2 font-cap mb-10">
                        <strong>Phone Number:</strong>{" "}
                        {localStorage.getItem("booking_phone")}{" "}
                      </p>
                      <p class="p2 font-cap mb-10">
                        <strong>Email:</strong>{" "}
                        {localStorage.getItem("booking_email")}{" "}
                      </p>
                      {/* <p class="p2 font-cap mb-10">
                              <strong>Number of rooms:</strong> 1 room
                            </p> */}

                      <p class="p2 font-cap mb-10">
                        <strong>reservation name:</strong>{" "}
                        {localStorage.getItem("booking_name")}
                      </p>
                      <p class="p2 font-cap mb-10">
                        <strong>Booking Id:</strong>{" "}
                        {localStorage.getItem("bookingno")}
                      </p>
                      <p class="p2 font-cap mb-10">
                        <strong>Location:</strong>{" "}
                        {localStorage.getItem("location")}
                      </p>
                      <p class="p2 font-cap mb-10">
                        <strong>Amount:</strong> {localStorage.getItem("amt")}
                      </p>
                    </div>
                  </div>
                </div>
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
export default Thankyou;
