import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LibraryBook from '../LibraryBook/LibraryBook';

class Library extends Component {
  constructor() {
    super ();

    this.renderEmpty = this.renderEmpty.bind(this);

    this.state = {
      loading: true,
      library: [],
    }
  }

  componentWillUpdate(nextProps) {
    localStorage.setItem('localLibrary', JSON.stringify(nextProps.library));
  }

  renderEmpty() {
    return (
      <div className="app__library__error">
        <h3>Nothing to see here.</h3>
        <h4>Add something to your Reading List</h4>
      </div>
    )
  }

  render() {
    const { library, removeBook } = {...this.props};

    if (library === undefined || !library.length) {
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

Library.propTypes = {
  library: PropTypes.array.isRequired,
  removeBook: PropTypes.func.isRequired,
}

export default Library;
