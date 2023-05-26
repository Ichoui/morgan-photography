import React, { useState } from 'react';
import logo from './logo.svg';
import './styles/components/_app.scss';
import { PhotoGallery } from '@components/Gallery/Gallery';
import { Exif } from 'interfaces/global.interface';
import { Blocks } from 'components/Blocks/Blocks';

const App = (): React.JSX.Element => {
  const [images, setImages] = useState<Exif[]>([]);

  const obj = [
    {
      identifier: 'bretagne',
      jsonPath: 'bretagne.json',
    },
    {
      identifier: 'bretagne',
      jsonPath: 'bretagne.json',
    },
    {
      identifier: 'maple',
      jsonPath: 'maple.json',
    },
    {
      identifier: 'maple',
      jsonPath: 'maple.json',
    },
  ];

  fetch(obj[0].jsonPath)
    .then(res => res.json())
    .then(exifs => setImages(exifs));

  return (
    <div className='App'>
      <header>
        <img src={logo} className='App-logo' alt='logo' />
        <div className='identifier'>MorganNICOL Photography</div>
      </header>
      <div className='container'>
        <div className='block-container'>
          {obj.map((o, index) => (
            <Blocks key={index} identifier={o.identifier} images={images}></Blocks>
          ))}
        </div>
      </div>

      {/*<PhotoGallery galleryId={obj[0].identifier} images={images} />*/}
      
    </div>
  );
};

export default App;
