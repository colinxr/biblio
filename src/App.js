import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import BookLoading from './components/BookLoading/BookLoading';
import StatusBar from './components/StatusBar/StatusBar';
import BookList from './components/BookList/BookList';
import Library from './components/Library/Library';

import './App.css';
import 'normalize.css';

class App extends Component {
  constructor() {
    super();

    this.getBooks = this.getBooks.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
    this.clearStatusBar = this.clearStatusBar.bind(this);

    this.state = {
      loading: true,
      libraryErr: false,
      libraryErrMsg: 'Looks\'s like you\'ve already added that book to the Reading List',
      books: {},
      library: [],
    }
  }

  componentDidMount() {
    this.getBooks()
      .then(resp => {
        this.setState({
          loading: false,
          books: resp
        });
      })
      .catch(err => console.error(err));
  }

  getBooks = async () => {
    const response = await axios('http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed');
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  addToLibrary(key) {
    const { books, library } = {...this.state}
    //check if book is already in library;
    // returns -1 if not in library
    const bookInLibrary = library.indexOf(books[key]);


    if (bookInLibrary < 0 ) {
      library[key] = books[key];
      this.setState({ library });
    } else {
      this.setState({ libraryErr: true });
    }
  }

  removeFromLibrary(key) {
    const { library } = {...this.state}
    const postId = library[key].id;

    const filteredLibrary = Object
      .keys(library)
      .filter(key => {
        if (library[key].id !== postId) return library[key];
      })
      .map(key => library[key]);

    this.setState({ library: filteredLibrary });
  }

  clearStatusBar() {
    console.log('test');
    this.setState({ libraryErr: false });
  }

  renderLoading() {
    return (
      <div className="items-container">
        <BookLoading />
        <BookLoading />
        <BookLoading />
        <BookLoading />
        <BookLoading />
        <BookLoading />
      </div>
    )
  }
  render() {
    const { books, library, libraryErrMsg } = {...this.state};
    return (
      <div className="app">
        <Header name="BookIt"/>
        {this.state.libraryErr ? <StatusBar errMsg={libraryErrMsg} dismiss={this.clearStatusBar} /> : ''}
        <div className="app__container">
          <div className="post-container">
            {
              this.state.loading ?
              this.renderLoading() :
              <BookList books={books} addBook={this.addToLibrary} />
            }
            <Library
              library={library}
              removeBook={this.removeFromLibrary}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
