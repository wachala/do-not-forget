import React from 'react';
import PropTypes from 'prop-types';

class TextComponent extends React.Component {


  render() {
    return (
      <div>
        <p className="text">{this.props.staticText}</p>
        <p>{this.props.clicked ? 'clicked' : 'odclicked'}</p>
      </div>
    );
  }
}

TextComponent.propsTypes = {
  clicked: PropTypes.bool.isRequired,
  staticText: PropTypes.string.isRequired
};

export default TextComponent;
