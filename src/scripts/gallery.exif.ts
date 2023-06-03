import { Block } from 'interfaces/global.interface';



/**
 *
 * @identifier nom de l'album
 * @jsonPath path vers le json issu du script
 * @blockThumbnail miniature affiché sur la gallerie d'album (a choisir soi-même dans le dossier public/assets/photos/identifier/thumbnails)
 * @date date des prises de vue
 * */
export const galleryBlocks: Block[] = [
  {
    identifier: 'maple',
    jsonPath: 'assets/jsonExif/maple.json',
    blockThumbnail: 'assets/photos/maple/thumbnails/thumb-1.jpg',
    date: new Date('2094-09-19'),
  },
  {
    identifier: 'bretagne',
    jsonPath: 'assets/jsonExif/bretagne.json',
    blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
    date: new Date('2023-05-01'),
  },  {
    identifier: 'gavarnie',
    jsonPath: 'assets/jsonExif/gavarnie.json',
    blockThumbnail: 'assets/photos/gavarnie/thumbnails/thumb-411A1874.jpg',
    date: new Date('2023-04-01'),
  },
];
