import React from 'react';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import navigation from '../../data/navigation';

class NavigationMain extends React.Component {
  constructor() {
    super();
    this.navItem = this.navItem.bind(this);
  }

  navItem(key) {
    const navItem = navigation[key];

    return (
      <div className="nav-primary--fan" key={key}>
        <Link to={navItem.path} className="nav-item">{navItem.text}</Link>
      </div>
    )
  }

  render() {
    return (
      <nav id="nav-primary" className="nav nav-primary">
        <MediaQuery query="(max-device-width: 800px)">
          <input type="checkbox" id="nav-primary-trigger" onChange={(e) => this.showNav(e)}/>
          <div className="nav-primary--fan">
            <label htmlFor="nav-primary-trigger" className="nav-primary-trigger--label"><i className="fa fa-bars fa-lg" aria-label="Menu"></i></label>
          </div>
          { Object.keys(navigation).map(this.navItem) }
        </MediaQuery>
        <MediaQuery query="(min-device-width: 801px)">
          <input type="checkbox" id="nav-primary-trigger" onChange={(e) => this.showNav(e)} defaultChecked/>
          <div className="nav-primary--fan">
            <label htmlFor="nav-primary-trigger" className="nav-primary-trigger--label"><i className="fa fa-bars" aria-label="Menu"></i></label>
          </div>
          { Object.keys(navigation).map(this.navItem) }
        </MediaQuery>
      </nav>
    )
  }
}


export default NavigationMain;
