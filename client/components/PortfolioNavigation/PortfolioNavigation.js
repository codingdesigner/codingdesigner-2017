import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlusCircle from '@fortawesome/fontawesome-pro-light/faPlusCircle';

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
    this.props.randomizeHeader();
  }

  render() {
    return (
      <nav className="portfolio-navigation">
        <h2 className="section-title">Portfolio</h2>
        <input type="checkbox" id="nav-portfolio-trigger" className="hidden"/>
        <label htmlFor="nav-portfolio-trigger" className="nav-portfolio-trigger--label">
          <FontAwesomeIcon icon={faPlusCircle}/>
        </label>
        <ul className="pn--nav-list">
          {Object.keys(this.props.portfolioItems).map(this.navigationItems)}
        </ul>
      </nav>
    )
  }
}

PortfolioNavigation.propTypes = {
  allImages: PropTypes.object.isRequired,
  portfolioItems: PropTypes.array.isRequired,
  randomizeHeader: PropTypes.func.isRequired,
  updatePortfolio: PropTypes.func.isRequired
};

export default PortfolioNavigation;
