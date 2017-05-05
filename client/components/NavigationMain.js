import React from 'react';
import {Link} from 'react-router';

const NavigationMain = React.createClass({
  render() {
    return (
      <nav id="nav-primary" className="nav nav-primary">
        <input type="checkbox" id="nav-primary-trigger"/>
        <div className="nav-primary--fan"><label htmlFor="nav-primary-trigger" className="nav-primary-trigger--label">Menu</label>
        </div>
        <div className="nav-primary--fan">
          <Link to="/" className="nav-item">Home</Link>
        </div>
        <div className="nav-primary--fan">
          <Link to="/" className="nav-item">Portfolio</Link>
        </div>
        <div className="nav-primary--fan">
          <Link to="/" className="nav-item">Speaking</Link>
        </div>
        <div className="nav-primary--fan"><Link to="https://www.instagram.com/codingdesigner/" className="nav-item">Photos</Link>
        </div>
        <div className="nav-primary--fan">
          <Link to="/" className="nav-item">Posts</Link>
        </div>
        <div className="nav-primary--fan">
          <Link to="/" className="nav-item">About</Link>
        </div>
      </nav>
    )
  }
});

export default NavigationMain;