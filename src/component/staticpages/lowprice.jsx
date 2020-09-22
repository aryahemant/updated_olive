import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staticpages.css";

class Lowprice extends Component {
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
                <h1 class="font-green mb-30 font-cap text-center">Lowest Price Guarantee</h1>
                
              </div>
            </div>
            
            </div>
          </div>
        </section>
    
      </React.Fragment>
    );
  }
}
export default Lowprice;
