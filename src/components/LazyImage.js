import React from 'react';
import ReactDOM from 'react-dom';
import _debounce from 'lodash/debounce';

/* eslint-disable no-undef */
/* eslint-disable react/no-find-dom-node */
class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShow: false,
    };

    this.isVisible = this.isVisible.bind(this);
    this.checkIsVisible = _debounce(() => this.isVisible(ReactDOM.findDOMNode(this)), 600);
  }

  componentWillMount() {
    window.addEventListener('scroll', this.checkIsVisible);
    window.addEventListener('resize', this.checkIsVisible);
  }

  componentDidMount() {
    this.isVisible(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkIsVisible);
    window.removeEventListener('resize', this.checkIsVisible);
  }

  isVisible(nodeElement) {
    if (nodeElement != null) {
      const measures = nodeElement.getBoundingClientRect();

      if (!this.state.shouldShow) {
        this.setState({
          shouldShow: measures.x + measures.width < window.innerWidth && measures.y < window.innerHeight,
        });
      }
    }
  }

  render() {
    let element = this.state.shouldShow ? (
      <img
        className={this.props.className}
        ref={this.isVisible}
        src={this.props.src}
        alt={this.props.alt}
        onClick={this.props.onClick}
      />
    ) : (
      <i className="fa fa-file-image-o fa-fw fa-4x" />
    );

    return element;
  }
}

export default LazyImage;
