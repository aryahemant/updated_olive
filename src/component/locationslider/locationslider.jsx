import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './locationslider.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// import { Route, withRouter } from "react-dom";

const options = {
    items: 1,
};
class Locationslider extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
           <div>
            <OwlCarousel
    className="owl-theme"
    loop={true}
    margin={10}
    nav
>
     {/* <div class="item"><img className="caroimg" src={require('../../assets/list-block-bg.jpg')} /></div> */}
     {/* <div class="item"><img src={require('../../assets/list-block-bg.jpg')}/></div> */}
     {/* <div class="item"><img src={require('../../assets/list-block-bg.jpg')} /></div> */}
     <div class="item"><img src={require('../../assets/list-block-bg.jpg')} /></div>
           <div class="item"><img src={require('../../assets/list-block-bg.jpg')} /></div>
</OwlCarousel>
           </div>
        );
    }
};
export default Locationslider;