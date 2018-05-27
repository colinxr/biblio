import React, { Component } from 'react';

import './LibraryBook.css';

class LibraryBook extends Component {
  constructor() {
    super ();

    this.state = {
      isbn: ''
    }
  }

  componentDidMount() {}

  render() {
    const { postInfo,index, removeBook } = {...this.props};

    const img = postInfo._embedded['wp:featuredmedia'][0];

    return(
      <div className="library-book" key={postInfo['id']}>
        <div className="img-wrapper">
          <img src={img.media_details.sizes.thumbnail.source_url} alt=""/>
        </div>
        <div className="library-book__meta">
          <p>{postInfo.title.rendered}</p>
          <a href="#">View on good reads</a>
        </div>
        <span className="close" onClick={() => removeBook(index)}>X</span>
      </div>
    )
  }
}

export default LibraryBook;
