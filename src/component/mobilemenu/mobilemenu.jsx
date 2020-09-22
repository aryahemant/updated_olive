import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mobilemenu.css';
import {Navbar,Nav,NavDropdown,Button,Form,FormControl} from 'react-bootstrap';
// import { Route, withRouter } from "react-dom";
import {render} from "react-dom";


class Mobilemenu extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
            <Navbar expand="lg">
            <Navbar.Brand href="#home"><img className="brand-logo" src={require('../../assets/olive-logo.png')} /> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto navigation">
              <NavDropdown title="Cities" id="basic-nav-dropdown ">
                  <NavDropdown.Item href="#action/3.1">Delhi</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Noida</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Gurugram</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Seperate apartment</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#"><img className="nav-icon" src={require('../../assets/Call.png')} /> 9015080080</Nav.Link>
                
                
                <Nav.Link href="#home">Register</Nav.Link>
                <Nav.Link href="#link " className="login-btn">Login</Nav.Link>
                
              </Nav>
              {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Navbar.Collapse>
          </Navbar>
          
          

        );
    }
};
export default Mobilemenu;
