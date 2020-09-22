import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './blogcard.css';
// import { Route, withRouter } from "react-dom";

class Blogcard extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
           <div className="blog-card">
            <div className="blog-card-img">
              <img src={this.props.blogimg} />
            </div>
            <div className="blog-card-details">
             <p className="fw-700">{this.props.blog_title}</p>
             <a href={this.props.bloglink} className="fw-500" target="_blank">Read Now <span className="readmore_icon"><i class="fas fa-long-arrow-alt-right"></i></span></a>
            </div>
         </div>
           
            
           
           
        );
    }
};
export default Blogcard;