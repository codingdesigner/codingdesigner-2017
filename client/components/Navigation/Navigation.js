import React from 'react';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import navigation from '../../data/navigation';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-pro-solid/faBars';

class NavigationMain extends React.Component {
  constructor() {
    super();
    this.navItem = this.navItem.bind(this);
  }

  navItem(key) {
    const navItem = navigation[key];

    return (
      <div className="nav-primary--fan" key={key}>
        <Link to={navItem.path} className="nav-item" onClick={() => this.props.randomizeHeader()}>{navItem.text}</Link>
      </div>
    )
  }

  render() {
    return (
      <nav id="nav-primary" className="nav nav-primary">
        <MediaQuery query="(max-device-width: 649px)">
          <input type="checkbox" id="nav-primary-trigger"/>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 650px)">
          <input type="checkbox" id="nav-primary-trigger" defaultChecked/>
        </MediaQuery>
        <div className="nav-primary--fan">
          <label htmlFor="nav-primary-trigger" className="nav-primary-trigger--label">
            <FontAwesomeIcon icon={faBars} />
          </label>
        </div>
        { Object.keys(navigation).map(this.navItem) }
      </nav>
    )
  }
}

NavigationMain.propTypes = {
  randomizeHeader: PropTypes.func.isRequired
};

export default NavigationMain;
