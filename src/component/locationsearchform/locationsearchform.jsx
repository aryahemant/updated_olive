import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./locationsearchform.css";
import { Col, Form, Button, FormControl } from "react-bootstrap";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import history from "../../lib/history";

// import { Route, withRouter } from "react-dom";

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
    //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' },
  },
  {
    key: "Noida",
    text: "Noida",
    value: "Noida",
    //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg' },
  },
  {
    key: "kolkata",
    text: "kolkata",
    value: "kolkata",
    //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg' },
  },
  {
    key: "Hyderabad",
    text: "Hyderabad",
    value: "Hyderabad",
    //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg' },
  },
  {
    key: "Banglore",
    text: "Banglore",
    value: "Banglore",
    //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg' },
  },
];

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Locationsearchform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: moment(new Date()).add(3, "d").toDate(),
      cities: [],
      cityName: "",
      cityId1: "",
      selected: null,
    };
  }

  async componentDidMount() {
    const resp = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    );
    const value = resp.data;
    console.log("by homepage", value);
    localStorage.setItem("cities", resp.data);
    this.setState({
      cities: resp.data,
    });
    localStorage.setItem("cities", JSON.stringify(this.state.cities));
    // localStorage.setItem("cityId", JSON.stringify(this.state.cities));
    localStorage.setItem("startDate", this.state.startDate);
    localStorage.setItem("endDate", this.state.endDate);
    localStorage.setItem("checkout", this.state.endDate);
    localStorage.setItem("noGuest", 1);
    let selected = localStorage.getItem("cityName");
    this.setState({ selected: selected });
  }
  // state = {
  //     startDate: new Date()
  //   };

  //   handleChange = date => {
  //     this.setState({
  //       startDate: date
  //     });
  //   };
  handleChange = (date, dateString) => {
    this.setState({
      startDate: date,
      endDate: moment(date).add(3, "d").toDate(),
    });
    localStorage.setItem("startDate", date);
    localStorage.setItem("endDate", moment(date).add(3, "d").toDate());
  };
  handleEndDate = (date, dateString) => {
    this.setState({
      endDate: date,
    });
    localStorage.setItem("endDate", date);
  };
  handleValue = () => {
    {
      this.state.cities.map((cityId) => {
        if (cityId.city_name === this.state.cityName) {
          this.setState({
            cityId1: cityId.id,
          });
          let idVal = cityId.id;
          // this.props.handleValue(idVal);
          console.log(idVal);
          localStorage.setItem("cityid", idVal);
        }
      });
    }
  };

  handleOnChange = (e) => {
    // console.log(e.target.value);
    var index = e.nativeEvent.target.selectedIndex;
    var text = e.nativeEvent.target[index].text;
    localStorage.setItem("cityName", text);
    localStorage.setItem("cityid", e.target.value);

    // localStorage.setItem("noGuest", 1);
    // console.info(text);

    this.setState({
      cityName: text,
    });
    let cityNameVal = text;
    // this.props.handleOnChange(cityNameVal);
  };

  render() {
    return (
      <Form>
        <div className="container mobview">
          <div className="row">
            <div className="col-12 location_drop ">
              {/* <Dropdown
                    placeholder='Location'
                    fluid
                    selection
                    options={LocationOptions}
                  /> */}
              <div className="listinginput-location">
                {/* <select
                    className="selectedcity"
                    onChange={this.handleOnChange}
                    onClick={this.handleValue}
                    >
                    {this.state.cities.map((city) => {
                      return (
                        <option
                          value={city.id}
                        >
                          {city.city_name}
                        </option>
                      );
                    })}
                  </select> */}
                <Form.Control
                  required
                  as="select"
                  value={this.state.selected}
                  onChange={this.handleOnChange}
                  onClick={this.handleValue}
                >
                  <option>Location</option>
                  {this.state.cities.map((city) => {
                    return <option value={city.id}>{city.city_name}</option>;
                  })}
                </Form.Control>
              </div>
            </div>
            <div className="col-6 pad-r-7">
              <div className="mob-start-date startdate">
                <DatePicker
                  format="DD-MM-YYYY"
                  defaultValue={moment(this.state.startDate)}
                  onChange={this.handleChange}
                  disabledDate={(d) => !d || d.isBefore(this.state.startDate)}
                />
                {/* <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}/>
                            <i class="far fa-calendar-alt datepicker-icon"></i> */}
              </div>
            </div>
            <div className="col-6 pad-l-7">
              <div className="mob-start-date enddate">
                <DatePicker
                  format="DD-MM-YYYY"
                  value={moment(this.state.endDate)}
                  onChange={this.handleEndDate}
                  disabledDate={(d) => !d || d.isBefore(this.state.endDate)}
                />

                {/* <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}/>
                                <i class="far fa-calendar-alt datepicker-icon"></i> */}
              </div>
            </div>
            <div className="col-12 location_drop ">
              <div className="header-form-submit-btn bor-rad">
                <Button
                  variant=""
                  type="submit"
                  onClick={() =>
                    history.push(
                      `/${localStorage.getItem("cityName").toLowerCase()}`
                    )
                  }
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}
export default Locationsearchform;
