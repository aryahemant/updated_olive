import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detailsearch.css";
import { Col, Form, Button, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "antd/dist/antd.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Dropdown } from "semantic-ui-react";
// import { DatePicker, Badge, Icon, Slider, Switch } from "antd";
import moment from "moment";
import $ from "jquery";
import history from "../../lib/history";
import * as Scroll from "react-scroll";
// import DatePicker from "react-datepicker";
// import { Route, withRouter } from "react-dom";
import swal from "sweetalert";

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

class Detailsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noGuest: "",
      startDate: "",
      endDate: "",
      defaultdate: new Date(),
    };
  }

  componentDidMount() {
    console.log("new date", this.props.queryParam.guests);

    // this.setState({
    //   startDate:
    //     queryParam.startDate == "" || new Date(queryParam.startDate).valueOf() < new Date().valueOf()
    //       ? ""
    //       : new Date(queryParam.startDate),
    //   endDate:
    //     queryParam.endDate == "" || new Date(queryParam.endDate).valueOf() < new Date().valueOf()
    //       ? ""
    //       : new Date(queryParam.endDate),
    //   noGuest: queryParam.guests,
    // })
    this.setState({
      startDate:
        window.location.href.indexOf("?" + "city" + "=") == -1 ||
        this.props.queryParam.startDate == "" ||
        new Date(this.props.queryParam.startDate).valueOf() <
          new Date().valueOf()
          ? ""
          : new Date(this.props.queryParam.startDate),
      endDate:
        window.location.href.indexOf("?" + "city" + "=") == -1 ||
        this.props.queryParam.endDate == "" ||
        new Date(this.props.queryParam.startDate).valueOf() <
          new Date().valueOf()
          ? ""
          : new Date(this.props.queryParam.endDate),
      noGuest:
        this.props.queryParam.guests == undefined
          ? 1
          : parseInt(this.props.queryParam.guests),
    });
    window.scrollTo(0, 0);
    // increment btn
    //   $('#adds').click(function add() {
    //     var $rooms = $("#noOfRoom");
    //     var a = $rooms.val();
    //     a++;
    //     $("#subs").prop("disabled", !a);
    //     $rooms.val(a);
    // });
    // $("#subs").prop("disabled", !$("#noOfRoom").val());
    // $('#subs').click(function subst() {
    //     var $rooms = $("#noOfRoom");
    //     var b = $rooms.val();
    //     if (b >= 1) {
    //         b--;
    //         $rooms.val(b);
    //     }
    //     else {
    //         $("#subs").prop("disabled", true);
    //     }
    // });
    // incremen btn end
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
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
  };

  disabledStartDate = (startValue) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
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

  onChangeRange = (date, dateStrings) => {
    this.setState({
      startDate: date[0],
      endDate: date[1],
    });
  };

  onclick(type) {
    // if (this.state.startDate == "" && this.state.startDate == "") {
    //   swal(`Please Select Date first `, {
    //     icon: "info",
    //   });
    //   return false;
    // }
    // this.setState((prevState) => {
    //   return {
    //     noGuest:
    //       type == "subs" && prevState.noGuest > 1
    //         ? prevState.noGuest - 1
    //         : type == "adds" && prevState.noGuest >= 1
    //         ? prevState.noGuest + 1
    //         : 1,
    //   };
    // });
    if (this.state.startDate == "" && this.state.startDate == "") {
      swal(`Please Select Date first `, {
        icon: "info",
      });
      return false;
    }
    // if (type == "subs") {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) - 1,
    //   });
    // } else {
    //   this.setState({
    //     noGuest: parseInt(this.state.noGuest) + 1,
    //   });
    // }

    this.props.onclick(type);
  }
  // handleDetailSearch = () => {
  //   let scroll = Scroll.animateScroll;
  //   scroll.scrollTo(600);
  //   history.push(
  //     `/${this.props.cityName.toLowerCase()}/${this.props.slug}?city=${
  //       this.props.cityName
  //     }&id=${this.props.city_id}&startDate=${moment(
  //       this.state.startDate
  //     ).format("YYYY-MM-DD")}&endDate=${moment(this.state.endDate).format(
  //       "YYYY-MM-DD"
  //     )}&guests=${this.state.noGuest}`
  //   );
  // };

  handleChange = (date) => {
    this.setState({
      startDate: date,
      endDate: "",
    });
    this.props.handleChange(date);
  };

  handleEndDate = (dateValue) => {
    this.setState({
      endDate: dateValue,
    });
    this.props.handleEndDate(dateValue);
  };

  render() {
    console.log("guest", this.state.noGuest);
    const { disabled } = this.state;
    const { RangePicker } = DatePicker;

    function onChange(date, dateString) {
      console.log(date, dateString);
    }
    const { startValue, endValue, endOpen } = this.state;
    return (
      <Form>
        <div className="row listinginput apartment-detail-search">
          <div className="col-md-3 mob-mb-20 datepickerbtm">
            <div className="listinginput-daterange">
              <label>Check In</label>

              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={this.state.startDate}
                onChange={this.handleChange}
                // minDate={this.state.startDate}
                minDate={new Date()}
                // onDayMouseEnter={this.props.showNoDays}
              />
              <i class="far fa-calendar-alt datepicker-iconlisting"></i>
            </div>
          </div>
          <div className="col-md-3 mob-mb-20 datepickerbtm">
            <div className="listinginput-daterange">
              <label>Check Out</label>

              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={this.state.endDate}
                onChange={this.handleEndDate}
                minDate={new Date(this.state.startDate).setDate(
                  new Date(this.state.startDate).getDate() + 2
                )}
                onDayMouseEnter={this.props.showNoDays}
                onCalendarClose={this.props.show}
              />
              <i class="far fa-calendar-alt datepicker-iconlisting"></i>
            </div>
          </div>
          {/* <div className="col-md-6 mob-mb-20 apt-det-search-dt-pic">
            <div className="listinginput-daterange">
              <label>Dates</label>
              <RangePicker
                format="DD-MM-YYYY"
                defaultValue={[
                  moment(localStorage.getItem("startDate")),
                  moment(localStorage.getItem("endDate")),
                ]}
                onChange={this.onChangeRange}
                disabledDate={(d) =>
                  !d ||
                  d.isBefore(localStorage.getItem("disablebefore")) ||
                  d.isSame(
                    new Date(localStorage.getItem("startDate")).setDate(
                      new Date(localStorage.getItem("startDate")).getDate() + 1
                    )
                  )
                }
              />
              
            </div>
          </div> */}
          <div className="col-md-4 mob-mb-20">
            <label>Guests</label>
            <div className="listingpage-increment fl-100">
              <div className="listingpage-count-show">
                <input
                  type="text"
                  classname="onlyNumber form-control pull-left"
                  id="noOfRoom"
                  value={this.props.noGuest}
                  name="noOfRoom"
                />
              </div>
              <span className="spin-btn">
                <input
                  type="button"
                  value="+"
                  id="adds"
                  className=""
                  onClick={this.onclick.bind(this, "adds")}
                />
              </span>
              <span className="spin-btn spin-btn-dec">
                <input
                  type="button"
                  value="-"
                  id="subs"
                  className=""
                  onClick={this.onclick.bind(this, "subs")}
                />
              </span>
            </div>
          </div>
          <div className="col-md-2">
            {this.props.no_days>=0 && (
              <React.Fragment>
                <span>Days</span>
                <h3 class="font-green"> {this.props.no_days}</h3>
              </React.Fragment>
            )}
          </div>
          {/* <div className="col-md-2 mob-mb-20 ">
            <div className="initialinput-search-btn">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.props.handleDetailSearch();
                }}
                variant=""
                type="submit"
              >
                <i class="fas fa-search"></i>
              </Button>
            </div>
          </div> */}
        </div>
      </Form>
    );
  }
}
export default Detailsearch;
