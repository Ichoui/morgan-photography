import React from 'react';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { PhotoSwipeOptions } from 'photoswipe';
import { Exif } from 'interfaces/global.interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin';
import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css';

export const PhotoGallery = (props: { galleryId: string; images: Exif[] }): React.JSX.Element => {
  const { galleryId, images } = props;
  const options: PhotoSwipeOptions = {
    preload: [3, 3],
    mainClass: 'pspw-main-class',
    errorMsg: 'Cette photo ne peut pas se charger...',
    secondaryZoomLevel: 2,
    maxZoomLevel: 3,
  };

  if (galleryId === 'maple' || galleryId === 'divers') {
    // life images sorted DESC
    images.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else {
    // travel images sorted ASC
    images.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  const captionContent = (slide: any) => {
    const exif: Exif = slide.data['data-exif'];
    return `<div class='exifs-values'>
                    <div class="triangle">
                      <div>
                        <img src='assets/svgExif/aperture.svg' alt='aperture' />
                          <span>F/${exif.triangle.fValue}</span><br>
                      </div>             
                      <div>
                        <img src='assets/svgExif/iso.svg' alt='iso' />
                          <span>${exif.triangle.ISO}</span><br>
                      </div>            
                      <div>
                        <img src='assets/svgExif/exposureTime.svg' alt='exposureTime' />
                          <span>${exif.triangle.exposureTime}s</span><br>
                      </div>
                    </div>
                    <div class="device">
                      <div>
                        <img src='assets/svgExif/focale.svg' alt='focale' />
                          <span>${exif.focale}mm</span><br>
                      </div>
                      <div>
                        <img src='assets/svgExif/camera.svg' alt='lens' />
                          <span>${exif.apn}</span><br>
                      </div>   
                      <div>
                        <img src='assets/svgExif/lens.svg' alt='apn' />
                          <span>${exif.lensModel}</span><br>
                      </div>
                    </div>
                    <div class="date">
                        <div>
                            ${new Date(exif.date).toLocaleDateString(navigator.language, { dateStyle: 'medium' }) ?? ''}
                        </div>
                    </div>
                    <div class="name">
                        <div>
                          ${exif.imageName ?? ''}
                        </div>
                    </div>
                 </div>`;
  };

  const captionExif = (lightbox: any) => {
    return new PhotoSwipeDynamicCaption(lightbox, {
      type: 'auto',
      mobileLayoutBreakpoint: 800,
      captionContent,
    });
  };

  return (
    <Gallery options={options} plugins={captionExif}>
      <div className='Gallery'>
        {images.map((image, index) => (
          <Item cropped key={index} thumbnail={image.thumbUrl} original={image.localUrl} width={image.width} height={image.height} data-exif={image}>
            {({ ref, open }) => (
              <div className='Item'>
                <img ref={ref} onClick={open} src={image.thumbUrl} alt={`${image.identifier}-${index}`} />
              </div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};
