import React, { useState } from 'react';
import logo from './assets/svg/logo.svg';
import chevronBack from './assets/svg/chevron-left.svg';
import 'styles/components/_app.scss';
import { Exif } from 'interfaces/global.interface';
import { PhotoGallery } from 'components/Gallery/Gallery';

interface Block {
  identifier: string;
  jsonPath: string;
  blockThumbnail: string;
  date: Date;
}

const App = (): React.JSX.Element => {
  const [images, setImages] = useState<Exif[]>([]);
  const [galleryId, setGalleryId] = useState<string>('');
  const [isGallery, setIsGallery] = useState<boolean>(false);

  const blocks: Block[] = [
    {
      date: new Date('2028-12-01'),
      identifier: 'maple',
      jsonPath: 'assets/jsonExif/maple.json',
      blockThumbnail: 'assets/photos/maple/thumbnails/thumb-411A1830.jpg',
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
    {
      identifier: 'bretagne',
      jsonPath: 'assets/jsonExif/bretagne.json',
      blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
      date: new Date('2023-05-01'),
    },
  ].sort((a, b): number => b.date.getTime() - a.date.getTime()); // Tri du plus récent au moins récent

  const selectGallery = (block: Block): void => {
    fetch(block.jsonPath)
      .then(res => res.json())
      .then(exifs => exifState(exifs, block.identifier, true));
  };

  const exifState = (exifs: Exif[], id: string, gallery: boolean) => {
    setImages(exifs);
    setGalleryId(id);
    setIsGallery(gallery);
  };

  // TODO scrollbar design plz

  return (
    <div className='App'>
      <header>
        <div className='site-name'>
          <img src={logo} className='logo' alt='logo' />
        </div>
      </header>

      <div className='container'>
        {!isGallery && (
          <div className='grid-block'>
            {blocks.map((block, index) => (
              <div key={index} className='outer-block' onClick={() => selectGallery(block)}>
                <div className='border-block'>
                  <div className='block'>
                    <img src={block.blockThumbnail} alt={block.identifier} />
                    <span> {block.identifier} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isGallery && (
          <div className='wrapper-photo-gallery'>
            <div className='title-zone'>
              <div className='left'>
                <button className='btn-back' onClick={() => exifState([], '', false)}>
                  <img src={chevronBack} alt='retour' />
                  <span>RETOUR</span>
                </button>
              </div>
              <div className='gallery-name'>{galleryId}</div>
            </div>
            <PhotoGallery galleryId={galleryId} images={images} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
