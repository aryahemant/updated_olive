import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";
import { Modal } from 'antd';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl, Tab, Tabs } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';

class Refundpolicy extends Component {
  state = { visible: false };
  componentDidMount() {
    window.scrollTo(0, 0);
    // this.handleAmenityDetail();
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  handleCancel = e => {
    console.log(e);
    this.setState({
      // apartmentImage={this.state.prope
      visible: false,
    });
  }
  render() {
    return (
      
      <React.Fragment>
        <section className="pad-45">
          <div className="container">
            <div className="row">
            <div className="col-md-12">
            <div className="listing-card ">
                <h1 class="font-green mb-30 font-cap text-center">Cancellations & Refund Policy</h1>
               
                  <p className="p2">
                     We have Two different rates for any Property listed on our website. The ThreTwoe Rates have their own clearly defined Cancellation & Prepayment 
                     policies that are displayed along side the rates. We are also listing them here for reference -
                  </p>
                  <p className="p2">
                     <strong>a). HOT DEAL - Non Refundable Rates</strong> <br/>
                     <strong>Cancellation Policy -</strong> Please note, this reservation is completely non-modifiable and non-cancellable. If it is cancelled, modified or in case of no-show, the total price of the reservation will be charged.<br/>
                     <strong>Prepayment Policy -</strong> The total price of the reservation will be charged at the time of booking.
                  </p>
                  <p className="p2">
                     <strong>b) BEST AVAILABLE RATE - Refundable Rates</strong> <br/>
                     <strong>Cancellation Policy - </strong>Please note, if cancelled or modified up to 14 days before date of arrival, no fee will be charged. 
                     If cancelled or modified later or in case of no-show, 25 percent of the total price of the reservation will be charged.<br/>
                     <strong>Prepayment Policy -</strong>  No payment will be charged at the time of booking unless Check-In Date is within 14 Days from Date of Booking.
                     You will need to pay only 25 per cent of the total price of reservation as Advance Payment 14 days before arrival to confirm your booking. This Advance Payment of 25% is equivalent to the 
                     Cancellation Charges and is not refundable as per the applicable Cancellation Policy.
                  </p>
                  <p className="p2">Your Booking will be confirmed only after receipt of Advance Payment, 
                     if Advance Payment is not received 14 Days before arrival, then your booking will be cancelled automatically.
                  </p>
                  <p className="p2">* No other Cancellation or Pre-Payment policy will supercede these above stated Policies unless otherwise specified clearly over email by our Sales Team.</p>
                  <p className="p2">* In the event that a guest needs to check out prior to the agreed departure date, we will use our best endeavours to obtain a refund of accommodation charges for the remainder of the stay. However,
                     any refund will be subject to the apartment being re-let and may be subject to a cancellation charge.
                  </p>
                  <p className="p2">
                     4.1. Where a Guest wishes to extend the period of stay in the Property written notice should be given to us as soon as possible.<br/>
                     4.2. We cannot guarantee any extension, which is subject to availability of the Property. An alternative apartment may be offered if the Property has been booked for all or part of the required extension period.<br/>
                     4.3. We reserve the right to charge a different price for the Property for any period of extension. Payment for the extension period will be required immediately that we confirm the availability of the Property or alternative apartment(s) to the Guest or to you.<br/>
                     4.4 All refunds are subject to deduction of any transaction fees charged by the merchant banks/payment gateways.<br/>
                     4.5. These Conditions apply to any extension of the booking in the same way that they apply to the original booking.<br/>
                     4.6. Failure to check in on the date of arrival and/or any cancellations of bookings (or part bookings) owing to disruption to or cancellation of your travel arrangements, whether caused by act of God, industrial action, or other circumstances not being our fault will not reduce or cancel your liability for the full cost of the booking, and if applicable, cancellation charges will apply in accordance with this policy. You are therefore advised to take out adequate travel insurance to cover your losses in such situations.
                  </p>
              </div>


                   <button className="mt-15 viewgallery" onClick={this.showModal}>view gallery</button>
                                  <Modal
                                    width={700}
                                    visible={this.state.visible}

                                    onCancel={this.handleCancel}
                                  >
                                    <OwlCarousel
                                      className="owl-theme"
                                      // loop
                                      margin={10}
                                      items="1"
                                      dots={true}
                                      nav
                                    >
                                   
                                        <div className="item">
                                          <img className=""  src={require("../../assets/Delhi.jpg")} />
                                          
                                         
                                        </div>
                                        <div className="item">
                                          
                                          <img className=""  src={require("../../assets/Delhi.jpg")} />
                                         
                                        </div>


                                    </OwlCarousel>
                                  </Modal>
            </div>
            
            </div>
          </div>
        </section>
    
      </React.Fragment>
    );
  }
}
export default Refundpolicy;
