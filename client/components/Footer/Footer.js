import React from 'react';
import {Link} from 'react-router-dom';
import Monogram from '../Monogram/Monogram';

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer" role="contentinfo" id="site-footer">
        <div className="footer-content">
          <Monogram/>

          <div className="contact">
            <div className="contact-item email">
              <Link to="mailto:mason@thecodingdesigner.com" className="icon-link">
                <i className="fa fa-envelope-o fa-2x" aria-label="Menu"></i>
              </Link>
              <Link to="mailto:mason@thecodingdesigner.com">
                <span className="text">mason@thecodingdesigner.com</span>
              </Link>
            </div>
            <div className="contact-item instagram">
              <Link to="https://www.instagram.com/codingdesigner/" className="icon-link">
                <i className="fa fa-instagram fa-2x" aria-label="Menu"></i>
              </Link>
              <Link to="https://www.instagram.com/codingdesigner/">
                <span className="text">@codingdesigner</span>
              </Link>
            </div>
            <div className="contact-item twitter">
              <Link to="https://twitter.com/codingdesigner" className="icon-link">
                <i className="fa fa-twitter fa-2x" aria-label="Menu"></i>
              </Link>
              <Link to="https://twitter.com/codingdesigner">
                <span className="text">@codingdesigner</span>
              </Link>
            </div>
            <div className="contact-item LinkedIn">
              <Link to="http://www.linkedin.com/in/masonwendell" className="icon-link">
                <i className="fa fa-linkedin fa-2x" aria-label="Menu"></i>
              </Link>
              <Link to="http://www.linkedin.com/in/masonwendell">
                <span className="text">Mason Wendell</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="styleguide">
          <p>
            <Link to="/support/dest/pattern-lab/?p=pages-home">Styleguide (Pattern Lab) for this site</Link>
          </p>
        </div>
        <div className="copyright">
          <p>&copy; 2016, 2017 Mason Wendell. All rights reserved.</p>
        </div>
      </footer>
    )
  }
}

export default Footer;
