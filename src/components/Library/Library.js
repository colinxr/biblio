import React, { Component } from 'react';

import './Library.css';
import LibraryBook from '../LibraryBook/LibraryBook';

class Library extends Component {
  constructor() {
    super ();

    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderLibraryBook = this.renderLibraryBook.bind(this);

    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const { library } = {...this.props};

    this.setState({
      laoding: false,
    })
  }

  componentWillUpdate(nextProps) {
  }

  renderEmpty() {
    return (
      <div className="app__library__error">
        <h3>Nothing to see here.</h3>
        <h3>Add something to your Reading List</h3>
      </div>
    )
  }

  renderLibraryBook(key) {
    const { library } = {...this.props};
    const book = library[key];

    return (
      <div key={key}><h3>library book</h3></div>
    )
  }

  render() {
    const { library, removeBook } = {...this.props};

    if (library == undefined || !library.length) {
      return (
        <div className="app__library">
          {this.renderEmpty()}
        </div>
      )
    } else {
      return (
        <div className="app__library">
          {
            Object
              .keys(library)
              .map(key => <LibraryBook postInfo={library[key]}
              key={key}
              index={key}
              removeBook={removeBook} />)
          }
        </div>
      )
    }
  }
}


export default Library
;
