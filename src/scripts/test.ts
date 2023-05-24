import * as fs from 'fs';
import exifr from 'exifr';
import { Exif } from 'interfaces/global.interface'; // => exifr/dist/full.umd.cjs

console.warn('SCRIPT IS RUNNING');
const folder = './src/assets/tmp/';
const images: Exif[] = [];
// https://stackoverflow.com/questions/71276453/get-all-images-exif-and-pass-to-route-as-object
fs.promises
  .readdir(folder)
  .then(filenames => {
    return Promise.all(
      filenames.map(filename =>
        exifr.parse(folder + filename).then(brutExif => {
          // console.log(brutExif);
          // console.log('NEXT ONE NEXT ONE NEXT ONE NEXT ONE');
          images.push({
            localUrl: folder + filename,
            author: brutExif.Artist,
            apn: brutExif.Model,
            lensModel: brutExif.LensModel,
            focale: brutExif.FocalLength,
            date: brutExif.CreateDate,
            width: brutExif.ExifImageWidth,
            height: brutExif.ExifImageHeight,
            triangle: {
              ISO: brutExif.ISO,
              exposureTime: brutExif.ExposureTime,
              fValue: brutExif.FNumber,
            },
          });
        }),
      ),
    );
  })
  .then(() => {
    // TODO : récupérer la width / length ... il y en aura besoin , ne serait-que pour les images prise verticalement (voir photo Ju à la pointe du Raz)
  })
  .then(() => {
    const json = JSON.stringify(images);
    fs.writeFile('src/scripts/bretagne-test.json', json, 'utf-8', () => null);
  });
