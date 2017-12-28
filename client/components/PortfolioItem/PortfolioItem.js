import React from 'react';
import {portfolio_items} from "../../data/portfolio/portfolio_all";
import 'eq.js';

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};

const allImages = importAllImages(require.context('../../../client/assets/images/portfolio/score', false, /\.(png|jpe?g|mov|mp4)$/));

console.log(allImages);

class PortfolioItem extends React.Component {
  constructor(props) {
    super(props);
    this.piResponsibilities = this.piResponsibilities.bind(this);
    this.piImages = this.piImages.bind(this);
  }

  piLinkShow(portfolioItem) {
    const itemLabelLinkShow = JSON.parse(portfolioItem.pi__item_label__link__show);
    if (itemLabelLinkShow === true) {
      return (
        <div className="pi--item-label--link"><a
          href={portfolioItem.pi__item_label__link}>{portfolioItem.pi__item_label__link__domain}</a></div>
      );
    }
  }

  piAboutShow(portfolioItem) {
    const aboutShowBool = JSON.parse(portfolioItem.pi__about__show);
    if (aboutShowBool === true) {
      return (
        <div className="pi--item-description">
          <h4 className="pi--item-label--about">About:</h4>
          <div className="pi--about" dangerouslySetInnerHTML={{__html: portfolioItem.pi__about}}/>
        </div>
      );
    }
  }

  piResponsibilities(key) {
    const item = this.props.portfolioItem.pi__responsibilities[key];
    return (
      <li key={key}>{item.item}</li>
    );
  }

  piLinkToAgency(portfolioItem) {
    const piLinkToAgencyBool = JSON.parse(portfolioItem.pi__link_to_agency);
    if (piLinkToAgencyBool === true) {
      return (
        <div className="pi--agency">
          <a href={portfolioItem.pi__agency__link}>{portfolioItem.pi__agency}</a>
        </div>
      );
    } else {
      return (
        <div className="pi--agency">{portfolioItem.pi__agency}</div>
      );
    }
  }

  piImages(key) {
    const item = this.props.portfolioItem.pi__images[key];
    const classes = 'pi--image ' + item.pi__image__classes;

    if (item.pi__image__path) {
      return (
        <picture className={classes} key={key}>
          <img src={allImages[item.pi__image__path]} alt={item.pi__image__alt}/>
        </picture>
      );
    } else if (item.pi__image__mov) {
      return (
        <h1>Movie will go here.</h1>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="page--home page-content">
          <h1 className="page-title">{this.props.portfolioItem.pi__project_name}</h1>
          <div className="pi--overview">
            <div className="pi--overview--text"
                 dangerouslySetInnerHTML={{__html: this.props.portfolioItem.pi__overview__text}}/>
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
                     dangerouslySetInnerHTML={{__html: this.props.portfolioItem.pi__item_label__client}}/>
                {this.piLinkShow(this.props.portfolioItem)}
                {this.piAboutShow(this.props.portfolioItem)}
                <div className="pi--item-description">
                  <h4 className="pi--item-label--responsibilities">Responsibilities:</h4>
                  <ul className="pi--responsibilities">
                    {Object.keys(this.props.portfolioItem.pi__responsibilities).map(this.piResponsibilities)}
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
            {Object.keys(this.props.portfolioItem.pi__images).map(this.piImages)}
          </div>
        </div>
      </div>
    )
  }
}

export default PortfolioItem;
