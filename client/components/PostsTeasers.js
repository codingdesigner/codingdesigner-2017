import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {posts} from '../data/posts-teasers';
const ReactMarkdown = require('react-markdown');
const randomHeader = require('./Header/randomHeader');
import CustomProperties from 'react-custom-properties';

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/posts', false, /\.(png|jpe?g|mov|mp4)$/));

class PostsTeasers extends React.Component {
  constructor(props) {
    super(props);
    this.postTeaser = this.postTeaser.bind(this);

    this.state = {
      'randomPhotoObject': {}
    };
  }

  componentWillMount() {
    randomHeader.randomizeHeader(this);
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
    const headerStyles = {
      '--header-image': 'url(' + this.state.randomPhotoObject.image + ')',
      '--header-color': this.state.randomPhotoObject.color,
      '--header-background-color': this.state.randomPhotoObject.backgroundColor,
      '--header-blend': this.state.randomPhotoObject.blend,
      '--header-link-color': this.state.randomPhotoObject.linkColor
    };

    return (
      <CustomProperties className="full-page" properties={headerStyles} >
      <div className="full-page">
        <Header randomizeHeader={() => randomHeader.randomizeHeader(this)}/>
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
      </CustomProperties>
    )
  }
}

export default PostsTeasers;
