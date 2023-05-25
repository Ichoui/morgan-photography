import * as fs from 'fs';
import exifr from 'exifr';
import { Exif } from 'interfaces/global.interface';
import sizeOf from 'image-size';

console.warn('SCRIPT IS RUNNING');

const identifier = 'bretagne'; // Should be folder name too
const folder = `./src/assets/${identifier}/`;
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
            return {
              identifier,
              localUrl: folder + filename,
              thumbUrl: folder + 'thumbnails/thumb-' + filename,
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
            };
          })
          .then(e => {
            images.push(e);
              // if (!fs.existsSync(folder + 'thumbnails')) {
                fs.mkdirSync(folder + 'thumbnails');
              // }
            exifr
              .thumbnail(e.localUrl)
              .then((buffer: any) => fs.writeFile(folder + 'thumbnails/thumb-' + filename, buffer, 'utf-8', () => null))
              .then(e => console.log(e));
          }),
      ),
    );
  })
  .then(() => {
    const json = JSON.stringify(images);
    fs.writeFile('src/scripts/bretagne/bretagne-test.json', json, 'utf-8', () => null);
  });
