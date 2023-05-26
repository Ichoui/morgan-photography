import React from 'react';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { PhotoSwipeOptions } from 'photoswipe';
import { Exif } from 'interfaces/global.interface';

import imgUrl from 'assets/images/411A2000.jpg'

export const PhotoGallery = (props: { galleryId: string; images: Exif[] }): React.JSX.Element => {
  const options: PhotoSwipeOptions = {
    preload: [3, 3],
    mainClass: 'pspw-main-class',
  };
  return (
    <Gallery options={options}>
      <div className='Gallery'>
    {imgUrl}
        {props.images.map((image, index) => (
          <Item cropped key={index} thumbnail={image.thumbUrl} original={image.localUrl} width={image.width} height={image.height}>
            {({ ref, open }) => (
              <div className='Item'>
                <img ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={image.thumbUrl} alt={image.identifier + '-' + index} />
              </div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};
