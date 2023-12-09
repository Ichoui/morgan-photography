import React, { useState } from 'react';
import 'styles/components/_app.scss';
import { Block, Exif } from 'interfaces/global.interface';
import { PhotoGallery } from 'components/Gallery/Gallery';
import { galleryBlocks } from 'scripts/gallery.exif';

const App = (): React.JSX.Element => {
  const [images, setImages] = useState<Exif[]>([]);
  const [galleryId, setGalleryId] = useState<string>('');
  const [galleryName, setGalleryName] = useState<string>('');
  const [isGallery, setIsGallery] = useState<boolean>(false);
  const blocks: Block[] = galleryBlocks //
    .sort((a, b): number => b.date.getTime() - a.date.getTime()); // Tri du plus récent au moins récent

  const selectGallery = (block: Block): void => {
    fetch(block.jsonPath)
      .then(res => res.json())
      .then(exifs => exifState(exifs, block.identifier, true, block.name));
  };

  const exifState = (exifs: Exif[], id: string, gallery: boolean, name: string): void => {
    setImages(exifs);
    setGalleryId(id);
    setIsGallery(gallery);
    setGalleryName(name)
  };

  return (
    <div className='App'>
      <header>
        <div className='site-name'>
          <img src='/assets/svg/logo.svg' className='logo' alt='logo' />
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
                    <span> {block.name} </span>
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
                <button className='btn-back' onClick={() => exifState([], '', false, '')}>
                  <img src='/assets/svg/chevron-left.svg' alt='retour' />
                  <span>RETOUR</span>
                </button>
              </div>
              <div className='gallery-name'>{galleryName}</div>
            </div>
            <PhotoGallery galleryId={galleryId} images={images} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
