import React, { Component } from 'react';


import './Rating.css';
// import FullStar from './FullStar';
// import HalfStar from './HalfStar';

class Rating extends Component {
  constructor() {
    super();
    this.renderStar = this.renderStar.bind(this);
  }

  renderStar(key) {
    return(<i className="fa fa-star" aria-hidden="true" key={key}></i>);
  }

  renderHalfStar(key) {
    return(<i className="fa fa-star-half-o" aria-hidden="true" key={key}></i>);
  }

  render() {
    const { totalStars } = {...this.props};

    if (!totalStars) return (<div><h5>No Rating Yet</h5></div>);

    let stars = [];
    const rating = Math.round(totalStars * 2 ) / 2;

    let i = rating;
    while (i >= 1) {
      stars.push(this.renderStar(i));
      i--;
    }
    if (i === .5) stars.push(this.renderHalfStar(i));

    return (<div>{stars}</div>);
  }
}

export default Rating;
