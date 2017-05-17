import React from 'react';
import PropTypes from 'prop-types';

class ButtonLogo extends React.Component {
  render() {
    const buttonClass = 'button-logo image-' + this.props.headerImage;

    return (
      <div className={buttonClass}>
        <div className="title-curve" aria-label="The Coding Designer">
          <span className="char1" aria-hidden="true">T</span>
          <span className="char2" aria-hidden="true">h</span>
          <span className="char3" aria-hidden="true">e</span>
          <span className="char4" aria-hidden="true"> </span>
          <span className="char5" aria-hidden="true">C</span>
          <span className="char6" aria-hidden="true">o</span>
          <span className="char7" aria-hidden="true">d</span>
          <span className="char8" aria-hidden="true">i</span>
          <span className="char9" aria-hidden="true">n</span>
          <span className="char10" aria-hidden="true">g</span>
          <span className="char11" aria-hidden="true"> </span>
          <span className="char12" aria-hidden="true">D</span>
          <span className="char13" aria-hidden="true">e</span>
          <span className="char14" aria-hidden="true">s</span>
          <span className="char15" aria-hidden="true">i</span>
          <span className="char16" aria-hidden="true">g</span>
          <span className="char17" aria-hidden="true">n</span>
          <span className="char18" aria-hidden="true">e</span>
          <span className="char19" aria-hidden="true">r</span>
        </div>
        <div className="button-logo--words-wrapper">
          <div className="button-logo--word word-1">Mason</div>
          <div className="button-logo--word word-2">Wendell</div>
        </div>
      </div>
    )
  }
}

ButtonLogo.propTypes = {
  headerImage: PropTypes.number.isRequired
};

export default ButtonLogo;
