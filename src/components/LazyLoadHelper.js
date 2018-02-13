import React from 'react';

/* eslint-disable */
function LazyLoadHelper(children) {
  const isVisible = (offset = 0) => {
    if (!children) return false;
    const top = children.getBoundingClientRect().top;
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  debugger;
  return <div ref={el => (this.yourElement = el)}> ... </div>;
}

export default LazyLoadHelper;
