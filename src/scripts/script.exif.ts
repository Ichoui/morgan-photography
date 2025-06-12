import * as fs from 'fs';
import exifr from 'exifr';
// import { Exif } from 'interfaces/global.interface';
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
const identifier = 'pyrenees'; // Must be the folder name too (public/assets/photos/IDENTIFIER)
///////////////////////////////////////////////////////////////////////////////////////////////////////
const publicFolder = './public';
const path = `/assets/photos/${identifier}/`;
const pathThumbnails = `/assets/photos/${identifier}/thumbnails/`;
const arrayFormatedExif: any[] = [];
const manuelAddToTitle = '';

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
            let imageName = '';
            let extension = '';
            if (filename.split('_').length > 2) {
              // New Format : 411A1850_city=null_place=Gavarnie, Pyrénées_region=null_pays=France.jpg
              const parts = filename.split('_');
              // const cityPart = parts.find(part => part.startsWith('city='));
              // const placePart = parts.find(part => part.startsWith('place='));
              // const regionPart = parts.find(part => part.startsWith('region='));
              // const countryPart = parts.find(part => part.startsWith('pays='));
              // const city = cityPart ? cityPart.split('=')[1] : '';
              // const place = placePart ? placePart.split('=')[1] : '';
              // const region = regionPart ? regionPart.split('=')[1] : '';
              // const country = countryPart ? countryPart.split('=')[1] : '';

              // const city = parts.find(part => part.startsWith('city='))?.split('=')[1] || '';
              // const place = parts.find(part => part.startsWith('place='))?.split('=')[1] || '';
              // const region = parts.find(part => part.startsWith('region='))?.split('=')[1] || '';
              // const country = parts.find(part => part.startsWith('pays='))?.split('=')[1].split('.')[0] || '';
              // const extension = parts.find(part => part.startsWith('pays='))?.split('=')[1].split('.')[1] || '';
              // console.log(parts, place, city, region, country);
              // const separator = (place !== 'null' || city !== 'null') && (region !== 'null' || country !== null) ? '|' : '';
              // imageName = `${place !== 'null' ? place + ',' : ''}${city !== 'null' ? city + ' ' : ''}${separator}${
              //   region !== 'null' ? region + ', ' : ''
              // }${country !== 'null' ? country + '' : ''}`.trim();

              const getValue = (key: string) => {
                const match = parts.find(part => part.startsWith(`${key}=`));
                const value = match?.split('=')[1];
                return value && value !== 'null' ? value : '';
              };

              const place = getValue('place');
              const city = getValue('city');
              const region = getValue('region');

              const pays = getValue('pays');
              const [country = '', ext = ''] = pays ? pays.split('.') : [];

              // Première partie : "place, city"
              const location = [place, city].filter(Boolean).join(', ');

              // Deuxième partie : "region, country"
              const area = [region, country].filter(Boolean).join(', ');

              // Ajouter un séparateur si les deux parties existent
               imageName = [location, area].filter(Boolean).join(' | ');
               extension = ext;
            } else {
              // Old format : 11092023-411A3116_St John's, NL.jpg OR 11092023-411A3116.jpg (without place)
              if (manuelAddToTitle.length > 0) {
              }
              imageName = filename?.length > 0 ? filename.split('_')[1]?.split('.')[0] : '';
            }

            console.log(filename, filename.split('_').length, imageName, extension);
            // return;
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
          .then((exif: any) => {
            // return;
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
