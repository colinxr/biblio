import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderTerms } from '../../helpers.js';

class LibraryBook extends Component {
  constructor() {
    super ();

    this.state = {
      goodReadsUrl: ''
    }
  }

  componentDidMount() {
    const { postInfo } = {...this.props};

    this.setState({
      goodReadsUrl: `https://www.goodreads.com/book/isbn/${postInfo.acf.isbn}`
    })
  }

  render() {
    const { postInfo, index, removeBook } = {...this.props};
    const bookAuthors = postInfo._embedded['wp:term'][2];
    const goodReadsUrl = {...this.state};

    const img = postInfo._embedded['wp:featuredmedia'][0];

    return(
      <div className="library-book" key={postInfo['id']}>
        <div className="img-wrapper">
          <img src={img.media_details.sizes.thumbnail.source_url} alt=""/>
        </div>
        <div className="library-book__meta">
          <p><strong>{postInfo.title.rendered}</strong></p>
          <p>{renderTerms(bookAuthors, ' & ')}</p>
          <a href={this.state.goodReadsUrl} target="_blank">View on Goodreads</a>
        </div>
        <span className="close" onClick={() => removeBook(index)}>X</span>
      </div>
    )
  }
}

LibraryBook.propTypes = {
  postInfo: PropTypes.object.isRequired,
  removeBook: PropTypes.func.isRequired,
}

export default LibraryBook;
