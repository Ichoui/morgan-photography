import React from 'react';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { PhotoSwipeOptions } from 'photoswipe';
import { Exif } from 'interfaces/global.interface';

import imgUrl from 'assets/images/411A2000.jpg'
import * as process from "process";

export const PhotoGallery = (props: { galleryId: string; images: Exif[] }): React.JSX.Element => {
  const options: PhotoSwipeOptions = {
    preload: [3, 3],
    mainClass: 'pspw-main-class',
  };

    const getUrl: (n: string) => string = (n: string) => {
      // console.log(new URL(n, import.meta.url).href);
      return new URL(n, import.meta.url).href
    }

    return (
    <Gallery options={options}>
      <div className='Gallery'>

        {props.images.map((image, index) => (
                // <img key={index} src={getUrl(image.thumbUrl)} alt={image.identifier + '-' + index} />
                // <img key={index} src={'assets/photos/bretagne/thumbnails/thumb-411A2000.jpg'} alt={image.identifier + '-' + index} />


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
