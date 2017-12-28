import React from 'react';
import ButtonLogo from '../ButtonLogo/ButtonLogo';
import NavigationMain from '../Navigation/Navigation';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const headerClass = 'site-header image-' + this.props.headerImage;

    return (
      <header className={headerClass} role="banner">
        <ButtonLogo headerImage={this.props.headerImage}/>
        <NavigationMain headerImage={this.props.headerImage} randomizeHeader={this.props.randomizeHeader} />
      </header>
    )
  }
}

Header.propTypes = {
  headerImage: PropTypes.number.isRequired,
  randomizeHeader: PropTypes.func.isRequired
};

export default Header;
