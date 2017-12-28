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
        <div className="page--portfolio page-content">
          <nav className="portfolio-navigation">
            <h2 className="section-title">Portfolio</h2>
            <ul className="pn--nav-list">
              <li className="pn--nav-list-item">
                <a href="03-pages-01-portfolio-item.html" class="pn--nav-list-item--link">
                  <div className="pn--nav-list-item--image"/>
                  <div className="pn--nav-list-item--name">SCORE</div>
                </a>
              </li>
            </ul>
          </nav>
          <PortfolioItem portfolioItem={this.PortfolioItem}/>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Portfolio;
