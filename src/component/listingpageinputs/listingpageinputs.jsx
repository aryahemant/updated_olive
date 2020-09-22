import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./listingpageinputs.css";
import { Col, Form, Button, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "antd/dist/antd.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "semantic-ui-react";
import { Badge, Icon, Slider, Switch } from "antd";
// import moment from "moment";
import $ from "jquery";
import axios from "axios";
import history from "../../lib/history";
// import { Route, withRouter } from "react-dom";
import moment from "moment";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

class Listingpageinputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      citylistval: [],
      cityName: "",
      cityId1: "",
      inputValue: 1000,
      defaultdate: new Date(),
      startDate: "",
      endDate: "",
      noGuest: "",
    };
  }

  async componentDidMount() {
    const resp = await axios.get(
      `https://www.oliveservicedapartments.com/olive_api/public/api/cities`
    );
    const value = resp.data;
    console.log("array in listinginput page", value);
    this.setState({
      cities: value,
      startDate:
        this.props.queryParam.startDate == ""
          ? ""
          : new Date(this.props.queryParam.startDate),
      endDate:
        this.props.queryParam.endDate == ""
          ? ""
          : new Date(this.props.queryParam.endDate),
      noGuest:
        this.props.queryParam.startDate == ""
          ? 1
          : parseInt(this.props.queryParam.guests),
    });
    const citylist = this.state.cities;
    console.log("a", new Date(this.props.queryParam.startDate));
    console.info("all string ", this.state.cities);
  }

  // range slider
  state = {
    disabled: false,
  };

  handleDisabledChange = (disabled) => {
    this.setState({ disabled });
  };
  // range slider end
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    plusValue: 0,
    date: [],
  };

  disabledStartDate = (startValue) => {
    const { endDate } = this.state;
    if (!startValue || !endDate) {
      return false;
    }
    return startValue.valueOf() > endDate.valueOf();
  };

  disabledEndDate = (currentDate) => {
    // const { startDate } = this.state;
    // if (!endValue || !startDate) {
    //   return false;
    // }
    // return endValue.valueOf() <= startDate.valueOf();
  };

  onStartChange = (value) => {
    this.onChange("startValue", value);
  };

  onEndChange = (value) => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  };

  onclick(type) {
    // if (type == "subs") {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) - 1,
    //   });
    //   this.props.onclick(type);
    // } else {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) + 1,
    //   });
    this.props.onclick(type);
    // }
    // this.setState((prevState) => {
    //   return {
    //     noGuest:
    //       type == "subs" && prevState.noGuest > 1
    //         ? parseInt(prevState.noGuest) - 1
    //         : type == "adds" && prevState.noGuest >= 1
    //         ? parseInt(prevState.noGuest) + 1
    //         : 1,
    //   };
    // });
    // localStorage.setItem("noGuest", this.state.noGuest);
  }
  handleChange = (date) => {
    console.log("date", date);
    this.setState({
      startDate: date,
      endDate: new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000),
    });
    this.props.handleChange(date);
  };

  handleEndDate = (dateValue) => {
    this.setState({
      endDate: dateValue,
    });
    this.props.handleEndDate(dateValue);
  };

  // handleValue = () => {
  //   {
  //     this.state.cities.map((cityId) => {
  //       let idVal;
  //       if (cityId.city_name === this.state.cityName) {
  //         this.setState({
  //           cityId1: cityId.id,
  //         });
  //         idVal = cityId.id;
  //         // this.props.handleValue(idVal);
  //         console.log(idVal);
  //       }
  //     });
  //   }
  // };

  handleOnChange = (e) => {
    console.log(e.target.value);
    var index = e.nativeEvent.target.selectedIndex;
    var text = e.nativeEvent.target[index].text;
    // localStorage.setItem("noGuest", 1);
    console.info("......", index);

    this.setState({
      cityName: text,
    });
    let cityNameVal = text;
    history.push(
      `/${text.toLocaleLowerCase()}?city=${text}&id=${
        e.target.value
      }&startDate=${
        this.state.startDate &&
        moment(this.state.startDate).format("YYYY-MM-DD")
      }&endDate=${
        this.state.endDate && moment(this.state.endDate).format("YYYY-MM-DD")
      }&guests=${this.state.noGuest}`
    );
    // this.props.handleOnChange(cityNameVal);
    // localStorage.removeItem("single");
  };

  // onChangeRange = (date, dateStrings) => {
  //   console.info("onchage date", date);
  //   this.setState({
  //     startDate: date[0],
  //     endDate: date[1],
  //   });
  //   localStorage.setItem("startDate", date[0]);
  //   localStorage.setItem("endDate", date[1]);
  //   localStorage.setItem("checkout", date[1]);
  //   console.log("From: datw ", date[0] , ", to: datw ", dateStrings[1]);
  //   console.log("Start date", localStorage.getItem("startDate"));
  //   console.log("end Date", localStorage.getItem("endDate"));
  // };

  onpriceChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  handleClickForlisting = (e) => {
    // let scroll = Scroll.animateScroll;
    // scroll.scrollTo(200);
    // history.push(
    //   `/${this.props.cityName.toLowerCase()}?city=${this.props.cityName}&id=${
    //     this.props.city_id
    //   }&startDate=${
    //     this.state.startDate &&
    //     moment(this.state.startDate).format("YYYY-MM-DD")
    //   }&endDate=${
    //     this.state.endDate && moment(this.state.endDate).format("YYYY-MM-DD")
    //   }&guests=${this.state.noGuest}`
    // );
    this.props.startDate === "" && this.datepicker.input.focus();
    this.props.handleClickForlisting(e);
    e.preventDefault();
  };

  render() {
    const { disabled } = this.state;
    // const { RangePicker } = DatePicker;
    function onChange(date, dateString) {
      console.log(date, dateString);
    }
    const dateval = new Date(this.state.startDate).setDate(
      new Date(this.state.startDate).getDate() + 1
    );
    const { startValue, endValue, endOpen } = this.state;
    console.log("date l l l l11 ", this.props.startDate);
    return (
      <Form>
        <div className="row listinginput">
          <div className="col-md-3 mob-mb-20">
            <div className="listinginput-location">
              <label>Destination</label>
              <select
                className="selectedcity"
                onChange={this.handleOnChange}
                // onClick={this.handleValue}
              >
                {/* <option>{localStorage.getItem("cityName")}</option> */}
                {this.state.cities.map((city) => {
                  return (
                    <option
                      value={city.id}
                      selected={this.props.cityName === city.city_name}
                    >
                      {city.city_name}
                    </option>
                  );
                })}
              </select>
              {/* <Dropdown
                placeholder="Location"
                fluid
                selection
                value={localStorage.getItem("cityName")}
                onChange={this.handleCityList}
                options={this.state.citylistval}
              /> */}
            </div>
          </div>
          <div className="col-md-3 mob-mb-20 datepickerbtm">
            <div className="listinginput-daterange">
              <label>Check In</label>

              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={this.state.startDate}
                onChange={this.handleChange}
                // minDate={this.state.startDate}
                minDate={new Date()}
                placeholderText="Add Dates"
                ref={(datepicker) => {
                  this.datepicker = datepicker;
                }}
              />
              <i class="far fa-calendar-alt datepicker-iconlisting"></i>
            </div>
          </div>
          <div className="col-md-3 mob-mb-20 datepickerbtm">
            <div className="listinginput-daterange">
              <label>Check Out</label>
              {/* <RangePicker
                onChange={this.onChangeRange}
                format="DD-MM-YYYY"
                defaultValue={[
                  moment(this.state.startDate && this.state.startDate),
                  moment(this.state.endDate && this.state.endDate),
                ]}
                // format="DD-MM-YYYY"
                disabledDate={(d) =>
                  !d || d.isBefore(this.state.startDate) ||
                  d.isSame(new Date(this.state.startDate).setDate(new Date(this.state.startDate).getDate() + 1))

                }
              /> */}
              <DatePicker
                placeholderText="Add Dates"
                dateFormat="dd-MM-yyyy"
                selected={this.state.endDate}
                onChange={this.handleEndDate}
                minDate={new Date(this.state.startDate).setDate(
                  new Date(this.state.startDate).getDate() + 2
                )}
              />
              <i class="far fa-calendar-alt datepicker-iconlisting"></i>

              {/* <RangePickerdate
                        defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
                        [range: string]: moment[] } | { [range: string]: () => moment[]
                        />
                         <DatePicker
          disabledDate={this.disabledStartDate}
          
          format="DD-MM-YYYY"
          value={startValue}
          placeholder="start date"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />{/* <RangePickerdate
                  
           <DatePicker
          disabledDate={this.disabledEndDate}
          
          format="DD-MM-YYYY"
          value={endValue}
          placeholder="end date"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        /> */}
            </div>
          </div>

          <div className="col-md-2 mob-mb-20">
            <label>Guest</label>
            <div className="listingpage-increment fl-100">
              <div className="listingpage-count-show">
                <input
                  type="text"
                  classname="onlyNumber form-control pull-left"
                  id="noOfRoom"
                  value={this.props.noGuest}
                  // value={localStorage.getItem("noGuest")}
                  name="noOfRoom"
                />
              </div>
              <span className="spin-btn">
                <input
                  onClick={this.onclick.bind(this, "adds")}
                  type="button"
                  value="+"
                  id="adds"
                  className=""
                />
              </span>
              <span className="spin-btn spin-btn-dec">
                <input
                  onClick={this.onclick.bind(this, "subs")}
                  type="button"
                  value="-"
                  id="subs"
                  className=""
                />
              </span>
            </div>
          </div>

          <div className="col-md-1  ">
            <div className="initialinput-search-btn">
              <Button
                onClick={this.handleClickForlisting}
                variant=""
                type="submit"
              >
                <i class="fas fa-search"></i>
              </Button>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}
export default Listingpageinputs;
