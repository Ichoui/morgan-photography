import React from 'react';
import logo from './logo.svg';
import './styles/components/_app.scss';
import { PhotoGallery } from './components/Gallery/Gallery';


const App = (): React.JSX.Element => {
  const images = [
    {
      url: require('./assets/images/411A1692.jpg'),
      width: 1875,
      height: 2500,
    },
    {
      url: require('./assets/images/411A1615.jpg'),
      width: 1669,
      height: 2500,
    },
    {
      url: require('./assets/images/411A1686.jpg'),
      width: 2500,
      height: 1666,
    },
    {
      url: require('./assets/images/411A1830.jpg'),
      width: 2500,
      height: 1666,
    },    {
      url: require('./assets/images/411A1829.jpg'),
      width: 2500,
      height: 1666,
    },
  ];

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
