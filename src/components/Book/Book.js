import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderTerms } from '../../helpers.js';

import Rating from '../Rating/Rating';

class Book extends Component {
  constructor() {
    super();
    // this.renderTerms = this.renderTerms.bind(this);

    this.state = {
      isbn: '',
    }
  }

  componentDidMount() {
    const { postInfo } = {...this.props};

    this.setState({
      isbn: postInfo.acf.isbn,
    });
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
        <div className="item__body">
          <h2>{postInfo.title.rendered}</h2>
          <p>By: {renderTerms(bookAuthors, ' & ')}</p>
          <p>{renderTerms(postTags, ', ')}</p>
          <p><strong>ISBN: </strong> {postInfo.acf.isbn}</p>
          <div className="item__body__footer">
            <Rating totalStars={rating} />
            <span className="item__add-btn" onClick={() => addBook(index)}>Add to Reading List</span>
          </div>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  postInfo: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  addBook: PropTypes.func.isRequired,
}

export default Book;
