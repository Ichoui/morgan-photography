import React, { useState } from 'react';
import logo from './logo.svg';
import apn from './appareil-photo.svg';
import './styles/components/_app.scss';
import { Exif } from 'interfaces/global.interface';
import { PhotoGallery } from 'components/Gallery/Gallery';

interface Block {
  identifier: string;
  jsonPath: string;
  blockThumbnail: string;
}

const App = (): React.JSX.Element => {
  const [images, setImages] = useState<Exif[]>([]);
  const [galleryId, setGalleryId] = useState<string>('');
  const [isGallery, setIsGallery] = useState<boolean>(false);

  const blocks: Block[] = [
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
    },
    {
      identifier: 'maple',
      jsonPath: 'assets/jsonExif/maple.json',
      blockThumbnail: 'assets/photos/maple/thumbnails/thumb-411A1830.jpg',
    },
  ];

  const selectGallery = (block: Block): void => {
    fetch(block.jsonPath)
      .then(res => res.json())
      .then(exifs => {
        setImages(exifs);
        setGalleryId(block.identifier);
        setIsGallery(true);
      });
  };

  return (
    <div className='App'>
      <header>
        <img src={logo} className='App-logo' alt='react-logo' />
        <div className='site-name'>
          <img src={apn} className='logo' alt='logo' />
          <span>Morgan Photography</span>
        </div>
      </header>

      <div className='container'>
        {!isGallery && (
          <div className='grid-block'>
            {blocks.map((block, index) => (
              <div className='block' key={index} onClick={() => selectGallery(block)}>
                <img src={block.blockThumbnail} alt={block.identifier} />
                <span> {block.identifier} </span>
              </div>
            ))}
          </div>
        )}

        {isGallery && (
          <div className='wrapper-photo-gallery'>
            <div className='fixed-zone'>
              <div className='gallery-name'>{galleryId}</div>
              <button className='btn-back' onClick={() => setIsGallery(false)}>
                RETOUR
              </button>
            </div>
            <PhotoGallery galleryId={galleryId} images={images} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
