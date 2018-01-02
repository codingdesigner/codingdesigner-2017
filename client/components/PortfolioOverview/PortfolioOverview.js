// @todo wire up links to portfolio items once portfolio pages are built

import React from 'react';
import {Link} from 'react-router-dom';
import {portfolio_overview__items} from '../../data/portfolioOverview';

class PortfolioOverview extends React.Component {
  constructor() {
    super();
    this.PortfolioOverviewItem = this.PortfolioOverviewItem.bind(this);
  }

  PortfolioOverviewItem(key) {
    const overviewItem = portfolio_overview__items[key];
    const overviewItemImageLinkClass = "po-item--link " + overviewItem.class;

    return (
      <div className="portfolio-overview--item" key={key}>
        <h3 className="po-item--name"><a href="">{overviewItem.item_name}</a></h3>
        <Link to="/" className="portfolio--view-full-item">View full portfolio item</Link>
        <Link to="/" className={overviewItemImageLinkClass} />
      </div>
    )
  }

  render() {
    return (
      <div className="portfolio-overview">
        <h2 className="section-title"><a href="">Portfolio</a></h2>
        { Object.keys(portfolio_overview__items).map(this.PortfolioOverviewItem) }
        <div className="portfolio--view-all">
          <Link to="/">View full portfolio</Link>
        </div>
      </div>
    )
  }
}

export default PortfolioOverview;
