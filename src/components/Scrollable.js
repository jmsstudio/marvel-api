import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-undef */
class Scrollable extends React.Component {
  constructor(props) {
    super(props);
    this._handleScroll = this._handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll(e) {
    e.preventDefault();
    const documentHeight = document.documentElement.offsetHeight;
    const windowHeight = window.innerHeight;
    const windowScroll = window.scrollY;
    const totalScroll = windowScroll + windowHeight;

    //when 20% near to bottom, loads more data
    if (totalScroll > documentHeight - documentHeight * 0.2 && this.props.check) {
      this.props.callback();
    }
  }

  render() {
    return this.props.children;
  }
}

Scrollable.propTypes = {
  check: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Scrollable;
