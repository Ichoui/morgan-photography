import React from 'react';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { PhotoSwipeOptions } from 'photoswipe';

interface Images {
  url: string;
}

export const PhotoGallery = (props: { galleryId: string; images: Images[] }): React.JSX.Element => {

    const options: PhotoSwipeOptions = {
        preload: [3, 3],
        mainClass: 'pspw-main-class',

    }
  return (
    <Gallery options={options}>
      <div className='Gallery'>
        {props.images.map((image, index) => (
          <Item cropped key={index} original={image.url} width='1000' height='600'>
            {({ ref, open }) => (
              <div className='Item'>
                <img ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={image.url} alt={'image_' + index} />
              </div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};
