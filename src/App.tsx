import React, { useState } from 'react';
import logo from './logo.svg';
import './styles/components/_app.scss';
import { PhotoGallery } from '@components/Gallery/Gallery';
import { Exif } from 'interfaces/global.interface';

const App = (): React.JSX.Element => {
  const [images, setImages] = useState<Exif[]>([]);
  const obj = {
    bretagne: {
      identifier: 'bretagne',
      jsonPath: 'bretagne.json',
    },
    maple: {
      identifier: 'maple',
      jsonPath: 'maple.json',
    },
  };

  fetch(obj.bretagne.jsonPath)
    .then(res => res.json())
    .then(exifs => setImages(exifs));

  return (
    <div className='App'>
      <header>
        <img src={logo} className='App-logo' alt='logo' />
        <div className='identifier'>{obj.bretagne.identifier}</div>
      </header>
      <PhotoGallery galleryId={'maple'} images={images} />
    </div>
  );
};

export default App;
