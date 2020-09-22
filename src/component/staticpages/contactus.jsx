import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Checkbox,
} from "semantic-ui-react";
import axios from "axios";

const LocationOptions = [
  {
    key: "Delhi",
    text: "Delhi",
    value: "Delhi",
    //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
  },
  {
    key: "Gurgaon",
    text: "Gurgaon",
    value: "Gurgaon",
    //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
  },
];

class Contactus extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    // this.handleAmenityDetail();
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    let options = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    );
    options = options.data.map((obj) => ({
      key: obj.id,
      text: obj.city_name,
      value: obj.city_name,
    }));
    this.setState({
      options: options,
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
                  <h1 class="font-green mb-30 font-cap text-center">
                    Contact Us
                  </h1>
                  <Form className="contactus-form registerform">
                    <div className="row ">
                      <div className="col-md-6">
                        <Form.Field>
                          <label>Name*</label>
                          <input type="text" placeholder="Name" />
                        </Form.Field>
                      </div>

                      <div className="col-md-6">
                        <Form.Field>
                          <label>Email Address*</label>
                          <input type="email" placeholder="Email" />
                        </Form.Field>
                      </div>

                      <div className="col-md-6">
                        <Form.Field>
                          <label>Phone*</label>
                          <input type="number" placeholder="+919191919191" />
                        </Form.Field>
                      </div>
                      <div className="col-md-6 mb-30">
                        <Form.Field
                          control={Select}
                          options={this.state.options}
                          label={{ children: "Location" }}
                          placeholder="Location"
                          search
                          searchInput={{ id: "form-select-control-gender" }}
                        />
                      </div>
                      <div className="col-md-12">
                        <Form.TextArea label="Message" placeholder="message" />
                      </div>

                      <div className="col-md-6">
                        <Button
                          className="listing-btn"
                          onClick={() => this.update()}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
                <p className="p2">
                  We would be more than happy to help you. Our Sales team will
                  assist with choosing your best fit apartment.
                </p>
                <p className="p2 mb-30 ">
                  Please use the below Contact Details for their respective
                  Cities:
                </p>
              </div>
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">DELHI</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-7290029000
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    delhi@oliveservicedapartments.com
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">GURGAON</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-8588855000
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    gurgaon@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">HYDERABAD</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-7090006000
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    hyderabad@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">JAIPUR</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-7413013013
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    jaipur@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">NOIDA</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-7290026000
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    noida@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">BANGALORE</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-9091191919
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    bangalore@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">KOLKATA</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-7290027000
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    kolkata@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">PUNE</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-9582261081
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    pune@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">CHENNAI</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-9958867668
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    chennai@oliveservicedapartments.com
                  </p>
                </div>
              </div>{" "}
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">GOA</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-9999011604
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    goa@oliveservicedapartments.com
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="static-page-card contact-list">
                  <p className="p1 fw-700">AHMEDABAD</p>
                  <p className="p1">
                    <i className="fa fa-phone rot-90" aria-hidden="true"></i>
                    +91-8800333977
                  </p>
                  <p className="p1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    ahmedabad@oliveservicedapartments.com
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
export default Contactus;
