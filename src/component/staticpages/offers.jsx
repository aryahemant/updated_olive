import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";
import { Helmet } from "react-helmet";

class Offers extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    // this.handleAmenityDetail();
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Special Offers & Promotions - Olive Serviced Apartments</title>
          <meta
            name="description"
            content="Special Promotional Offers for all Direct Bookings at Olive Serviced Apartments. Weekly & Monthly Discounts, Repeat Guest Deals, Family & Friends Rates"
          />
        </Helmet>
        <section className="pad-45">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 class="font-green mb-30 font-cap text-center">Offers</h1>
              </div>
              <div className="col-md-12">
                <div className="static-page-card">
                  <p className="fw-700">FREE Airport Transfers</p>
                  <p className="p2 ">
                    This offer will provide Free Airport/Train Station Transfers
                    for all bookings done online only via our website.
                    <br />
                    <ol className="static-list lower-latin">
                      <li>
                        For Superior Apartment bookings of more than 7 Nights
                        stay – You will get FREE transportation by private Car
                        to the Airport or Railway Station at the end of your
                        stay.
                      </li>

                      <li>
                        For Superior Apartment bookings of 15 Nights and above –
                        You will get FREE transportation by private Car both
                        ways, we will pick you from the Airport or Railway
                        Station at the time of check-in and drop you back at end
                        of your stay.
                      </li>
                    </ol>
                    This offer will automatically be applied for all bookings
                    done online via our Website between 1st April to 31st May
                    2020.
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="static-page-card">
                  <p className="fw-700">Complimentary Upgrade</p>
                  <p className="p2 ">
                    This offer will provide a Complimentary Upgrade to all our
                    Repeat Guests for all their bookings done online only via
                    our website or through Email.
                    <br />
                    <ol className="static-list lower-latin">
                      <li>
                        The Complimentary Upgrade for all Repeat Guests will
                        automatically upgrade their Apartment to Premier when
                        they book any Superior Apartment, irrespective of the
                        duration of stay. stay.
                      </li>
                    </ol>
                    This offer will automatically be applied for all bookings
                    done online via our Website or our Email between 1st April
                    to 31st May 2020.
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="static-page-card">
                  <p className="fw-700">Early Check-In/ Late Check-Out</p>
                  <p className="p2 ">
                    This offer will provide a Complimentary 4 Hour Early
                    Check-In OR Late Check-Out at our apartments for all
                    bookings done online only via our website.
                    <br />
                    <ol className="static-list lower-latin">
                      <li>
                        The Early Check-In OR Late Check-Out offer is subject to
                        availability of the property and will be applicable for
                        all bookings of more than 3 Nights Stay at any of our
                        properties.
                      </li>
                    </ol>
                    This offer will automatically be applied for all bookings
                    done online via our Website or our Email between 1st April
                    to 31st May 2020.
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="static-page-card">
                  <p className="fw-700">
                    Cleaning Fees waived off for direct bookings
                  </p>
                  <p className="p2 ">
                    This offer waives off the one-time Checkout Cleaning Fees
                    charged for all bookings done online only via our website.
                    <br />
                    <ol className="static-list lower-latin">
                      <li>
                        The Cleaning Fee waiver will be applicable for all
                        bookings of more than 3 Nights Stay at any of our
                        properties.
                      </li>
                    </ol>
                    This offer will automatically be applied for all bookings
                    done online via our Website or our Email between 1st April
                    to 31st May 2020.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Offers;
