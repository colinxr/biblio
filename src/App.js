import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import BookLoading from './components/BookLoading/BookLoading';
import StatusBar from './components/StatusBar/StatusBar';
import SubjectList from './components/SubjectList/SubjectList';
import BookList from './components/BookList/BookList';
import Library from './components/Library/Library';

import 'normalize.css';

class App extends Component {
  constructor() {
    super();

    this.getBooks = this.getBooks.bind(this);
    this.getSubjects = this.getSubjects.bind(this);
    this.getSingleSubject = this.getSingleSubject.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderSubjectName = this.renderSubjectName.bind(this);
    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
    this.clearStatusBar = this.clearStatusBar.bind(this);

    this.state = {
      loading: true,
      libraryErr: false,
      libraryErrMsg: 'Looks\'s like you\'ve already added that book to the Reading List',
      books: {},
      subjects: [],
      library: [],
      currentSub: '',
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

    this.getSubjects()
      .then(resp => this.setState({ subjects: resp }) )
      .catch(err => console.error(err));

    const localStorageRef = localStorage.getItem('localLibrary');

    if (localStorageRef) {
      this.setState({ library: JSON.parse(localStorageRef) });
    }
  }

  getBooks = async () => {
    const resp = await axios('http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed');
    const body = await resp.data;

    if (resp.status !== 200) throw Error(body.message);
    return body;
  }

  getSubjects = async () => {
    const resp = await axios('http://api-biblio.officebureau.ca/wp-json/wp/v2/subject');
    const body = await resp.data;

    if (resp.status !== 200) throw Error(body.message);
    return body;
  }

  getSingleSubject = async (subjectId) => {
    const resp = await axios(`http://api-biblio.officebureau.ca/wp-json/wp/v2/posts?_embed&subject=${subjectId}`);
    const body = await resp.data;

    if (resp.status !== 200) throw Error(body.message);
    return body;
  }

  addToLibrary(key) {
    const { books, library } = {...this.state}
    // check if book is already in library;
    // returns -1 if not in library
    const bookId = books[key]['id'];

    const bookExistsInLibrary = Object
      .keys(library)
      .map(key => {
         if (library[key]['id'] == bookId) return true;
      })

    if (bookExistsInLibrary.includes(true)) {
      this.setState({ libraryErr: true });
    } else {
      library.push(books[key]);
      this.setState({ library });
    }
  }

  removeFromLibrary(key) {
    const { library } = {...this.state}
    const postId = library[key].id;

    const filteredLibrary = Object
      .keys(library)
      .filter(key => {
        if (library[key]['id'] !== postId) return library[key];
      })
      .map(key => library[key]);

    this.setState({ library: filteredLibrary });
  }

  handleFilter(key) {
    const {subjects} = {...this.state};
    const subjectId = subjects[key]['id'];
    const subjectName = subjects[key]['name'];

    this.setState({ loading: true });

    this.getSingleSubject(subjectId)
      .then(resp => {
        this.setState({
          loading: false,
          books: resp,
          currentSub: subjectName,
        });
      })
      .catch(err => console.err(err));
  }

  handleClearFilter() {
    this.setState({
      loading: true,
      currentSub: '',
    });

    this.getBooks()
      .then(resp => {
        this.setState({
          loading: false,
          books: resp,
        });
      })
      .catch(err => console.err(err));
  }

  clearStatusBar() {
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

  renderSubjectName() {
    const { currentSub } = {...this.state};
    return (
      <h2>{currentSub}</h2>
    );
  }

  renderMain() {
    const { books, subjects, currentSub } = {...this.state};
    return(
      <div>
        <SubjectList subjects={subjects} filterSubject={this.handleFilter}
        clearFilter={this.handleClearFilter} />
        {
          !currentSub ? '' : this.renderSubjectName()
        }
        <BookList books={books} addBook={this.addToLibrary} />
      </div>
    )
  }

  render() {
    const { books, library, loading, libraryErr, libraryErrMsg } = {...this.state};
    return (
      <div className="app">
        <Header name="Biblio"/>
        <div className="app__container">
          <div className="main">
            {
              libraryErr ?
              <StatusBar errMsg={libraryErrMsg} dismiss={this.clearStatusBar} /> :
              ''
            }

            {
              loading ?
              this.renderLoading() :
              this.renderMain()
            }
          </div>
            <Library
              library={library}
              removeBook={this.removeFromLibrary}
            />
        </div>
      </div>
    );
  }
}

export default App;
