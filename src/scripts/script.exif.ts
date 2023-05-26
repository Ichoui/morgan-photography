import * as fs from 'fs';
import exifr from 'exifr';
import { Exif } from 'interfaces/global.interface';
import sizeOf from 'image-size';


/**
 * USAGE :
 * @identifier const is the global identifier for each photo batch
 * /src/assets/photos must contain a folder with JPG images, and must be named with identifier name
 * Change the identifier will generate a new identifier.json file
 *
 * */
const identifier = 'maple'; // Should be folder name too
const folder = `./src/assets/photos/${identifier}/`;
const folderThumbnails = `./src/assets/photos/${identifier}/thumbnails/`;
const arrayFormatedExif: Exif[] = [];

// Remove folder with thumbnails if we regenerate script
if (fs.existsSync(folderThumbnails)) {
  fs.rmSync(folderThumbnails, { recursive: true, force: true });
}

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
          .then((exif: Exif) => {
            arrayFormatedExif.push(exif);
            fs.mkdirSync(folderThumbnails, {recursive: true});
            exifr.thumbnail(exif.localUrl).then((buffer: any) => fs.writeFile(folderThumbnails + 'thumb-' + filename, buffer, 'utf-8', () => null));
          }),
      ),
    );
  })
  .then(() => {
    const json = JSON.stringify(arrayFormatedExif);
    fs.writeFile('src/scripts/' + identifier + '.json', json, 'utf-8', () => null);
  });
