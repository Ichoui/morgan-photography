import * as fs from 'fs';
import exifr from 'exifr';
import { Exif } from 'interfaces/global.interface';
import sizeOf from 'image-size';

console.warn('SCRIPT IS RUNNING');

const identifier = 'bretagne';
const folder = './src/assets/bretagne/';
const images: Exif[] = [];

// https://stackoverflow.com/questions/71276453/get-all-images-exif-and-pass-to-route-as-object
fs.promises
  .readdir(folder)
  .then((filenames: string[]) => {
    return Promise.all(
      filenames.map(filename =>

        exifr
          .parse(folder + filename, true)
          .then(brutExif => {
            // console.log(brutExif);
            // console.log('NEXT ONE NEXT ONE NEXT ONE NEXT ONE');
            const dimensions = sizeOf(folder + filename);
            images.push({
              identifier,
              localUrl: folder + filename,
              author: brutExif.Artist,
              apn: brutExif.Model,
              lensModel: brutExif.LensModel,
              focale: brutExif.FocalLength,
              date: brutExif.CreateDate,
              width: dimensions.width,
              height: dimensions.height,
              triangle: {
                ISO: brutExif.ISO,
                exposureTime: brutExif.ExposureTime,
                fValue: brutExif.FNumber,
              },
            });
          })
          .then(() => {
              exifr.thumbnailUrl(folder + filename).then(e => console.log(e))

            // Here try thumbnailUrl ?
          }),
      ),
    );
  })
  .then(() => {
    const json = JSON.stringify(images);
    fs.writeFile('src/scripts/bretagne-test.json', json, 'utf-8', () => null);
  });
