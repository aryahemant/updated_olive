import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./headersearch.css";
import { Col, Form, Button, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import moment from "moment";

class Headersearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      cities: [],
      cityName: "",
      cityId1: "",
    };
    this.selectRef = React.createRef();
  }

  async componentDidMount() {
    // const resp = await axios.get(
    //   `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    // );
    // const value = resp.data;
    // console.log("by homepage", value);
    // // localStorage.setItem("cities", resp.data);
    // this.setState({
    //   cities: resp.data,
    // });
    // localStorage.setItem("cities", JSON.stringify(this.state.cities));
    // localStorage.setItem("cityId", JSON.stringify(this.state.cities));
    // localStorage.setItem("startDate", this.state.startDate);
    // localStorage.setItem("endDate", this.state.endDate);
    // localStorage.setItem("checkout", this.state.endDate);
    // localStorage.setItem("disablebefore", this.state.startDate);
    // localStorage.setItem("noGuest", 1);
    // let selected = localStorage.getItem("cityName");
    // this.setState({ selected: selected });
    this.handleLocalStorage();
  }

  handleLocalStorage = () => {
    var hours = 1 / 60; // Reset when storage is more than 24hours
    var now = new Date().getTime();
    var setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem("setupTime", now);
      }
    }
  };
  handleClick = (e) => {
    this.props.startDate == "" && this.datepicker.input.focus();
    // this.props.cityName === "" &&
    // this.selectRef.current.focus()
    e.preventDefault();
    this.props.handleClick();
  };

  render() {
    return (
      <Form>
        <div className="row pad-l-r-20">
          <div className="col-md-4 header-form-box">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>location</Form.Label>
              <Form.Control
                required
                as="select"
                value={this.props.selected}
                onChange={this.props.handleOnChange}
                onClick={this.props.handleValue}
                ref={this.selectRef}
              >
                <option>Location</option>
                {this.props.cities.map((city) => {
                  return <option value={city.id}>{city.city_name}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-3 header-form-box">
            <p className="header-form-lable">Check in</p>
            <div className="header-form-datepick">
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={this.props.startDate}
                onChange={this.props.handleChange}
                minDate={new Date()}
                placeholderText="Add Dates"
                ref={(datepicker) => {
                  this.datepicker = datepicker;
                }}
              />
              <i class="far fa-calendar-alt datepicker-icon"></i>
            </div>
          </div>
          <div className="col-md-3 header-form-box">
            <p className="header-form-lable">Check Out</p>
            <div className="header-form-datepick">
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={this.props.endDate}
                onChange={this.props.handleEndDate}
                minDate={new Date(this.props.startDate).setDate(
                  new Date(this.props.startDate).getDate() + 2
                )}
                placeholderText="Add Dates"
              />
              <i class="far fa-calendar-alt datepicker-icon"></i>
            </div>
          </div>

          <div className="col-md-1 header-form-submit">
            <div className="header-form-submit-btn">
              <Button onClick={this.handleClick} variant="" type="submit">
                <i class="fas fa-search"></i>
              </Button>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}
export default Headersearch;
