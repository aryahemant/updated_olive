import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";
import SweetAlert from 'react-bootstrap-sweetalert';
class Terms extends Component {
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
               <h1 class="font-green mb-30 font-cap text-center">Terms & Conditions</h1>
                  <p className="p2">
                     These terms and conditions of business (“Conditions”) form a binding contract between us, Olive Serviced Apartments 
                     (a division of Blue Leaf Corporate Solutions P Ltd) and You, the person making the booking, and all adult members of the party (collectively the “Guests”) 
                     who will stay in our serviced apartment(s) (the “Property”). 
                     You will be deemed to have accepted these terms when making your booking with us.
                  </p>
                  <p className="p2 fw-700">
                     1. BOOKING PROCEDURE
                  </p>
                  <p className="p2">
                     1.1. These Conditions are accepted by you on behalf of all Guests at the time when payment is made for your booking.<br/>
                     1.2. It is your responsibility to ensure that all Guests in your group are given a copy of these Conditions and understand that they are bound by them.<br/>
                     1.3. The booking procedure is only complete when we send to you (to the email address stated on the booking form) confirmation which confirms the booking.
                  </p>
                  <p className="p2 fw-700">
                     2. PAYMENT
                  </p>
                  <p className="p2">
                     2.1. Payment is to be made in Indian Rupees only.<br/>
                     2.2. Full payment is due at the time of booking/check-in as per the policy of the respective booking.<br/>
                     2.3. Payment must be made with a valid credit or debit card, which has an expiry date that is later than the date on which the intended stay in the Property will end. Payments can also be made in cash.<br/>
                     2.4. Prices are quoted in Indian Rupees and are subject to change. Once a booking has been confirmed we will not increase the prices unless you alter the booking (see 4.5).<br/>
                     2.5. All prices quoted are exclusive of Goods & Services Tax (unless otherwise stated) and you will be required to pay Goods & Services Tax (where chargeable) at the prevailing rate.<br/>
                     2.6. Invoices/Receipts confirming the booking will be dispatched as part of the booking procedure.<br/>
                     2.7. Should your account be overdue for payment we reserve the right to charge interest at 4% above the Reserve Bank of India base rate from the due date for payment.
                  </p>
                  <p className="p2 fw-700">
                     3. DEPOSIT and ADDITIONAL CHARGES
                  </p>
                  <p className="p2">
                     3.1. Unless you are booking with us on behalf of a company that has satisfied our own internal credit check procedures,
                     a deposit payment covering any potential breakages at or damages to the Property or loss of contents during your stay 
                     with us and other Additional Charges arising is due at time of booking. A valid credit card is required to hold this deposit against. 
                     If in our opinion there were no breakages at or damages to the Property or loss of contents during your stay or other Additional Charges arising, 
                     the full amount of the deposit will be refunded to your credit card account within 3 days of the end of your stay with us.<br/>
                     3.2. The credit card details used for the booking will be held and that credit card will be charged for all additional charges incurred by any Guest (“Additional Charges”), including but not limited to:<br/>
                     3.2.1. breakages, loss or damage to the Property or any of its contents;<br/>
                     3.2.2. cleaning / specialist treatment charges where more than routine cleaning is needed or smoking has occurred in a non-smoking apartment;<br/>
                     3.2.3. additional housekeeping services (details available on request);<br/>
                     3.2.4. lost keys, electronic fobs or car park passes;<br/>
                     3.2.5. Electricity charges (billed on actual usage);<br/>
                     3.2.6. any other financial loss to us e.g. where damage means the Property cannot be immediately reoccupied and our administrative costs.<br/>
                     3.3. A written statement of the Additional Charges will be sent to you at the time the debit or credit card is charged the sum of the Additional Charges.<br/>
                     3.4. Where the level of the Additional Charges are not stated in these Conditions, we will charge the actual cost of the cleaning, replacement, repair, services or loss (as appropriate) to you, together with any administration costs.<br/>
                  </p>
                  <p className="p2 fw-700">
                     4. CANCELLATIONS & REFUNDS
                  </p>
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
                  <p className="p2 fw-700">
                     5. ARRIVALS AND DEPARTURES
                  </p>
                  <p className="p2 ">
                     5.1. Check-in is from 14:00 hours on the date of arrival unless otherwise specified by the property.<br/>
                     5.2. Check out is before 10:00 hours on the date of departure.<br/>
                     5.3. You should contact us at least 24 hours prior to arrival at the Property to confirm the arrival time and the key collection procedure for the Property.<br/>
                     5.4. The Welcome Folder within the Property will confirm the procedure for check out.<br/>
                     5.5. Out of hours check in is available for an Additional Charge, as is the provision of check in and check out inventories. If these services are required please contact us in advance.<br/>
                     5.6. Failure to check out on time may result in extra charges commensurate with the level of interruption caused.<br/>
                  </p>
                  <p className="p2 fw-700">
                  6. NO TENANCY CREATED
                  </p>
                  <p className="p2 ">
                  6.1. The Property is not for use as the principal or additional home or residence of the Guests. The Property is only to be used either as temporary accommodation, holiday accommodation, or as accommodation in connection with the business needs of you, your organization and/or the Guests, as appropriate. No one/no person other than the Guests have the right to use the Property.<br/>
6.2. These Conditions amount to a contractual agreement for the use of the Property either as temporary or holiday accommodation ancillary to the requirements of your/the Guests’ business and do not create a tenancy of the Property (periodic or otherwise). No relationship of landlord and tenant is created between us and the Guests.<br/>
6.3. These Conditions constitute an excluded agreement under the relevant sections of the Delhi Rent Control Act or any other relevant provisions of law and cannot be construed as any right of tenancy/ sub – tenancy / lease / sub – lease etc.
                  </p>
                  <p className="p2 fw-700">
                  7. ACCOMMODATION
                  </p>
                  <p className="p2 ">
                  7.1. We cannot guarantee the exact apartment number(s) prior to arrival but will accommodate the Guests in apartment(s) of an equivalent standard and nearby location. No refund will be payable in such circumstances.<br/>
7.2. The Property is only to be used by the maximum number of Guests suitable for the Property, as advertised by us. All Guest names should be submitted at the time of booking. Any variation in the identity of the Guests must be notified to us in writing in advance of arrival. The Property must not be slept in by any other persons. All Guests must have identification documents with them on arrival for checking.<br/>
                  </p>
                  <p className="p2 fw-700">
                  8. FACILITIES AND SERVICES
                  </p>
                  <p className="p2 ">
                  8.1. The price for the use of the Property varies by the Type & Category of Apartment selected and may include:<br/>
8.1.1. The supply of water, electricity, gas, sewerage, (as applicable);<br/>
8.1.2. Payments in respect of Municipal/Property Tax;<br/>
8.1.3. Tata Sky TV fee;<br/>
8.1.4. Telephone landline rental;<br/>
8.1.5. One broadband WiFi internet connection;<br/>
8.1.6. Housekeeping service (including general cleaning, changing of linen and towels, making of beds, removal of rubbish);<br/>
8.1.7. Supply of fresh bed linen and towels; and<br/>
8.1.8. Routine maintenance, e.g. light bulb changes.<br/>

8.2. The price for the Property does not include:<br/>
8.2.1. items listed at condition 3.1 above;<br/>
8.2.2. telephone call charges; or<br/>
8.2.3. the provision of food or beverages.<br/>
8.3. We cannot be held responsible for any failure or interruption of services to the Property, or for any damage, disruption or noise caused as a result of repair works being carried out in another part of the building.
                  </p>
                  <p className="p2 fw-700">
                  9. ACCESS
                  </p>
                  <p className="p2 ">
                  9.1. Guests do not have exclusive access to the Property and we, our staff and contractors have the right of access to the Property at all reasonable times (and at all times, in the case of an emergency) without notice to the Guests.<br/>
9.2. Housekeeping visits to the Property will occur without notice in the time slot detailed in the Welcome Folder at the Property.<br/>
9.3. We will issue one set of all necessary keys, fobs and car park access passes (if applicable) for each apartment, unless otherwise requested in advance (in which case a Rs 900 deposit may be taken for each additional set of keys supplied). We will retain a full set of keys for access to the Property.
                  </p>
                  <p className="p2 fw-700">
                  10. GUEST RESPONSIBILITIES
                  </p>
                  <p className="p2 ">
                  10.1. Guests must comply with the regulations for use of the Property set out in the Welcome Folder, located in the Property. If any Guest breaches any of these Conditions or the regulations we reserve the right to request the Guest to vacate their apartment immediately, without refund.<br/>
10.2. Smoking is not permitted in any Property.<br/>
10.3. Unless explicitly specified, Pets must not be kept at or allowed to visit the Property.<br/>
10.4. Guests are responsible for the safety of their own belongings and the behaviour of their children whilst at the Property.<br/>
10.5. Guests must use the Property responsibly and with respect for other guests staying in nearby apartments.<br/>
10.6. Guests must keep the Property, and its furniture, fittings and effects in the same condition as on the date of arrival, wear and tear allowing, and must leave the Property in the same state of cleanliness and general order as it was on arrival, in order to avoid incurring any Additional Charges.<br/>
10.7. Guests must notify us of all damage, loss or broken items, or matters requiring maintenance, in the manner set out in the Welcome Folder.<br/>
10.8. Guests’ belongings must be removed from the Property on the date of departure. All lost property will be kept by us for a maximum of one month from the date of discovery, and thereafter may be discarded.<br/>
10.9. Regular servicing and cleaning of the Property is essential in order to maintain our high standards and minimize health and safety risks and fire hazards to Guests and our staff. Accordingly, the Property must be kept free of unnecessary clutter and excess personal belongings, in order that the regular cleaning and servicing of the Property by our staff is not hindered in any way. Sufficient cupboard and wardrobe space is available at the Property for the storage of personal items during your stay. If we are unable to clean or maintain the Property (including carrying out weekly housekeeping) because of excess clutter or disarray caused by Guests’ belongings, we will give the Guest(s) 72 hours written notice of the need to provide access to all parts of the Property, free of clutter, mess and excess personal belongings in order that cleaning and maintenance can occur. In this case we shall apply an additional charge of a minimum of Rs 2,500 plus tax to cover the costs of inspection, service of the notice and comprehensive cleaning of the Property.<br/>
10.10. We reserve the right to terminate Guests’ stay prior to their scheduled departure date should the weekly cleaning and maintenance of the Property not be possible owing to excess clutter or disarray caused by Guests’ belongings.<br/>
10.11. Where Guests are staying at the Property for more than 30 days, we may carry out a full and detailed condition inspection after the first 30 days and thereafter upon notice. Guests will be notified in writing in advance of each inspection of the Property.
                  </p>
                  <p className="p2 fw-700">
                  11. BROADBAND AND TELEPHONE
                  </p>
                  <p className="p2 ">
                  11.1. We are not responsible for loss or damage to Guests’ own computers whilst in the Property or whilst connected to the broadband connection at the Property.<br/>
11.2. Guests must not use the broadband connection at the Property for illegal or immoral purposes.<br/>
11.3. Guests are responsible for the cost of telephone calls at the Property and must contact the telephone provider direct, in accordance with the instructions in the Welcome Folder, to use the telephones for outgoing calls.
                  </p>
                  <p className="p2 fw-700">
                  12. HEALTH AND SAFETY
                  </p>
                  <p className="p2 ">
                  We take the health and safety of all Guests seriously. Guests should read the Health and Safety Policy in the Welcome Folder located in the Property on arrival and must comply with all requirements of that policy at all times.
                  </p>
                  <p className="p2 fw-700">
                  13. CIRCUMSTANCES BEYOND OUR CONTROL
                  </p>
                  <p className="p2 ">
                  The provision of accommodation and services by us under these conditions is subject to any unexpected and uncontrollable events (e.g. industrial disputes, acts of God, war, etc.) for which we shall not be liable.
                  </p>
                  <p className="p2 fw-700">
                  14. FEEDBACK AND COMPLAINTS
                  </p>
                  <p className="p2 ">
                  We welcome feedback from our guests. If you are not entirely satisfied with the service offered you should notify Guest Services in the first instance. If the problem cannot be resolved during your stay please contact us via Email. Our policy is to acknowledge complaints within 2 working days.
                  </p>
                  <p className="p2 fw-700">
                  15. DATA PROTECTION AND PRIVACY
                  </p>
                  <p className="p2 ">
                  We do not share your data with any third party whatsoever unless mandated by the government or related regulatory/legal bodies. No information of guests is provided for any marketing purposes to any commercial agency.
                  </p>
                  <p className="p2 fw-700">
                  16. GENERAL
                  </p>
                  <p className="p2 ">
                  16.1. Paragraph headings do not affect the interpretation of these Conditions.<br/>
16.2. Notice in writing means by email only.<br/>
16.3. We are not liable for loss or damage to Guests’ belongings, however caused. Guests should ensure their own insurance policy covers these items during their stay at the Property.<br/>
16.4. These Conditions apply to all bookings, even those NOT made on our online booking forms, and over-ride all other terms and conditions on such booking forms.<br/>
16.5. These Conditions apply in full to the extent that they are not expressly varied by us in writing and such variation is notified to you.<br/>
16.6. These Conditions are governed by the laws of India and any dispute about these Conditions shall be submitted to the exclusive jurisdiction of the courts of New Delhi, India.<br/>
16.7. We reserve the right to change these terms and conditions at any time.<br/>
16.8. Olive Serviced Apartments is a trading style of Blue Leaf Corporate Solutions P Limited whose administrative office is at 1208 DLF Phase - 4, Gurgaon – 122009 Haryana, India.<br/>
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
export default Terms;