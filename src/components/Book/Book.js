import React, { Component } from 'react';
// import axios from 'axios';

import './Book.css';
import Rating from '../Rating/Rating';

class Book extends Component {
  constructor() {
    super();
    this.renderTerms = this.renderTerms.bind(this);

    this.state = {
      isbn: '',
      rating: '',
    }
  }

  componentDidMount() {
    const { postInfo } = {...this.props};

    this.setState({
      isbn: postInfo.acf.isbn,
      // rating: postInfo._embedded['wp:term'][6][0] ? postInfo._embedded['wp:term'][6][0]['name'] : null,
    });
  }

  renderTerms(taxonomy, seperator) {
    return Object
      .keys(taxonomy)
      .map(key => taxonomy[key]['name'])
      .join(seperator);
  }

  render() {
    const { postInfo, index, addBook } = {...this.props};
    const img = postInfo._embedded['wp:featuredmedia'][0];
    const bookAuthors = postInfo._embedded['wp:term'][2];
    const postTags = postInfo._embedded['wp:term'][3];
    const rating = postInfo._embedded['wp:term'][6][0] ? postInfo._embedded['wp:term'][6][0]['name'] : null;

    return (
      <div className="item">
        <div className="item__img-wrapper">
          <img src={img.media_details.sizes.medium.source_url} className="item__img" alt={img.alt_text} />
        </div>
        <div className="item__meta">
          <h2>{postInfo.title.rendered}</h2>
          <p>By: {this.renderTerms(bookAuthors, ' & ')}</p>
          <p>{this.renderTerms(postTags, ', ')}</p>
          <p><strong>ISBN: </strong> {postInfo.acf.isbn}</p>
        </div>
        <Rating totalStars={rating} />
        <div className="item__add">
          <span
            className="item__add__btn"
            onClick={() => addBook(index)}
            >Add to Reading List</span>
        </div>
      </div>
    );
  }
}

export default Book;
