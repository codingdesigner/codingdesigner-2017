import React from 'react';
import ButtonLogo from '../ButtonLogo/ButtonLogo';
import NavigationMain from '../Navigation/Navigation';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.collapseClass = this.collapseClass.bind(this);

    this.state = {
      'collapseHeader': false
    };
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll (event) {
    const scrollTop = event.target.scrollingElement.scrollTop;
    const collapseHeader = (scrollTop > 50) ? 'collapse-header' : false;
    this.setState({ collapseHeader });
  }

  collapseClass () {
    if (this.state.collapseHeader !== false) {
      return this.state.collapseHeader;
    } else {
      return '';
    }
  }

  render() {
    const headerClass = 'site-header image-' + this.props.headerImage + ' ' + this.collapseClass();

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
