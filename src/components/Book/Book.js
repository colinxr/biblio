import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderTerms } from '../../helpers.js';
import axios from 'axios';
import proxify from 'proxify-url';

import Rating from '../Rating/Rating';

class Book extends Component {
  constructor() {
    super();
		this.setBookUrl - this.setBookUrl.bind(this);
		this.proxyGoodReadsApi = this.proxyGoodReadsApi.bind(this);
		this.getGoodReads = this.getGoodReads.bind(this);
		this.parseApi = this.parseApi.bind(this);
		this.formatString - this.formatString.bind(this);

    this.state = {
			apiKey: 'lxuq4vtIeeQ8PZzidrl2Yg',
			goodReadsUrl: '',
			desc: '',
    }
  }

  componentDidMount() {
		this.setBookUrl();

		this.proxyGoodReadsApi()
			.then(url => {
				this.getGoodReads(url)
				.then(resp => this.parseApi(resp))
				.catch(err => console.error(err));
			})
			.catch(err => console.error(err));
  }

	setBookUrl() {
		const { postInfo } = {...this.props};

		this.setState({
      goodReadsUrl: `https://www.goodreads.com/book/isbn/${postInfo.acf.isbn}`
    });
	}

	proxyGoodReadsApi = async () => {
		const { apiKey } = {...this.state};
		const { postInfo } = {...this.props};
		//
		// const config = {
		// 	headers: {'Access-Control-Allow-Origin': '*'},
		// 	crossdomain: true,
		// }
		// const resp = await axios(`https://www.goodreads.com/book/isbn/${postInfo.acf.isbn}?key=${apiKey}`, config);
		//
		// const body = await resp.data;
    // if (resp.status !== 200) throw Error(body.message);
    // return body;

		const url = `https://www.goodreads.com/book/isbn/${postInfo.acf.isbn}?key=${apiKey}`;

		let resp = await proxify(url, {
			inputFormat: 'xml',
			outPutFormat: 'xml',
		});

		return resp;
	}

	getGoodReads = async (url) => {
		const resp = await axios(url);
		const body = await resp.data;
		if (resp.status !== 200) throw Error(body.message);
		return resp;
	}

	parseApi(resp) {
		var data = resp.data.query.results;
		let desc;

		if (!data.hasOwnProperty('error')) {
			const bookDesc = data.GoodreadsResponse.book.description
			desc = bookDesc ? this.formatString(bookDesc) : 'No Description found on GoodReads';
		} else {
			console.log('error')
			desc = 'No description found';
		}

		this.setState({ desc });
	}

	formatString(str) {
		return str.replace(/<\/?[^>]+(>|$)/g, '').replace(/(?:\r\n|\r|\n)/g, '').substring(0, 150) + '...';
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
          <p><strong>By:</strong> {renderTerms(bookAuthors, ' & ')}</p>
          <p>{renderTerms(postTags, ', ')}</p>
					<p className="item__body__copy"><strong>About:</strong> {this.state.desc}</p>
					  <a href={this.state.goodReadsUrl} target="_blank">See more on Goodreads</a>
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
