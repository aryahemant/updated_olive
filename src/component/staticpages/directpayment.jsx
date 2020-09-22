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
import history from "../../lib/history";
import swal from "sweetalert";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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

class Directpayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_no: "",
      name: "",
      email: "",
      amount: "",
      location: "",
      dayserror: "",
      phone: "",
      pay_done: "",
      options: [],
      loader: false,
    };

    this.handleAmount = this.handleAmount.bind(this);
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

  handleSubmit = (event) => {};
  handlePhone = (e) => {
    console.log("phone", e.target.value);
    this.setState({
      phone: e.target.value,
    });
    localStorage.setItem("phone", e.target.value);
  };
  handleAmount(e) {
    console.log("amount hai", e.target.value);
    this.setState({
      amount: e.target.value,
    });
    localStorage.setItem("amt", e.target.value);
  }
  handleName = (e) => {
    console.log("name", e.target.value);
    this.setState(
      {
        name: e.target.value,
      },
      this.handleSubmit
    );
    localStorage.setItem("name", e.target.value);
  };

  handleEmail = (e) => {
    console.log("email", e.target.value);
    this.setState(
      {
        email: e.target.value,
      },
      this.handleSubmit
    );
    localStorage.setItem("email", e.target.value);
  };
  handlePhone = (e) => {
    console.log("Phone hain", e.target.value);
    this.setState(
      {
        phone: e.target.value,
      },
      this.handleSubmit
    );
  };
  handleNookingNumber = (e) => {
    console.log("booking no", e.target.value);
    this.setState(
      {
        booking_no: e.target.value,
      },
      this.handleSubmit
    );
  };
  handleLocation = (e, { value }) => localStorage.setItem("location", value);

  openCheckout() {
    console.log(
      "amount in fun",
      this.state.amount,
      this.state.name,
      this.state.email,
      this.state.booking_no
    );
    if (
      this.state.booking_no == "" ||
      this.state.name == "" ||
      this.state.email == "" ||
      this.state.phone == "" ||
      this.state.amount == 0
    ) {
      this.setState({
        dayserror: "Please filled all details",
      });
      return false;
    }
    this.setState({
      loader: true,
    });
    axios
      .get(
        `https://www.oliveservicedapartments.com/olive_api/public/api/direct/booking/${this.state.booking_no}`
      )
      .then((resp) => {
        console.log("status", resp.data.status);
        console.log("response", resp.data, resp);
        // if (resp.data.staus === 0) {
        //   this.setState({
        //     dayserror: resp.data.message,
        //   });
        //   return false;
        // }
        // console.log("response", resp.data, resp);
        const USER_TOKEN = JSON.parse(localStorage.getItem("login"));
        localStorage.setItem("bookingno", this.state.booking_no);
        localStorage.setItem("booking_name", this.state.name);
        localStorage.setItem("booking_phone", this.state.phone);
        localStorage.setItem("booking_email", this.state.email);
        // localStorage.setItem("location", this.state.location);
        this.setState({
          dayserror: "",
        });
        console.log(USER_TOKEN);
        // rzp_test_dPfF4fXMcXM53w
        const AuthStr = "Bearer ".concat(USER_TOKEN);
        axios({
          method: "post",
          url:
            "https://www.oliveservicedapartments.com/olive_api/public/api/payment",
          data: {
            // property_id: resp.data.data.property_id,
            amount: this.state.amount,
          },
          headers: { Authorization: AuthStr },
        }).then((response) => {
          this.setState({ loader: false });
          let options = {
            key: "rzp_live_dYt1l2s9CEdtjZ",
            amount: this.state.amount * 100, // 2000 paise = INR 20, amount in paisa
            name: "Olive",
            description: "Olive BlueLeafCorp",
            image:
              "https://www.oliveservicedapartments.com/static/media/olive-logo.png",
            handler: function (response) {
              // alert(response.razorpay_payment_id);
              console.info("booiing id", localStorage.getItem("bookingno"));

              axios({
                method: "post",
                url:
                  "https://www.oliveservicedapartments.com/olive_api/public/api/direct/payment/success",
                data: {
                  property_id: resp.data.property_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  booking_id: localStorage.getItem("bookingno"),
                  phone: localStorage.getItem("booking_phone"),
                  name: localStorage.getItem("booking_name"),
                  email: localStorage.getItem("booking_email"),
                  location: localStorage.getItem("location"),
                  payment_mode: 2,
                },
                headers: { Authorization: AuthStr },
              }).then((response) => {
                console.info("getting response", response);
                localStorage.setItem("pay_done", response.data.msg);
                swal("payment successful", {
                  icon: "success",
                });
                if (response.data.status === "captured") {
                  history.push("/thankyou");
                }
              });
            },
            prefill: {
              name: this.state.name,
              email: this.state.email,
              contact: this.state.phone,
              booking_no: this.state.booking_no,
            },
            notes: {
              address: this.state.location,
            },
            theme: {
              color: "#5DB64C",
            },
          };
          this.setState({
            booking_no: "",
            name: "",
            email: "",
            amount: "",
            phone: "",
          });
          let rzp = new window.Razorpay(options);
          rzp.open();
        });
      });
  }

  render() {
    // const { errors } = this.state;
    const { value } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Direct Payment for Rental Apartments - Olive Serviced Apartments
          </title>
          <meta
            name="description"
            content="Direct Payments to Olive for Rental Apartments - Securely make payments online for Bookings at Olive Serviced Apartments (Blue Leaf Corp) across India"
          />
        </Helmet>
        <section className="pad-45">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="listing-card ">
                  <h1 class="font-green mb-30 font-cap text-center">
                    Accommodation Booking
                  </h1>
                  <p className="mb-10">Your Booking Information</p>
                  <p className="p2 fw-700 ">
                    Please use the below form to provide your Booking
                    information for the rental Serviced Apartment and make
                    payment for this booking. Instructions
                  </p>
                  <p className="p2 mb-10">
                    Please enter the Booking ID provided by our Sales Team over
                    email, and use the same Name & Email Address that you
                    provided us in your communication.
                  </p>
                  <p className="p2 mb-10">
                    Phone Number should be a Mobile Number so that we can reach
                    you for SMS and Phone confirmation of your payment and
                    booking.
                  </p>
                  <p className="p2 mb-30">
                    Please enter the Amount to be Paid in INR as per the email
                    received from us, this is the amount that will be charged to
                    you.
                  </p>
                  <span className="paymentbooking">
                    {" "}
                    {this.state.dayserror}
                  </span>
                  <Form
                    className="contactus-form registerform"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row ">
                      {/* <h2>{localStorage.getItem("pay_done")}</h2> */}
                      <div className="col-md-6">
                        <Form.Field>
                          <label>Booking Number*</label>
                          <input
                            type="number"
                            placeholder="Booking Number"
                            value={this.state.booking_no}
                            onChange={this.handleNookingNumber}
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="col-md-6">
                        <Form.Field>
                          <label>Name*</label>
                          <input
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleName}
                            required
                          />
                        </Form.Field>
                      </div>

                      <div className="col-md-6">
                        <Form.Field>
                          <label>Email Address*</label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            required
                          />
                        </Form.Field>
                      </div>

                      <div className="col-md-6">
                        <Form.Field>
                          <label>Phone*</label>
                          <input
                            type="number"
                            placeholder="+919191919191"
                            value={this.state.phone}
                            onChange={this.handlePhone}
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="col-md-6 mb-30">
                        <Form.Field
                          control={Select}
                          options={this.state.options}
                          label={{ children: "Location" }}
                          onChange={this.handleLocation}
                          placeholder="Location"
                          search
                          searchInput={{ id: "form-select-control-gender" }}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <Form.Field>
                          <label>Amount*</label>
                          <input
                            type="number"
                            placeholder="Amount"
                            value={this.state.amount}
                            onChange={this.handleAmount}
                            required
                          />
                        </Form.Field>
                      </div>
                      <div className="col-md-12">
                        <p className="p2 mb-10">
                          These charges are billed towards my rental serviced
                          apartment booking. I acknowledge and accept the above
                          charges and understand that refund /cancellation if
                          any, will be governed by the refund /cancellation
                          policy of Olive Serviced Apartments (Blue Leaf Corp)
                        </p>
                      </div>
                      <div className="col-md-12">
                        <Form.Field>
                          <Checkbox label="I agree to the House Rules and Cancellation Policy,Terms of Service & Privacy Policy. I also agree to pay the total amount shown, which includes Occupancy Taxes." />
                        </Form.Field>
                      </div>
                      <div className="col-md-12">
                        <Button
                          className="listing-btn"
                          onClick={() => this.openCheckout()}
                          disabled={this.state.loader == true && "disabled"}
                        >
                          Make Payment
                        </Button>
                        {this.state.loader == true && (
                          <Loader
                            type="ThreeDots"
                            color="#5db64c"
                            height={80}
                            width={80}
                            timeout={5000} //3 secs
                          />
                        )}
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Directpayment;
