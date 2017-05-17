import React from 'react';
import ButtonLogo from '../ButtonLogo/ButtonLogo';
import NavigationMain from '../Navigation/Navigation';

class Header extends React.Component {
  constructor() {
    super();
    this.setHeaderImage = this.setHeaderImage.bind(this);
    this.calculateButtonImage = this.calculateButtonImage.bind(this);

    // initial state
    this.state = {
      headerImage: 1
    }
  }

  setHeaderImage(i) {
    this.setState({headerImage: i});
  }

  calculateButtonImage(min = 1, max = 10) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setHeaderImage(random);
    return random;
  }

  componentWillMount() {
    this.calculateButtonImage();
  }

  render() {
    const headerClass = 'site-header image-' + this.state.headerImage;

    return (
      <header className={headerClass} role="banner">
        <ButtonLogo headerImage={this.state.headerImage} setHeaderImage={this.setHeaderImage} calculateButtonImage={this.calculateButtonImage} />
        <NavigationMain headerImage={this.state.headerImage} calculateButtonImage={this.calculateButtonImage} />
      </header>
    )
  }
}

export default Header;
