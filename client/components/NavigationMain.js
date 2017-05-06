import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import navigation from '../data/navigation';

class NavigationMain extends React.Component {

  constructor() {
    super();

    this.showNav = this.showNav.bind(this);
    this.yerMom = this.yerMom.bind(this);
    this.navItem = this.navItem.bind(this);

    // initial state
    this.state = {
      menuVisible: true
    }
  }

  // constructor() {
  //   super();
  //   this.showNav = this.showNav.bind(this);
  // }
  //
  showNav(e) {
    console.log("I'm going to show the navigation!");
    // console.log(e);
  }

  yerMom(e) {
    console.log("YER MOM");
    // console.log(e);
  }

  navItem(key) {
    const navItem = navigation[key];

    return (
      <div className="nav-primary--fan" key={key}>
        <Link to={navItem.path} className="nav-item">{navItem.text}</Link>
      </div>
    )
  }

  componentDidMount(e) {
    // const thisComponent = $(ReactDOM.findDOMNode(this));
    // const thisComponent = ;

    console.log("componentDidMount");
    console.log(this);
    // set el height and width etc.
  }

  render() {
    const {menuVisible} = this.props;

    return (
      <nav id="nav-primary" className="nav nav-primary">
        <MediaQuery query="(max-device-width: 800px)">
          <input type="checkbox" id="nav-primary-trigger" onChange={(e) => this.showNav(e)}/>
          <div className="nav-primary--fan">
            <label htmlFor="nav-primary-trigger" className="nav-primary-trigger--label">Menu</label>
          </div>
          { Object.keys(navigation).map(this.navItem) }
        </MediaQuery>
        <MediaQuery query="(min-device-width: 801px)">
          <input type="checkbox" id="nav-primary-trigger" onChange={(e) => this.showNav(e)} defaultChecked/>
          <div className="nav-primary--fan">
            <label htmlFor="nav-primary-trigger" className="nav-primary-trigger--label">Menu</label>
          </div>
          { Object.keys(navigation).map(this.navItem) }
        </MediaQuery>

      </nav>
    )
  }
}

NavigationMain.propTypes = {
  menuVisible: PropTypes.bool.isRequired
};

export default NavigationMain;