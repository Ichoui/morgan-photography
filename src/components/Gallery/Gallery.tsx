import React from 'react';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

interface Images {
  url: string;
  width: number;
  height: number;
}

export const PhotoGallery = (props: { galleryId: string; images: Images[] }): React.JSX.Element => {
  const thumbnailStyle: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: '150px',
    height: '150px',
  };

  return (
    <Gallery>
      <div className='gallery'>
        {props.images.map((image, index) => (
          <Item cropped key={index} original={image.url} width={image.width} height={image.height}>
            {({ ref, open }) => (
              <img style={thumbnailStyle} ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open} src={image.url} alt={'ok'} />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};
