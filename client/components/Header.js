import React from 'react';
import NavigationMain from './NavigationMain';

const Header = React.createClass({
  render() {
    return (
      <header className="site-header" role="banner">
        <div class="button-logo">
          <div class="title-curve">The Coding Designer</div>
          <div class="button-logo--words-wrapper">
            <div class="button-logo--word word-1">Mason</div>
            <div class="button-logo--word word-2">Wendell</div>
          </div>
        </div>
        <NavigationMain/>
      </header>
    )
  }
});

export default Header;