import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";

class Faqs extends Component {
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
                <div className="listing-card ">
                  <h1 class="font-green mb-30 font-cap text-center">FAQs</h1>
                  <p className="p2">
                    Here is a list of Frequently Asked Questions (FAQ) that will
                    give you a much better understanding of our workings, to
                    ensure a simpler, hassle-free and transparent process of
                    renting an Olive Serviced Apartment. Please feel free to
                    contact our Sales Team for any queries or clarifications.
                  </p>
                  <p className="p2 fw-700">
                    Q. What is the difference between hotels and your serviced
                    apartments?
                  </p>
                  <p className="p2 ">
                    A. Serviced apartments offers spacious, fully furnished,
                    beautifully decorated apartments, much larger than hotel
                    rooms (even extended stay hotel rooms), featuring a genuine
                    (more home-like) residential character.
                  </p>
                  <p className="p2">
                    Also, popular with Vacation Rentals & Holiday Rental Homes,
                    all apartments usually feature a complete kitchen, and have
                    separate dining, living and sleeping areas. They will also
                    have a fully automatic Washing Machine with Dryer, Iron &
                    Ironing Board, landline Telephone, Tata Sky TV and Wireless
                    Internet.
                  </p>
                  <p className="p2">
                    Food & Room Service is not offered in the apartments that
                    are essentially self-catered residential units, however, we
                    have menu cards of all nearby eateries and tie-ups with
                    all-night food delivery services that make you feel like
                    ordering room service but without the extra costs. A wide
                    range of personal services and exceptional amenities
                    including health clubs and swimming pools (at many locations
                    & in the neighborhood) provide a refined lifestyle, and
                    offer a caring and homelike atmosphere for guests and their
                    families.
                  </p>
                  <p className="p2 fw-700">Q. What is included in the rate?</p>
                  <p className="p2 ">
                    A. Rentals include housekeeping, linen changes, Water,
                    Cooking Gas, 24 Hour Wi-Fi Internet, Tata Sky TV, Power
                    Backup, Landline Phone (Outgoing Calls chargeable) and all
                    flat/society maintenance. All apartments are fully furnished
                    and equipped with cooking utensils and crockery to cater for
                    the maximum occupancy of the apartment. Electricity will be
                    charged separately upon actuals. Rentals do not include
                    applicable Goods & Services Tax (GST).
                  </p>
                  <p className="p2 fw-700">
                    Q. Can I view your serviced apartments prior to making a
                    reservation?
                  </p>
                  <p className="p2">
                    A. Yes, you can view them subject to availability. If you
                    are making a long-term booking in the apartment for an
                    extended period of time we would strongly suggest you do
                    this, so that you can familiarize yourself not only with the
                    apartment but also the local area and facilities. Please
                    contact our reservations team to arrange a viewing.
                  </p>
                  <p className="p2 fw-700">Q. How do I make a booking?</p>
                  <p className="p2 ">
                    A. It is just as easy as booking a hotel! You can make your
                    booking online by looking up the desired accommodation which
                    will give you an option to confirm your booking after making
                    a payment by Credit/Debit Card or Net Banking. You can also
                    give us a call or email us at{" "}
                    <a>info@oliveservicedapartments.com</a> or fill in the form
                    on the website: http://www.oliveservicedapartments.com
                  </p>
                  <p className="p2 ">
                    All bookings will be confirmed only after paying the
                    reservation amount. Within 24 hours of the reservation
                    amount being received by us, you will receive confirmation
                    of your booking and your arrival information pack via email.
                    However, for online bookings done on our website via
                    Credit/Debit Cards or Net Banking, the confirmation is done
                    immediately.
                  </p>

                  <p className="p2 fw-700">
                    <strong>Q. Do I need to pay a security deposit?</strong>
                  </p>
                  <p className="p2">
                    A. If you do not have a credit card available to cover any
                    unpaid bills, loss or damage, you may be required to pay a
                    security deposit on your arrival. We will keep the deposit
                    during your stay and until we can confirm there are no
                    pending bills or any additional cleaning or damage/loss in
                    the apartment. If there are no such deductions, then it will
                    be returned to you in full at the end of your stay.
                  </p>

                  <p className="p2 fw-700">
                    <strong>
                      Q. Can I pay for my serviced apartment on departure?
                    </strong>
                  </p>
                  <p className="p2">
                    A. No. Full Payment is required at the time of booking OR
                    prior to check-in. Unlike hotels, our serviced apartment
                    buildings do not have a manned reception or the facility to
                    take payment at the time of check-out. At the time of
                    booking you will be asked for full payment unless otherwise
                    agreed.
                  </p>

                  <p className="p2 fw-700">
                    <strong>Q.What methods of payment do you accept?</strong>
                  </p>
                  <p className="p2">
                    A. All major debit/credit cards are accepted. In some cases,
                    we may also accept Cash upon arrival.
                  </p>

                  <p className="p2 fw-700">
                    <strong>Q. Is there a minimum stay requirement?</strong>
                  </p>
                  <p className="p2">
                    There is a minimum stay requirement of three nights (3
                    nights) in all our properties unless otherwise specified.
                  </p>

                  <p className="p2 fw-700">
                    <strong>Q. What are the terms of cancellation?</strong>
                  </p>
                  <p className="p2">
                    A. Please familiarize yourself with the Terms and Conditions
                    of our business as all bookings are subject to these terms.
                    Here is the general Cancellation Policy – If a confirmed
                    booking reservation is cancelled or modified up to 14 day
                    before date of arrival, 25 percent of the total price of the
                    reservation will be charged. AND if a confirmed booking
                    reservation is cancelled or modified later or in case of
                    no-show, the total price of the reservation will be charged.
                  </p>
                  <p className="p2">
                    <strong>Example:</strong> If you make a booking on 1st Jan
                    with Check-In Date of 30th Jan, then –<br />
                    You will receive a 75% refund if you cancel this booking
                    till 14th Jan. But if you cancel your booking later or in
                    case of No-Show/Modification, there will be no refund. You
                    can more details here –{" "}
                    <a href="http://www.oliveservicedapartments.com/terms-conditions/">
                      http://www.oliveservicedapartments.com/terms-conditions/
                    </a>{" "}
                  </p>
                  <p className="p2">
                    In the event that a guest needs to check out prior to the
                    agreed departure date, we will use our best endeavours to
                    obtain a refund of accommodation charges for the remainder
                    of the stay. However, any refund will be subject to the
                    apartment being re-let and may be subject to a cancellation
                    charge. We recommend that you have travel insurance to cover
                    these costs.
                  </p>

                  <p className="p2 fw-700">
                    <strong>Q. Do I need to pay a security deposit?</strong>
                  </p>
                  <p className="p2">
                    A. If you do not have a credit card available to cover any
                    unpaid bills, loss or damage, you may be required to pay a
                    security deposit on your arrival. We will keep the deposit
                    during your stay and until we can confirm there are no
                    pending bills or any additional cleaning or damage/loss in
                    the apartment. If there are no such deductions, then it will
                    be returned to you in full at the end of your stay.
                  </p>

                  <p className="p2 fw-700">
                    <strong>Q. Do I need to pay a security deposit?</strong>
                  </p>
                  <p className="p2">
                    A. If you do not have a credit card available to cover any
                    unpaid bills, loss or damage, you may be required to pay a
                    security deposit on your arrival. We will keep the deposit
                    during your stay and until we can confirm there are no
                    pending bills or any additional cleaning or damage/loss in
                    the apartment. If there are no such deductions, then it will
                    be returned to you in full at the end of your stay.
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
export default Faqs;
