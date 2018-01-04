import React from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import Header from './Header/Header';
import Footer from './Footer/Footer';

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

    this.state = {
      'randomPhoto': this.randomheaderRange(),
      'behance': []
    };
  }

  componentDidMount () {
    const axiosConfig = {headers: {'Access-Control-Allow-Origin': 'behance.net'}};
    axios.get('http://behance.net/v2/projects/' + projectId + '?api_key=' + apiKey, axiosConfig)
      .then(res => {
        const behance = res.data.project;
        console.log(behance);
        this.setState({ behance });
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
      });
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
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
