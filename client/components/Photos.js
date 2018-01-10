import React from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import debounce from 'lodash/debounce';
import find from 'lodash/find';

// Flickr
const flickrKey = 'a7f3502c5a8c43300589c8ed4b6a01ff';
const flickrUser = '86001309%40N00'; // me
const flickrPhotoset = '72157648966372560'; // Autumn/Wissahickon 2014
const imageSizes = ['Small 320', 'Medium', 'Large', 'Large 2048', 'Original'];
let photosetBuild = [];

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);
    this.displayImage = this.displayImage.bind(this);
    this.getFlickrPhoto = this.getFlickrPhoto.bind(this);
    this.buildPhotosets = this.buildPhotosets.bind(this);
    this.buildPhotos = this.buildPhotos.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange(),
      'photosets': []
    };
  }

  componentWillMount () {
    this.getFlickrPhotoset(flickrPhotoset);
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
  }

  axiosCall(url, callbackFunction, passthru) {
    axios.get(url)
      .then(result => {
        if (typeof passthru !== 'undefined') {
          callbackFunction(result, passthru);
        } else {
          callbackFunction(result);
        }
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
    const photoset = this.axiosCall('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + flickrKey + '&photoset_id=' + photoset_id + '&user_id=' + flickrUser + '&format=json&nojsoncallback=1', this.buildPhotosets);
  }

  buildPhotosets(photosetItem) {
    const photosetItemData = photosetItem.data.photoset;
    // write this photoset to the photosetBuild var
    photosetBuild[photosetItemData.id] = photosetItemData;
    // find all photos in this photoset
    Object.keys(photosetBuild[flickrPhotoset].photo).map((key) => {this.getFlickrPhoto(key, flickrPhotoset)});
  }

  getFlickrPhoto(key, photoset_id) {
    const photoset = photosetBuild[flickrPhotoset];
    const photo_id = photoset.photo[key].id;
    const photo = this.axiosCall('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + flickrKey + '&photo_id=' + photo_id + '&format=json&nojsoncallback=1', this.buildPhotos, {'key': key, 'photoset_id': photoset_id});
  }

  buildPhotos(photoItem, photoItemContext) {
    const photosets = {...this.state.photosets};
    const photoItemSizes = photoItem.data.sizes.size;
    photosetBuild[photoItemContext.photoset_id].photo[photoItemContext.key].sizes = photoItemSizes;
    photosets[photoItemContext.photoset_id] = photosetBuild[photoItemContext.photoset_id];
    debounce(this.setState({ photosets }), 150);
  }

  displayImage(key) {
    const item = this.state.photosets[flickrPhotoset].photo[key];
    let srcSet = '';

    imageSizes.forEach((size) => {
      const sizeItem = find(item.sizes, {'label': size});
      if (typeof sizeItem !== 'undefined') {
        srcSet += sizeItem.source + ' ' + sizeItem.width + 'w, ';
      }
    });

    return (
      <LazyLoad height={800} offset={100} key={key}>
        <figure className="photograph">
          <img srcSet={srcSet}/>
            {typeof item.title !== 'undefined' &&
              <figcaption>{item.title}</figcaption>
            }
        </figure>
      </LazyLoad>
    );
  }

  render() {
    return (
      <div className="full-page">
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--photography-page page-content">
          <h1 className="page-title">Photography</h1>
          <div className="photo-gallery">
            <h3>{typeof this.state.photosets[flickrPhotoset] !== 'undefined' &&
              this.state.photosets[flickrPhotoset].title
            }</h3>
            <div className="photo-gallery--photos">
              {typeof this.state.photosets[flickrPhotoset] !== 'undefined' &&
                Object.keys(this.state.photosets[flickrPhotoset].photo).map(this.displayImage)
              }
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Photos;
