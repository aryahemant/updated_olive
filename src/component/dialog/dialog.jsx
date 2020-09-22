import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import parser from "html-react-parser";
import "./dialog.css";

let Dialogstyle = {
  padding: "20px 20px 75px 20px",
  maxWidth: "100%",
  margin: "0 auto",
  position: "fixed",
  left: "50%",
  top: "45%",
  zIndex: "999",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#3d3d3d",
  overflow: "Hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 10px 2px ",
  borderRadius: "8px",
};
let Dialogclosebtn = {
  backgroundColor: "#fff",
  color: "#87879B",
  fontSize: "15px",
  textTransform: "capitalize",
  padding: "10px 18px",
  lineHeight: "15px",
  borderRadius: "6px",
  position: "absolute",
  bottom: "25px",
  right: "20px",
  border: "#87879B 1px solid",
  // border: "0"
};
let pcolor = {
  color: "#fff",
  fontSize: "16px",
  textAlign: "left",
  lineHeight: "20px",
};
let modheading2 = {
  fontSize: "20px",
  lineHeight: "22px",
  color: "#fff",
  marginBottom: "10px",
};
let modamtimg = {
  backgroundColor: "#5DB64C",
  lineHeight: "25px",
};
let modamtimgimg = {};
let modheading = {
  fontSize: "24px",
  lineHeight: "26px",
  textAlign: "left",
  color: "#fff",
  marginBottom: "15px",
};

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(localStorage.getItem("layouts")),
      price_type: localStorage.getItem("price_type"),
      policies: "",
    };
  }
  async componentDidMount() {
    // const resp = await axios.get(
    //   `https://www.oliveservicedapartments.com/olive_api/public/api/policies`
    // );
    // const value = resp.data;
    this.setState({
      policies: JSON.parse(localStorage.getItem("policies")),
    });
    if (localStorage.getItem("apartmentTitle") === "furnished") {
      localStorage.setItem("servicefee", this.state.policies.fservice_fees);
    }
    if (localStorage.getItem("apartmentTitle") === "Standard") {
      localStorage.setItem("servicefee", this.state.policies.sservice_fees);
    }
    if (localStorage.getItem("apartmentTitle") === "Superior") {
      localStorage.setItem("servicefee", this.state.policies.suservice_fees);
    }
    console.info("all policies", this.state.policies.best_rate);
  }
  render() {
    let priceType = localStorage.getItem("price_type");
    let policieslist = this.state.policies;
    let prodec = JSON.stringify(localStorage.getItem("prop_desc"));
    let propdetial = prodec.replace(/(\r\n|\n|\r)/gm, "");
    // console.log("hey you!fdsfdfd", propdetial);
    // console.log("hey you!", priceType);
    let dialog = (
      <div style={Dialogstyle} className="dialogbox">
        <div className="dialogboxtext">
          {this.props.typeOf == "hot deal" && (
            <React.Fragment>
              <p style={modheading}>
                <strong>Details for Hot Deal</strong>
              </p>
              {/* <p className="policy">{policieslist.hot_deal}</p> */}
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: policieslist.hot_deal,
                }}
              />
            </React.Fragment>
          )}
          {this.props.typeOf === "best available rate" && (
            <React.Fragment>
              <p style={modheading}>
                <strong>Details for Best Available Rate</strong>
              </p>
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: policieslist.best_rate,
                }}
              ></p>
            </React.Fragment>
          )}
          {this.props.typeOf === "non refundable" && (
            <React.Fragment>
              <p style={modheading}>
                {}
                <strong>Cancellation Policy for Hot Deal</strong>
              </p>
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: policieslist.non_refundable,
                }}
              ></p>
            </React.Fragment>
          )}
          {this.props.typeOf === "free cancellation" && (
            <React.Fragment>
              <p style={modheading}>
                {" "}
                {}
                <strong>Cancellation Policy for Best Available Rate</strong>
              </p>
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: policieslist.refundable,
                }}
              ></p>
            </React.Fragment>
          )}
          {this.props.typeOf === "Pay Now" && (
            <React.Fragment>
              <p style={modheading}>
                {" "}
                {}
                <strong>Prepayment for Hot Deal</strong>
              </p>
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: policieslist.pay_now,
                }}
              ></p>
            </React.Fragment>
          )}
          {this.props.typeOf === "Pay On Arrival" && (
            <React.Fragment>
              <p style={modheading}>
                {" "}
                {}
                <strong>Prepayment for Best Available Rate</strong>
              </p>
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: policieslist.pay_later,
                }}
              ></p>
            </React.Fragment>
          )}

          {this.props.typeOf === localStorage.getItem("apartmentTitle") && (
            <React.Fragment>
              <p style={modheading}>
                {}
                <strong>Privacy Policy</strong>
              </p>
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: localStorage.getItem("servicefee"),
                }}
              ></p>
            </React.Fragment>
          )}

          {this.props.typeOf === "aprtmentdetailpopup" && (
            <React.Fragment>
              <p style={modheading}>
                {" "}
                {}
                <strong>Description</strong>
              </p>
              <p
                className="policy"
                dangerouslySetInnerHTML={{
                  __html: propdetial,
                }}
              ></p>

              {(JSON.parse(localStorage.getItem("property_amenity"))) &&
              (JSON.parse(localStorage.getItem("property_amenity"))).map((amenity, index) => (
                <p
                  key={index}
                  class="d-inline-block  det-amenities font-cap mb-10 mr-10"
                >
                  <span className="det-amenities-img" style={modamtimg}>
                    <img style={modamtimgimg} class="" src={amenity.image} />
                  </span>
                  <span className="fw-600 font-white">
                    {amenity.name}
                  </span>
                  <br />
                  <span className="font-12 font-white">
                    {amenity.description}
                  </span>
                </p>
              ))}
              {/* <p class="d-inline-block  det-amenities font-cap mb-10 mr-10">
                <span className="det-amenities-img" style={modamtimg}>
                  <img
                    style={modamtimgimg}
                    class=""
                    src={require("../../assets/Wifi_Circle.png")}
                  />
                </span>
                <span className="fw-600 font-white">Am name</span>
                <br />
                <span className="font-12 font-white">am dessacsasdafs</span>
              </p>
              <p class="d-inline-block  det-amenities font-cap mb-10 mr-10">
                <span className="det-amenities-img" style={modamtimg}>
                  <img
                    style={modamtimgimg}
                    class=""
                    src={require("../../assets/Wifi_Circle.png")}
                  />
                </span>
                <span className="fw-600 font-white">Am name</span>
                <br />
                <span className="font-12 font-white">am dessacsasdafs</span>
              </p> */}
              {/* <p class="d-inline-block  det-amenities font-cap mb-10 mr-10">
                <span className="det-amenities-img" style={modamtimg}>
                  <img
                    style={modamtimgimg}
                    class=""
                    src={require("../../assets/Wifi_Circle.png")}
                  />
                </span>
                <span className="fw-600 font-white">Am name</span>
                <br />
                <span className="font-12 font-white">am dessacsasdafs</span>
              </p>
              <p class="d-inline-block  det-amenities font-cap mb-10 mr-10">
                <span className="det-amenities-img" style={modamtimg}>
                  <img
                    style={modamtimgimg}
                    class=""
                    src={require("../../assets/Wifi_Circle.png")}
                  />
                </span>
                <span className="fw-600 font-white">Am name</span>
                <br />
                <span className="font-12 font-white">am dessacsasdafs</span>
              </p>
              <p class="d-inline-block  det-amenities font-cap mb-10 mr-10">
                <span className="det-amenities-img" style={modamtimg}>
                  <img
                    style={modamtimgimg}
                    class=""
                    src={require("../../assets/Wifi_Circle.png")}
                  />
                </span>
                <span className="fw-600 font-white">Am name</span>
                <br />
                <span className="font-12 font-white">am dessacsasdafs</span>
              </p> */}
            </React.Fragment>
          )}
          {this.props.typeOf === "pricebreakpopup" && (
            <React.Fragment>
              <div className=" view-total-details">
                <div className="">
                  <ul>
                    <li className="">
                      <p className="fw-700 p2">
                        Date <span>Price</span>
                      </p>
                    </li>
                    {JSON.parse(localStorage.getItem("layouts")).map(
                      (layout) => (
                        <li>
                          <p className="p4">
                            {moment(layout.from_date).format("DD-MM-YYYY")}{" "}
                            <span>&#8377; {layout["d" + priceType]}</span>
                          </p>
                        </li>
                      )
                    )}
                    {/* <li>
                      <p className="p4">
                        23/07/2020 <span>&#8377; 2900</span>
                      </p>
                    </li>
                    <li>
                      <p className="p4">
                        23/07/2020 <span>&#8377; 2900</span>
                      </p>
                    </li>
                    <li>
                      <p className="p4">
                        23/07/2020 <span>&#8377; 2900</span>
                      </p>
                    </li>
                    <li>
                      <p className="p4">
                        23/07/2020 <span>&#8377; 2900</span>
                      </p>
                    </li>
                    <li>
                      <p className="p4">
                        23/07/2020 <span>&#8377; 2900</span>
                      </p>
                    </li>
                    <li>
                      <p className="p4">
                        23/07/2020 <span>&#8377; 2900</span>
                      </p>
                    </li> */}
                    <li className="">
                      <p className="fw-700 p2">
                        Subtotal{" "}
                        <span>&#8377; {localStorage.getItem("cut_price")}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
        <button style={Dialogclosebtn} onClick={this.props.onClose}>
          Close
        </button>
      </div>
    );
    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }
}

export default Dialog;
