import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class PostsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);

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

  render() {
    return (
      <div>
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--posts-feed page-content">
          <h1>📦</h1>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default PostsFeed;
