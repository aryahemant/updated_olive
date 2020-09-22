import React from 'react';
import Header from './component/header/header';
import Footer from './component/footer/footer';
import Mobmenu from './component/mobmenu/mobmenu';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'circular-std';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Footer />
        <div className="fl-100 empty-55 mobview"></div>
        <Mobmenu />
      </React.Fragment>

    );

  }
}


export default App;
