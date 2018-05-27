import React, { Component } from 'react';
import axios from 'axios';

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


export default BookList;
