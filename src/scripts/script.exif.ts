import * as fs from 'fs';
import exifr from 'exifr';
import { Exif } from 'interfaces/global.interface';
import sizeOf from 'image-size';
import Fraction from 'fraction.js';

/**
 * USAGE :
 * @identifier const is the global identifier for each photo batch
 * /public/assets/photos must contain a folder with JPG images, and must be named with identifier name
 * Change the identifier will generate a new identifier.json file
 *
 * */
///////////////////////////////////////////////////////////////////////////////////////////////////////
const identifier = 'vestlandet'; // Must be the folder name too (public/assets/photos/IDENTIFIER)
///////////////////////////////////////////////////////////////////////////////////////////////////////
const publicFolder = './public';
const path = `/assets/photos/${identifier}/`;
const pathThumbnails = `/assets/photos/${identifier}/thumbnails/`;
const arrayFormatedExif: Exif[] = [];

// Remove folder with thumbnails if we regenerate script
if (fs.existsSync(publicFolder + pathThumbnails)) {
  fs.rmSync(publicFolder + pathThumbnails, { recursive: true, force: true });
}

// https://stackoverflow.com/questions/71276453/get-all-images-exif-and-pass-to-route-as-object
fs.promises
  .readdir(publicFolder + path)
  .then((filenames: string[]) => {
    return Promise.all(
      filenames.map(filename =>
        exifr
          .parse(publicFolder + path + filename)
          .then(brutExif => {
            // console.log(brutExif);
            // console.log('NEXT ONE NEXT ONE NEXT ONE NEXT ONE');
            const dimensions = sizeOf(publicFolder + path + filename);
            const imageName = filename?.length > 0 ? filename.split('_')[1]?.split('.')[0] : '';
            return {
              identifier,
              localUrl: path + filename,
              thumbUrl: path + 'thumbnails/thumb-' + filename,
              author: brutExif.Artist,
              apn: brutExif.Model,
              lensModel: brutExif.LensModel,
              focale: brutExif.FocalLength,
              date: brutExif.CreateDate,
              width: dimensions.width,
              height: dimensions.height,
              imageName,
              triangle: {
                ISO: brutExif.ISO,
                exposureTime: fraction(brutExif.ExposureTime),
                fValue: brutExif.FNumber,
              },
            };
          })
          .then((exif: Exif) => {
            arrayFormatedExif.push(exif);
            fs.mkdirSync(publicFolder + pathThumbnails, { recursive: true });
            exifr
              .thumbnail(publicFolder + exif.localUrl)
              .then((buffer: any) => fs.writeFile(publicFolder + pathThumbnails + 'thumb-' + filename, buffer, 'utf-8', () => null));
          }),
      ),
    );
  })
  .then(() => {
    const json = JSON.stringify(arrayFormatedExif);
    fs.writeFile(publicFolder + '/assets/jsonExif/' + identifier + '.json', json, 'utf-8', () => null);
  });

function fraction(decimal: number): string {
  const rightCommaPart = decimal.toString().split('.')[1];
  if (rightCommaPart?.length > 1) {
    const fraction = new Fraction(decimal);
    // si 2 chiffres après la virgule -> en fraction
    return fraction.n + '/' + fraction.d;
  } else {
    if (decimal >= 1) {
      // Les valeurs qui ont plus de 1 sec d'expositions
      return decimal.toString();
    } else {
      // sinon on met en second classique genre 0"8s
      const leftCommaPart = decimal.toString().split('.')[0];
      return leftCommaPart + '"' + rightCommaPart;
    }
  }
}
