import React from 'react';
import Header from './Header/Header';
import PortfolioNavigation from './PortfolioNavigation/PortfolioNavigation';
import PortfolioItem from './PortfolioItem/PortfolioItem';
import Footer from './Footer/Footer';
import {portfolio_items} from '../data/portfolio';
import find from 'lodash/find';
const randomHeader = require('./Header/randomHeader');
import CustomProperties from 'react-custom-properties';

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

    this.state = {
      'randomPhotoObject': {},
      'PortfolioItem': this.initialPortfolio()
    };
  }

  componentWillMount() {
    randomHeader.randomizeHeader(this);
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

  render() {
    const headerStyles = {
      '--header-image': 'url(' + this.state.randomPhotoObject.image + ')',
      '--header-color': this.state.randomPhotoObject.color,
      '--header-background-color': this.state.randomPhotoObject.backgroundColor,
      '--header-blend': this.state.randomPhotoObject.blend,
      '--header-link-color': this.state.randomPhotoObject.linkColor
    };

    return (
      <CustomProperties className="full-page" properties={headerStyles} >
      <div className="full-page">
        <Header randomizeHeader={() => randomHeader.randomizeHeader(this)}/>
        <div className="page--portfolio page-content">
          <PortfolioNavigation
            portfolioItems={portfolio_items}
            allImages={allImages}
            updatePortfolio={this.updatePortfolio}
            randomizeHeader={() => randomHeader.randomizeHeader(this)}/>
          <PortfolioItem
            portfolioItem={this.state.PortfolioItem}
            allImages={allImages}/>
        </div>
        <Footer/>
      </div>
      </CustomProperties>
    )
  }
}

export default Portfolio;
