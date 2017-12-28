import React from 'react';
import {Link} from 'react-router-dom';

class PortfolioNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.navigationItems = this.navigationItems.bind(this);
    this.handlePortfolioItemChange = this.handlePortfolioItemChange.bind(this);
  }

  navigationItems(key) {
    const item = this.props.portfolioItems[key];
    const path = '/portfolio/' + item.project_id;

    return (
      <li className="pn--nav-list-item" key={key}>
        <Link to={path} className="pn--nav-list-item--link" onClick={(e) => this.handlePortfolioItemChange(e, key)}>
          <div className="pn--nav-list-item--image">
            <img src={this.props.allImages[item.thumbnail_image]} alt={item.project_name}/>
          </div>
          <div className="pn--nav-list-item--name">{item.project_name_short}</div>
        </Link>
      </li>
    );
  }

  handlePortfolioItemChange(e, key) {
    const updatedPortfolioItem = this.props.portfolioItems[key];
    this.props.updatePortfolio(updatedPortfolioItem);
  }

  render() {
    return (
      <nav className="portfolio-navigation">
        <h2 className="section-title">Portfolio</h2>
        <ul className="pn--nav-list">
          {Object.keys(this.props.portfolioItems).map(this.navigationItems)}
        </ul>
      </nav>
    )
  }
}

export default PortfolioNavigation;
