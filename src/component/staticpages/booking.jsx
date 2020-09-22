import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";

class Booking extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    // this.handleAmenityDetail();
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
  }

  render() {
    return (
      <React.Fragment>
        <section className="pad-45">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 class="font-green mb-30 font-cap text-center">Bookings</h1>
                <p className="mb-30">There are three ways to make your bookings at Olive Serviced Apartments across India</p>
              </div>
              <div className="col-md-12">
                <div className="static-page-card">
                  <p className="fw-700">Online Booking of Serviced Apartments</p>
                  <p className="p2 ">
                  This is the easiest and most popular way to make bookings, you can make online Bookings for Serviced Apartments in 
                  Delhi, Gurgaon, Hyderabad, Pune, Jaipur or Goa by going to the Homepage or the respective City Pages and searching your desired apartment.
                   It will give you the option to make booking online by using your Credit/Debit Card or NetBanking and you will get an immediate confirmation of your booking.
    
           
                  </p>
                </div>
                <div className="static-page-card">
                  <p className="fw-700">Making bookings via Olive Reservations Team</p>
                  <p className="p2 ">
                  For making bookings after contacting our Apartment Reservations Team, please use the Contact Form 
                  given on the below URL –http://oliveservicedapartments.com/contact-us
                   </p>
                </div>
                <div className="static-page-card">
                  <p className="fw-700">Rental Payment for Serviced Apartments</p>
                  <p className="p2 ">
                  For making online payments of rentals for our Serviced Apartments, please use the Apartment Rental Payment Form given on the below URL –
http://oliveservicedapartments.com/direct-payment/
                   </p>
                </div>
                <div className="static-page-card">
                  
                  <p className="p2 ">
                  Please note that all Online Bookings are handled by a secure 
                  payment gateway of HDFC Bank ensuring complete safety and security of your payment data and related information.
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
export default Booking;
