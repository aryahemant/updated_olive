import React, { Component } from "react";
import "./style.scss";
import { Route, withRouter } from "react-router-dom";
import Apartmentlisting from "./apartmentlisting";
import ApartmentDetailPage from "../ApartmentDetailPage/ApartmentDetailPage";
import GlobalSales from "./GlobalSales";
import ProductDetail from "../ProductDetail";
class Index extends Component {
  componentDidMount() {
    // axios.get(`/be/products/getAll.json`).then(res => {
    //     console.log('result', res.data)
    // })
  }
  render() {
    return (
      <div>
        <Route
          exact
          path={`/listing`}
          component={Apartmentlisting}
        /> 
        
       
      </div>
    );
  }
}
export default withRouter(Index);