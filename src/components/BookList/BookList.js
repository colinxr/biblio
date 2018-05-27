import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BookList.css';
import Book from '../Book/Book';

class BookList extends Component {
  render() {
    const { books, addBook } = {...this.props};

    return (
      <div className="items-container">
        {
          Object
            .keys(books)
            .map(key => <Book key={key} index={key} postInfo={books[key]} addBook={addBook} />)
        }
      </div>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired,
}


export default BookList;
