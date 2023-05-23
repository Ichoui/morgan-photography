import React from 'react';
import logo from './logo.svg';
import './styles/components/_app.scss';
import { PhotoGallery } from './components/Gallery/Gallery';
import { Test } from './test';

const App = (): React.JSX.Element => {
  const images = [
    {
      url: require('./assets/images/411A1692.jpg'),
    },
    {
      url: require('./assets/images/411A1615.jpg'),
    },
    {
      url: require('./assets/images/411A1686.jpg'),
    },
    {
      url: require('./assets/images/411A1830.jpg'),
    },
    {
      url: require('./assets/images/411A1829.jpg'),
    },    {
      url: require('./assets/images/411A1692.jpg'),
    },
    {
      url: require('./assets/images/411A1615.jpg'),
    },
    {
      url: require('./assets/images/411A1686.jpg'),
    },
    {
      url: require('./assets/images/411A1830.jpg'),
    },
    {
      url: require('./assets/images/411A1829.jpg'),
    },
  ];

  const x = Test()
  console.log(x);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <PhotoGallery galleryId={'maple'} images={images} />
      </header>
    </div>
  );
};
// https://github.com/dromru/react-photoswipe-gallery
export default App;
