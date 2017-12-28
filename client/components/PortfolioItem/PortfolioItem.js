import React from 'react';
import {Player} from 'video-react';
import {portfolio_items} from '../../data/portfolio/portfolio_all';
import 'eq.js';
import PropTypes from 'prop-types';

class PortfolioItem extends React.Component {
  constructor(props) {
    super(props);
    this.piResponsibilities = this.piResponsibilities.bind(this);
    this.piImages = this.piImages.bind(this);
  }

  piLinkShow(portfolioItem) {
    const itemLabelLinkShow = JSON.parse(portfolioItem.item_label__link__show);

    if (itemLabelLinkShow === true) {
      return (
        <div className="pi--item-label--link"><a
          href={portfolioItem.item_label__link}>{portfolioItem.item_label__link__domain}</a></div>
      );
    }
  }

  piAboutShow(portfolioItem) {
    const aboutShowBool = JSON.parse(portfolioItem.about__show);

    if (aboutShowBool === true) {
      return (
        <div className="pi--item-description">
          <h4 className="pi--item-label--about">About:</h4>
          <div className="pi--about" dangerouslySetInnerHTML={{__html: portfolioItem.about}}/>
        </div>
      );
    }
  }

  piResponsibilities(key) {
    const item = this.props.portfolioItem.responsibilities[key];
    return (
      <li key={key}>{item.item}</li>
    );
  }

  piLinkToAgency(portfolioItem) {
    const piLinkToAgencyBool = JSON.parse(portfolioItem.link_to_agency);

    if (piLinkToAgencyBool === true) {
      return (
        <div className="pi--agency">
          <a href={portfolioItem.agency__link}>{portfolioItem.agency}</a>
        </div>
      );
    } else {
      return (
        <div className="pi--agency">{portfolioItem.agency}</div>
      );
    }
  }

  piImages(key) {
    const item = this.props.portfolioItem.images[key];
    const classes = 'pi--image ' + item.image__classes;

    if (item.image__path) {
      return (
        <picture className={classes} key={key}>
          <img src={this.props.allImages[item.image__path]} alt={item.image__alt}/>
        </picture>
      );
    } else if (item.image__mov) {
      return (
        <Player
          playsInline
          loop
          width={1400}
          autoPlay={true}
          src={this.props.allImages[item.image__mov]}
          key={key}
        />
      )
    }
  }

  render() {
    return (
      <div className="portfolio-item_pi page-content">
        <h1 className="page-title">{this.props.portfolioItem.project_name}</h1>
        <div className="pi--overview">
          <div className="pi--overview--text"
               dangerouslySetInnerHTML={{__html: this.props.portfolioItem.overview__text}}/>
        </div>
        <div className="pi--details">
          <input type="checkbox" className="pi--details--trigger hidden" id="pi--details--trigger--score"/>
          <label htmlFor="pi--details--trigger--score" className="pi--details--trigger-label">What I did</label>
          <div className="pi--details--offside">
            <label htmlFor="pi--details--trigger--score" className="pi--details--trigger-label--close">X</label>
            <h3 className="pi--details--title">What I did</h3>
            <div className="pi--item-description">
              <h4 className="pi--item-label--client">Client:</h4>
              <div className="pi--client"
                   dangerouslySetInnerHTML={{__html: this.props.portfolioItem.item_label__client}}/>
              {this.piLinkShow(this.props.portfolioItem)}
              {this.piAboutShow(this.props.portfolioItem)}
              <div className="pi--item-description">
                <h4 className="pi--item-label--responsibilities">Responsibilities:</h4>
                <ul className="pi--responsibilities">
                  {Object.keys(this.props.portfolioItem.responsibilities).map(this.piResponsibilities)}
                </ul>
              </div>
              <div className="pi--item-description">
                <h4 className="pi--item-label--agency">Agency:</h4>
                {this.piLinkToAgency(this.props.portfolioItem)}
              </div>
            </div>
          </div>
        </div>
        <div className="pi--images" data-eq-pts="small: 600, mid: 800, large: 1200">
          {Object.keys(this.props.portfolioItem.images).map(this.piImages)}
        </div>
      </div>
    )
  }
}

PortfolioItem.propTypes = {
  allImages: PropTypes.object.isRequired,
  portfolioItem: PropTypes.object.isRequired
};

export default PortfolioItem;