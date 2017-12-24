import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';



class Portfolio extends React.Component {
  // componentWillMount() {
  //   // this runs right before the app is rendered
  //   const PortfolioId = this.props.match.params.portfolioId;
  //   console.log('yer mom');
  //   console.log(PortfolioId);
  //
  //   import {Content} from '../data/portfolio/{PortfolioId}.json';
  // }

  render() {
    return (
      <div>
        <Header/>
        <div className="page--home page-content">
          <h1 className="page-title">
            Portfolio, yo.
          </h1>
          {this.props.match.params.portfolioId}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Portfolio;
