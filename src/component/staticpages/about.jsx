import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";
import { Helmet } from "react-helmet";

class About extends Component {
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
          <title>About Us - Olive Serviced Apartments India</title>
          <meta
            name="description"
            content="Olive Serviced Apartments is a leading award-winning brand in residential Serviced Apartments with Pan-India presence. Short Term Furnished Rentals Agency"
          />
        </Helmet>
        <section className="pad-45">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="listing-card ">
                  <h1 class="font-green mb-30 font-cap text-center">
                    About Us
                  </h1>
                  <p className="p2">
                    Olive Serviced Apartments is one of the top award-winning
                    brands in the Indian residential Serviced Apartments sector
                    catering to the fast growing demand of Serviced Apartments,
                    Vacation Rentals & Holiday Homes in India. Incubated in 2010
                    by Blue Leaf Corporate Solutions P Ltd, a leading Mobility &
                    Relocations Company with offices in Delhi, Gurgaon,
                    Hyderabad & Bangalore, Olive has been rapidly expanding with
                    an inventory exceeding 500 Beds – we are poised to record
                    100% YOY growth as we seek to open up in other Indian cities
                    this year including Chennai, Pune, Ahmedabad, Kolkata,
                    Mumbai & Goa.
                  </p>
                  <p className="p2">
                    The award-winning company is backed by a consortium of
                    institutional venture capital investors and private equity
                    firms with a mandate to become the leader in the Indian
                    Serviced Apartments industry having the highest apartment
                    inventory and RevPAR across the country.
                  </p>
                  <p className="p2 fw-700">
                    * IMPORTANT: We do NOT provide individual Rooms on rent, we
                    offer only Entire Homes or Apartments on private,
                    non-sharing rentals.
                  </p>
                  <p className="p2">
                    <strong>Our USP : </strong>
                    Unlike other service providers who work as aggregators /
                    consolidators or marketing partners, we directly manage all
                    our properties across different locations ensuring a
                    consistent and professional service standard that cater to
                    our guest expectations anywhere in India.
                  </p>
                  <p className="p2 fw-700">
                    ** We are also the biggest residential Serviced Apartment
                    Provider in India in terms of self-catered apartments that
                    come with their own individual Kitchens.
                  </p>
                  <p className="fw-700 p2 font-ita">
                    With excellent ratings and reviews across TripAdvisor and
                    other Online Travel Agencies like Booking.com, etc. we are
                    the trusted choice for Serviced Apartments & Vacation
                    Rentals Holiday Homes in every city that we operate across
                    India.
                  </p>
                  <p className="p2">
                    <strong>
                      The gamut of services offered by us include:
                    </strong>
                    <ul className="static-list">
                      <li>
                        Fully Serviced residential apartments for business
                        travelers
                      </li>
                      <li>
                        Residential Serviced apartments for medical tourists
                      </li>
                      <li>Furnished Short Stay Rentals</li>
                      <li>Corporate Relocation and Accommodation</li>
                      <li>Long Stay sourcing of Housing & Furnishings</li>
                      <li>
                        Vacation Rentals & Holiday Homes for leisure travelers
                      </li>
                      <li>Corporate Guest House Management</li>
                      <li>Property Management services for property owners</li>
                    </ul>
                  </p>
                  <p className="p2 mb-10">
                    <strong>
                      Partnership Opportunities for Property Owners across
                      India:
                    </strong>
                  </p>
                  <p className="p2 ">
                    If you are a Property Owner or Landlord in Delhi, Gurgaon,
                    Noida, Hyderabad, Mumbai, Pune, Jaipur, Bangalore, Chennai,
                    Kolkata, Ahmedabad &amp; Goa, besides other Tier 2 &amp;
                    Tier 3 cities in India, and looking for opportunities to
                    generate high income returns from your residential property,
                    then we can be the right fit for each other. We have a rich
                    experience in marketing and managing high yield residential
                    properties to Corporates and MNC Executives and can generate
                    good revenues from your property.
                  </p>
                  <p className="p2 mb-10">
                    <strong>
                      We have three basic working models across India:
                    </strong>
                  </p>
                  <p className="p2 ">
                    <ol className="static-list lower-latin">
                      <li>
                        Signup an outright rent/lease of your property directly
                        with our company for a fixed monthly rental.
                      </li>
                      <li>
                        Market your property on your behalf and help with setup
                        and readiness as well as professional staff training.
                      </li>
                      <li>
                        Get into a strategic revenue sharing partnership where
                        we handle the complete marketing and/or management of
                        the property.
                      </li>
                    </ol>
                  </p>
                  <p className="p2 ">
                    If the idea of working with one of the leading residential
                    serviced accommodation providers in India interests you,
                    please drop us a mail at{" "}
                    <a
                      className="static-links"
                      href="mailto:partners@oliveservicedapartments.com"
                    >
                      partners@oliveservicedapartments.com
                    </a>{" "}
                    or give us a call. One of our Area Managers will connect
                    with you to do a feasibility survey and also discuss the
                    modalities of our partnership.
                  </p>
                  <p className="p2 ">
                    For more information, please give us a call at{" "}
                    <a className="static-links" href="tel:+917290029000">
                      +917290029000
                    </a>
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
export default About;
