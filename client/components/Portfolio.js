import React from 'react';
import Header from './Header/Header';
import PortfolioNavigation from './PortfolioNavigation/PortfolioNavigation';
import PortfolioItem from './PortfolioItem/PortfolioItem';
import Footer from './Footer/Footer';
import {portfolio_items} from '../data/portfolio/portfolio_all';
const _ = require('lodash');

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/portfolio', false, /\.(png|jpe?g|mov|mp4)$/));

console.log(allImages);

class Portfolio extends React.Component {

  constructor(props) {
    super(props);
    this.updatePortfolio = this.updatePortfolio.bind(this);

    if (typeof this.props.match.params.portfolioId === 'string') {
      this.state = {
        'PortfolioItem': _.find(portfolio_items, {'project_id': this.props.match.params.portfolioId})
      }
    } else {
      this.state = {
        'PortfolioItem': portfolio_items[0]
      }
    }
  }

  updatePortfolio(updatedPortfolioItem) {
    this.setState({'PortfolioItem': updatedPortfolioItem});
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="page--portfolio page-content">
          <PortfolioNavigation
            portfolioItems={portfolio_items}
            allImages={allImages}
            updatePortfolio={this.updatePortfolio}/>
          <PortfolioItem
            portfolioItem={this.state.PortfolioItem}
            allImages={allImages}/>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Portfolio;
