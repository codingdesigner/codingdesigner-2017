import React from 'react';
import LazyLoad from 'react-lazyload';
import {Player} from 'video-react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlusCircle from '@fortawesome/fontawesome-pro-light/faPlusCircle';
import faBookmark from '@fortawesome/fontawesome-pro-solid/faBookmark';
import faPaintBrush from '@fortawesome/fontawesome-pro-solid/faPaintBrush';
import faCode from '@fortawesome/fontawesome-pro-solid/faCode';
import faMicrophoneAlt from '@fortawesome/fontawesome-pro-solid/faMicrophoneAlt';
import faPencilAlt from '@fortawesome/fontawesome-pro-solid/faPencilAlt';
import faSass from '@fortawesome/fontawesome-free-brands/faSass';

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
    let icon = '';

    // if (item.icon == "faPaintBrush") {
    //   icon = faPaintBrush
    // }

    console.log(item.icon);

    switch (item.icon) {
      case 'faPaintBrush':
        icon = faPaintBrush;
        break;
      case 'faCode':
        icon = faCode;
        break;
      case 'faMicrophoneAlt':
        icon = faMicrophoneAlt;
        break;
      case 'faPencilAlt':
        icon = faPencilAlt;
        break;
      case 'faSass':
        icon = faSass;
        break;
    }
    return (
      <li className="responsibility-item" key={key}>
        <div className="fa-layers fa-fw responsibility-icon">
          <FontAwesomeIcon icon={faBookmark} className="responsibility-icon--bg fa-3x"/>
          <FontAwesomeIcon icon={icon} className="responsibility-icon--fg fa-inverse" style={{color: 'white'}}/>

        </div>
        <span className="responsibility-text">{item.item}</span>
      </li>
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
        <LazyLoad height={400} offset={100} key={key}>
          <picture className={classes} key={key}>
            <img src={this.props.allImages[item.image__path]} alt={item.image__alt}/>
          </picture>
        </LazyLoad>
      );
    } else if (item.image__mov) {
      return (
        <LazyLoad height={400} offset={100} key={key}>
          <Player
            className="pi--image--full"
            playsInline
            loop
            width={1400}
            autoPlay={true}
            src={this.props.allImages[item.image__mov]}
            key={key}
          />
        </LazyLoad>
      )
    }
  }

  render() {
    return (
      <div className="portfolio-item-pi page-content">
        <h1 className="page-title">{this.props.portfolioItem.project_name}</h1>
        <div className="pi--overview">
          <div className="pi--overview--text"
               dangerouslySetInnerHTML={{__html: this.props.portfolioItem.overview__text}}/>
        </div>
        <div className="pi--content">
          <div className="pi--details">
            {/*<input type="checkbox" className="pi--details--trigger hidden" id="pi--details--trigger--score"/>*/}
            {/*<label htmlFor="pi--details--trigger--score" className="pi--details--trigger-label">What I did <FontAwesomeIcon icon={faCaretLeft} /></label>*/}
            {/*<label htmlFor="pi--details--trigger--score" className="pi--details--trigger-label--close">*/}
            {/*<FontAwesomeIcon icon={faWindowClose} />*/}
            {/*</label>*/}
            <h3 className="pi--details--title">What I did</h3>
            <MediaQuery query="(max-device-width: 949px)">
              <input type="checkbox" id="pi--details-trigger" className="hidden"/>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 949px)">
              <label htmlFor="pi--details-trigger" className="pi--details-trigger--label">
                <FontAwesomeIcon icon={faPlusCircle}/>
              </label>
            </MediaQuery>
            <MediaQuery query="(min-device-width: 950px)">
              <input type="checkbox" id="pi--details-trigger" className="hidden" defaultChecked/>
            </MediaQuery>
            <div className="pi--item-description">
              <h4 className="pi--item-label--client">Client:</h4>
              <div className="pi--client"
                   dangerouslySetInnerHTML={{__html: this.props.portfolioItem.item_label__client}}/>
              {this.piLinkShow(this.props.portfolioItem)}
              {this.piAboutShow(this.props.portfolioItem)}
              <div className="pi--item-responsibilities">
                <h4 className="pi--item-label--responsibilities">Responsibilities:</h4>
                <ul className="pi--responsibilities">
                  {Object.keys(this.props.portfolioItem.responsibilities).map(this.piResponsibilities)}
                </ul>
              </div>
              <div className="pi--item-agency">
                <h4 className="pi--item-label--agency">Agency:</h4>
                {this.piLinkToAgency(this.props.portfolioItem)}
              </div>
            </div>
          </div>
          <div className="pi--images">
            {Object.keys(this.props.portfolioItem.images).map(this.piImages)}
          </div>
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
