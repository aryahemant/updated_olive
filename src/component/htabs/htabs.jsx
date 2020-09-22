import React, {Component, Children} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './htabs.css';
import Carousel from 'react-bootstrap/Carousel'
import { Tabs } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Route, withRouter } from "react-dom";
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
class Htabs extends Component {
    componentDidMount() {
      // axios.get(`/be/products/getAll.json`).then(res => {
      //     console.log('result', res.data)
      // })
    }

    render(){
        return(
         <div>
             <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={this.props.tab1} key="1">{this.props.children}</TabPane>
                <TabPane tab={this.props.tab2} key="2">{this.props.children}</TabPane>
           </Tabs>
         </div>
        );
    }
};
export default Htabs;