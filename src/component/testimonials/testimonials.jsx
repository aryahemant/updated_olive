import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './testimonials.css';
import Carousel from 'react-bootstrap/Carousel'
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Route, withRouter } from "react-dom";


class Testimonials extends Component {
    componentDidMount(
        
    ) {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        
        return(
          
                <Carousel indicators={false}>
  <Carousel.Item>
       <div className="row">
          <div className="col-md-6 pad-r-0">
          <div className="testimonial-text">
             
              <div className="vt-align contentbox">
        
              <p className="testimonial-desc">
              We saw a lot of apartments before finally choosing Olive as it had a complete
               kitchen which was very important for us, besides offering complete privacy without any nosy landlords. 
               The terrace was a bonus and they were kind enough to provide us with a couple of yoga mats we all. Special mention for Raju who is an 
               absolute gem and knows the true meaning of hospitality.									
                </p>
                <p className="fw-700 testimonial-name mb-10">Tara Sharma</p>
                <p className="testimonial-city">London</p>
              </div>
              
             </div>
             
          </div>
            <div className="col-md-6 pad-l-0 deskview ">
                <div className="testimonial-img fl-100">
                    <img  className="d-block w-100"  src={require('../../assets/Testimonials_1.jpg')} alt="First slide"/>
                </div>
             </div>
      </div>
    </Carousel.Item>
  <Carousel.Item>
  <div className="row">
      <div className="col-md-6 pad-r-0">
             <div className="testimonial-text">
              <div className="vt-align contentbox">
              <p className="testimonial-desc">
               
									We had wonderful experience there. It has the best service. We stayed there for 15 days and we had a comfortable stay.
                                     The apartments there are clean. There are different sizes of apartments. We stayed in 1BHK and 3BHK both and they 
                                     both had attached kitchen with good quality utensils.									
                </p>
                <p className="fw-700 testimonial-name mb-10">Soumya Kapoor </p>
                <p className="testimonial-city">Mumbai</p>
              </div>
              
             </div>
             
            </div>
            <div className="col-md-6 pad-l-0 deskview ">
                <div className="testimonial-img">
                    <img  className="d-block w-100"  src={require('../../assets/Testimonials_1.jpg')} alt="First slide"/>
                </div>
             </div>
      </div>
  </Carousel.Item>
  <Carousel.Item>
  <div className="row">
      <div className="col-md-6 pad-r-0">
             <div className="testimonial-text">
              <div className="vt-align contentbox">
              <p className="testimonial-desc">
               
									Had a most wonderful stay at the Greater Kailash apartments. We spent 3 weeks in Delhi and the apartment was our 
                                    base to travel across North India. The Olive team made us feel right at home and even arranged rental cars for our travel to Agra, Jaipur 
                                    & Shimla. Thank you for making it a memorable vacation.																		
                </p>
                <p className="fw-700 testimonial-name mb-10">Connor Williams </p>
                <p className="testimonial-city">Dubai</p>
              </div>
              
             </div>
             
            </div>
            <div className="col-md-6 pad-l-0 deskview ">
                <div className="testimonial-img">
                    <img  className="d-block w-100"  src={require('../../assets/Testimonials_1.jpg')} alt="First slide"/>
                </div>
             </div>
      </div>
  </Carousel.Item>
</Carousel>
           
         
           
            
           
           
        );
    }
};
export default Testimonials;