import React from 'react';
import PropTypes from 'prop-types';
import ButtonLogo from '../buttonLogo/ButtonLogo';
import NavigationMain from '../navigation/Navigation';

class Header extends React.Component {
  constructor() {
    super();

    // initial state
    this.state = {
      menuVisible: true
    }
  }

  render() {
    const { menuVisible } = this.props;

    return (
      <header className="site-header" role="banner">
        <ButtonLogo/>
        <NavigationMain menuVisible={this.state.menuVisible}/>
      </header>
    )
  }
}

Header.propTypes = {
  menuVisible: PropTypes.bool.isRequired
};

export default Header;