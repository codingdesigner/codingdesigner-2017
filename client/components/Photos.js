import React from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import debounce from 'lodash/find';

// Flickr
const flickrKey = 'a7f3502c5a8c43300589c8ed4b6a01ff';
const flickrSecret = 'b29d00d5e97d29e8';
const flickrAuthToken = '72157690302540301-50ba00e77ee6a660';
const flickrApiSig = '92a179218fb155a4c2f31e077ddf0024';
const flickrUser = '86001309%40N00'; // me
const flickrPhotoset = '72157648966372560'; // Autumn/Wissahickon 2014
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
    // this.setPhotosets = this.setPhotosets.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange(),
      'photosets': []
    };
  }

  componentDidMount () {
    this.getFlickrPhotoset(flickrPhotoset);
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.photosets !== this.state.photosets) {
      console.log(this.state.photosets);
      console.log('loop over photos in set and load images');
      // console.log(Object.keys(this.state.photosets[flickrPhotoset].photo));
      // Object.keys(this.state.photosets[flickrPhotoset].photo).map((key) => {this.getFlickrPhoto(key, flickrPhotoset)});
    }
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
        // console.log(result);
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
    console.log(photosetBuild);
    console.log('!!!!get photos and sizes before setting state');
    // find all photos in this photoset
    console.log(Object.keys(photosetBuild[flickrPhotoset].photo));
    Object.keys(photosetBuild[flickrPhotoset].photo).map((key) => {this.getFlickrPhoto(key, flickrPhotoset)});
  }

  getFlickrPhoto(key, photoset_id) {
    const photoset = photosetBuild[flickrPhotoset];
    const photo_id = photoset.photo[key].id;
    const photo = this.axiosCall('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + flickrKey + '&photo_id=' + photo_id + '&format=json&nojsoncallback=1', this.buildPhotos, {'key': key, 'photoset_id': photoset_id});
  }

  buildPhotos(photoItem, photoItemContext) {
    // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    // console.log(photoItem);
    // console.log(photoItemContext);
    const photosets = {...this.state.photosets};
    const photoItemSizes = photoItem.data.sizes.size;
    // console.log(photoItemSizes);
    // photosets[photoItemContext.photoset_id].photo[photoItemContext.key].sizes = photoItemSizes;
    photosetBuild[photoItemContext.photoset_id].photo[photoItemContext.key].sizes = photoItemSizes;
    photosets[photoItemContext.photoset_id] = photosetBuild[photoItemContext.photoset_id];
    // console.log(photosetBuild);
    // this.checkAllPhotosLoaded(photoItemContext.photoset_id);
    // this.setPhotosets(photosetBuild[photoItemContext.photoset_id]);
    debounce(this.setState({ photosets }), 150);
    // this.setState({ photosets });
  }

  // checkAllPhotosLoaded(photoset_id) {
  //   // console.log(photosetBuild);
  //   // if (typeof photosetBuild[photoset_id] !== 'undefined') {
  //   //   Object.keys(photosetBuild[photoset_id].photo.map((key) => {
  //   //     console.log(key);
  //   //   }));
  //   // }
  // }

  // setPhotosets(photosetItem) {
  //   console.log(photosetItem);
  //   const photosets = {...this.state.photosets};
  //   const photosetItemData = photosetItem.data.photoset;
  //   console.log(photosetItemData);
  //   // photosets[photosetItemData.id] = photosetItemData;
  //   // photosetBuild = photosets;
  //   // this.setState({ photosets });
  // }


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
            {/*{Object.keys(this.state.behance.modules).map(this.displayImage)}*/}
            <h3>{this.state.photosets[flickrPhotoset].title}</h3>
            {/*<img src={this.state.flickr.photo[0].iconlarge}/>*/}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Photos;
