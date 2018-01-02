import React from 'react';
import find from "lodash/find";
import moment from 'moment';
import TweetEmbed from 'react-tweet-embed'
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {posts} from '../data/posts-teasers';
import {portfolio_items} from "../data/portfolio";
const ReactMarkdown = require('react-markdown');

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/posts', false, /\.(png|jpe?g|mov|mp4)$/));

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);
    this.initialPost = this.initialPost.bind(this);
    this.embeds = this.embeds.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange(),
      'PostItem': this.initialPost()
    };
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
  }

  initialPost() {
    if (typeof this.props.match.params.postId === 'string') {
      const findPost = find(posts, {'id': this.props.match.params.postId});
      if (typeof findPost !== 'undefined') {
        return find(posts, {'id': this.props.match.params.postId});
      } else {
        this.props.history.push('/posts');
      }
    } else {
      this.props.history.push('/posts');
    }
  }

  postImage(post) {
    if (typeof post.image !== 'undefined') {
      const postLink = '/posts/' + post.id;

      return (
        <div className="feature-image">
          <img src={allImages[post.image.src]} alt={post.image.alt}/>
        </div>
      )
    }
  }

  embeds(key) {
    const embed = this.state.PostItem.embeds[key];

    if (typeof embed.type_tweet !== 'undefined') {
      const tweetBool = JSON.parse(embed.type_tweet);
      if (tweetBool === true) {
        return (
          <div>
            <TweetEmbed id={embed.content}></TweetEmbed>
          </div>
        );
      }
    }
  }

  embedsCheck(post) {
    if (typeof post.embeds !== 'undefined') {
      return (
        <div className="post-embeds">
          {Object.keys(this.state.PostItem.embeds).map(this.embeds)}
        </div>
      )
    }
  }

  render() {
    const publishDate = moment(this.state.PostItem.date).format('dddd, MMMM Do, YYYY');
    return (
      <div>
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--posts-page page-content">
          <h1 className="page-title">{this.state.PostItem.headline}</h1>
          <article className="page">
            {this.postImage(this.state.PostItem)}
            <ReactMarkdown source={this.state.PostItem.full}/>
            {this.embedsCheck(this.state.PostItem)}
            <footer className="footer-date">Posted on {publishDate}</footer>
          </article>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Post;
