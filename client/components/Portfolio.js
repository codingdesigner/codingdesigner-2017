import React from 'react';
import Header from './Header/Header';
import PortfolioNavigation from './PortfolioNavigation/PortfolioNavigation';
import PortfolioItem from './PortfolioItem/PortfolioItem';
import Footer from './Footer/Footer';
import {portfolio_items} from '../data/portfolio/portfolio_all';
import find from 'lodash/find';

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/portfolio', false, /\.(png|jpe?g|mov|mp4)$/));

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.initialPortfolio = this.initialPortfolio.bind(this);
    this.updatePortfolio = this.updatePortfolio.bind(this);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange(),
      'PortfolioItem': this.initialPortfolio()
    };
  }

  initialPortfolio() {
    if (typeof this.props.match.params.portfolioId === 'string') {
      return find(portfolio_items, {'project_id': this.props.match.params.portfolioId});
    } else {
      return portfolio_items[0];
    }
  }

  updatePortfolio(updatedPortfolioItem) {
    this.setState({'PortfolioItem': updatedPortfolioItem});
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
  }

  render() {
    return (
      <div>
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--portfolio page-content">
          <PortfolioNavigation
            portfolioItems={portfolio_items}
            allImages={allImages}
            updatePortfolio={this.updatePortfolio}
            randomizeHeader={this.randomizeHeader}/>
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
