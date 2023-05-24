import React, { useEffect } from 'react';
import logo from './logo.svg';
import './styles/components/_app.scss';
import { Test } from 'test';
import { PhotoGallery } from '@components/Gallery/Gallery';
import { Exif } from 'interfaces/global.interface';
import * as fs from 'fs';
import {render} from "react-dom";

const App = (): React.JSX.Element => {
  // const images = [
  //   {
  //     url: './src/assets/images/411A2155.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1686.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1692.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1615.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1686.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1830.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1829.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1692.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1615.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1686.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1830.jpg',
  //   },
  //   {
  //     url: './src/assets/images/411A1829.jpg',
  //   },
  // ];

  // const images: Exif[] = fs.readFileSync("src/scripts/bretagne-test.json", "utf8")

  let images: Exif[] = [];
  fetch('./src/scripts/bretagne-test.json')
    .then(e => e.json())
    .then(t => {
      images = t;
      console.log(t);
    });

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <PhotoGallery galleryId={'maple'} images={images} />
      </header>
    </div>
  );
};


// https://github.com/dromru/react-photoswipe-gallery
export default App;
