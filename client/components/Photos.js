import React from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import Header from './Header/Header';
import Footer from './Footer/Footer';

// Flickr
const flickrKey = 'a7f3502c5a8c43300589c8ed4b6a01ff';
const flickrSecret = 'b29d00d5e97d29e8';
const flickrUser = '86001309%40N00'; // me
const flickrPhotoset = '72157648966372560'; // Autumn/Wissahickon 2014

// Behance
const apiKey = '9P6QXs8U94R6WzJZdbQvJgMP3s91vxv8';
const projectId = 60356123;
const imageSizes = ['disp', 'max_1240', '1400', 'max_1920', 'original'];

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);
    this.displayImage = this.displayImage.bind(this);
    this.setPhotosets = this.setPhotosets.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange(),
      'flickr': [],
      'photosets': []
    };
  }

  componentDidMount () {
    this.getFlickrPhotoset(flickrPhotoset);
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
  }

  axiosCall(url, callbackFunction) {
    axios.get(url)
      .then(result => {
        console.log(result);
        callbackFunction(result);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  }

  getFlickrPhotoset(photoset_id) {
    const photoset = this.axiosCall('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + flickrKey + '&photoset_id=' + photoset_id + '&user_id=' + flickrUser + '&format=json&nojsoncallback=1', this.setPhotosets);
  }

  setPhotosets(photosetItem) {
    this.setState({ photosets : photosetItem.data.photoset });
  }

  displayImage(key) {
    const item = this.state.behance.modules[key];
    if (item.type === 'image') {
      const dimensions = item.dimensions;
      const sizes = item.sizes;
      let srcSet = '';

      imageSizes.forEach((size) => {
        srcSet += item.sizes[size] + ' ' + item.dimensions[size].width + 'w, ';
      });

      return (
        <LazyLoad height={800} offset={100} key={key}>
          <figure className="photograph">
            <img srcSet={srcSet}/>
            {typeof item.caption_plain !== 'undefined' &&
              <figcaption>{item.caption_plain}</figcaption>
            }
          </figure>
        </LazyLoad>
      );
    }


  }

  render() {
    return (
      <div>
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--photography-page page-content">
          <h1 className="page-title">Photography</h1>
          <div className="photo-gallery">
            {Object.keys(this.state.behance.modules).map(this.displayImage)}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Photos;
