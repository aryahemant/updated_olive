import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './mobmenu.css';
import {Navbar,Nav,NavDropdown,Button,Form,FormControl} from 'react-bootstrap';
// import { Route, withRouter } from "react-dom";
import {render} from "react-dom";


class Mobmenu extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
            
                <div className="bottom-menu fl-100 text-center pad-10 mobview">
                  <ul className="bottom-menu-icon">
                            <li><a href="/"><i class="fa fa-home " aria-hidden="true"></i></a></li>
                            <li><a href="/login"><i class="fa fa-user" aria-hidden="true"></i></a></li>
                            <li><a href="/register"><i class="fa fa-edit" aria-hidden="true"></i></a></li>
                            {/* <li><a href="#"><i class="fa fa-power-off" aria-hidden="true"></i></a></li> */}
                            
                        </ul>
                </div>
          
            
           
          
          

        );
    }
};
export default Mobmenu;
