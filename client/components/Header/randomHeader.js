import {headerLayouts} from '../../data/header-layouts';

const importHeaderImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};

exports.allHeaderImages = importHeaderImages(require.context('../../assets/images/headers', false, /\.(png|jpe?g)$/));

exports.randomheaderRange = (min = 1, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.getRandomHeader = () => {
  const randomPhotoObject = {};
  const random = exports.randomheaderRange();
  const headerLayout = headerLayouts[random];
  const headerImage = exports.allHeaderImages[headerLayout.image];
  randomPhotoObject.image = headerImage;
  randomPhotoObject.color = headerLayout.color;
  randomPhotoObject.backgroundColor = headerLayout.backgroundColor;
  randomPhotoObject.blend = headerLayout.blend;
  randomPhotoObject.linkColor = headerLayout.linkColor;
  return randomPhotoObject;
};

exports.randomizeHeader = (component) => {
  const randomPhotoObject = exports.getRandomHeader();
  component.setState({randomPhotoObject});
};
