import React, {useState} from 'react';
import logo from './logo.svg';
import './styles/components/_app.scss';
import {PhotoGallery} from '@components/Gallery/Gallery';
import {Exif} from 'interfaces/global.interface';

const App = (): React.JSX.Element => {
    const [images, setImages] = useState<Exif[]>([])

  fetch('./src/scripts/bretagne-test.json')
    .then(e => e.json())
    .then(t => setImages(t));

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
