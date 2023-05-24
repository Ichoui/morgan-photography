import React from 'react';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { PhotoSwipeOptions } from 'photoswipe';
import {Exif} from "interfaces/global.interface";

export const PhotoGallery = (props: { galleryId: string; images: Exif[] }): React.JSX.Element => {
  const options: PhotoSwipeOptions = {
    preload: [3, 3],
    mainClass: 'pspw-main-class',
  };

  return (
    <Gallery options={options}>
      <div className='Gallery'>
        {props.images.map((image, index) => (
          <Item cropped key={index} original={image.localUrl} width={6720} height={4480}>
            {({ ref, open }) => (
              <div className='Item'>
                <img ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={image.localUrl} alt={'bretagne-' + index} />
              </div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};
