import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {posts} from '../data/posts-teasers';
const ReactMarkdown = require('react-markdown');

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/posts', false, /\.(png|jpe?g|mov|mp4)$/));

class PostsTeasers extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);
    this.postTeaser = this.postTeaser.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange()
    };
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
  }

  postTeaserImage(post) {
    if (typeof post.image !== 'undefined') {
      const postLink = '/posts/' + post.id;

      return (
        <div className="post-teaser--thumb">
          <Link to={postLink} className="post-teaser--image-link">
            <img src={allImages[post.image.src]} alt={post.image.alt}/>
          </Link>
        </div>
      )
    }
  }

  postTeaser(key) {
    const item = posts[key];
    const postTeaserClass = (typeof item.image !== 'undefined') ? 'post-teaser' : 'post-teaser no-image';
    const postLink = '/posts/' + item.id;

    return (
      <li className="post-teaser--li" key={key}>
        <div className={postTeaserClass}>
          <div className="post-teaser-text">
            <h2 className="post-teaser--title">
              <Link to={postLink} className="post-teaser--link">{item.headline}</Link>
            </h2>
            <div className="post-teaser--excerpt" dangerouslySetInnerHTML={{__html: item.excerpt}}/>
          </div>
          {this.postTeaserImage(item)}
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className="full-page">
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--posts-feed page-content">
          <h1 className="page-title">Posts</h1>
          <section className="section latest-posts">
            <ul className="post-list">
              {Object.keys(posts).map(this.postTeaser)}
            </ul>
          </section>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default PostsTeasers;
