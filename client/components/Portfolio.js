import React from 'react';
import Header from './Header/Header';
import PortfolioItem from './PortfolioItem/PortfolioItem';
import Footer from './Footer/Footer';
import {portfolio_items} from '../data/portfolio/portfolio_all';
const _ = require('lodash');

class Portfolio extends React.Component {

  constructor(props) {
    super(props);

    if (typeof this.props.match.params.portfolioId === 'string') {
      this.PortfolioItem = _.find(portfolio_items, {'project_id': this.props.match.params.portfolioId});
    } else {
      this.PortfolioItem = portfolio_items[0];
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <PortfolioItem portfolioItem={this.PortfolioItem}/>
        <Footer/>
      </div>
    )
  }
}

export default Portfolio;
