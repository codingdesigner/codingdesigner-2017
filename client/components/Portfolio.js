import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';



class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="page--home page-content">
          <h1 className="page-title">
            Portfolio yo.
          </h1>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Portfolio;
