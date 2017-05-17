import React from 'react';
import Monogram from '../Monogram/Monogram';

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer" role="contentinfo" id="site-footer">
        <div className="footer-content">
          <Monogram/>
        </div>I AM A FOOTER
      </footer>
    )
  }
}

export default Footer;
