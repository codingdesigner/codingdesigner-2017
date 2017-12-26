import React from 'react';
import 'eq.js';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {portfolio_content} from '../data/portfolio/score.json';

const imagePath = '/assets/images/';

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};

const allImages = importAllImages(require.context('../../client/assets/images/portfolio/score', false, /\.(png|jpe?g|mov|mp4)$/));

class Portfolio extends React.Component {
  componentWillMount() {
    // this runs right before the app is rendered
    console.log(PortfolioId);
    const PortfolioId = this.props.match.params.portfolioId;
    console.log(PortfolioId);
    console.log(this.props.match);
    // console.log(PortfolioId);
  }

  piLinkShow(itemLabelLinkShow) {
    itemLabelLinkShow = JSON.parse(itemLabelLinkShow);
    if (itemLabelLinkShow === true) {
      return (
        <div className="pi--item-label--link"><a
          href={portfolio_content.pi__item_label__link}>{portfolio_content.pi__item_label__link__domain}</a></div>
      );
    }
  }

  piAboutShow(aboutShowBool) {
    aboutShowBool = JSON.parse(aboutShowBool);
    if (aboutShowBool === true) {
      return (
        <div className="pi--item-description">
          <h4 className="pi--item-label--about">About:</h4>
          <div className="pi--about" dangerouslySetInnerHTML={{__html: portfolio_content.pi__about}}/>
        </div>
      );
    }
  }

  piResponsibilities(key) {
    const item = portfolio_content.pi__responsibilities[key];

    return (
      <li key={key}>{item.item}</li>
    );
  }

  piLinkToAgency(piLinkToAgencyBool) {
    piLinkToAgencyBool = JSON.parse(piLinkToAgencyBool);
    if (piLinkToAgencyBool === true) {
      return (
        <div className="pi--agency">
          <a href={portfolio_content.pi__agency__link}>{portfolio_content.pi__agency}</a>
        </div>
      );
    } else {
      return (
        <div className="pi--agency">{portfolio_content.pi__agency}</div>
      );
    }
  }

  piImages(key) {
    const item = portfolio_content.pi__images[key];
    const classes = 'pi--image ' + item.pi__image__classes;

    if (item.pi__image__path) {
      return (
        <picture className={classes}>
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
        <Header/>
        {this.props.match.params.portfolioId}
        <div className="page--home page-content">
          <h1 className="page-title">{portfolio_content.pi__project_name}</h1>
          <div className="pi--overview">
            <div className="pi--overview--text"
                 dangerouslySetInnerHTML={{__html: portfolio_content.pi__overview__text}}/>
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
                     dangerouslySetInnerHTML={{__html: portfolio_content.pi__item_label__client}}/>
                {this.piLinkShow(portfolio_content.pi__item_label__link__show)}
                {this.piAboutShow(portfolio_content.pi__about__show)}
                <div className="pi--item-description">
                  <h4 className="pi--item-label--responsibilities">Responsibilities:</h4>
                  <ul className="pi--responsibilities">
                    {Object.keys(portfolio_content.pi__responsibilities).map(this.piResponsibilities)}
                  </ul>
                </div>
                <div className="pi--item-description">
                  <h4 className="pi--item-label--agency">Agency:</h4>
                  {this.piLinkToAgency(portfolio_content.pi__link_to_agency)}
                </div>
              </div>
            </div>
          </div>
          <div className="pi--images" data-eq-pts="small: 600, mid: 800, large: 1200">
            {Object.keys(portfolio_content.pi__images).map(this.piImages)}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Portfolio;
