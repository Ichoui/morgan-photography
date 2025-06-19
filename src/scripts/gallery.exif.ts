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
    name: 'Maple',
    jsonPath: 'assets/jsonExif/maple.json',
    blockThumbnail: 'assets/photos/maple/thumbnails/thumb-1.jpg',
    date: new Date('2094-09-19'),
  },
  {
    identifier: 'divers',
    name: 'Divers',
    jsonPath: 'assets/jsonExif/divers.json',
    blockThumbnail: 'assets/photos/divers/thumbnails/thumb-411A2778.jpg',
    date: new Date('2090-09-19'),
  },
  {
    identifier: 'cyclisme',
    name: 'Cyclisme',
    jsonPath: 'assets/jsonExif/cyclisme.json',
    blockThumbnail: 'assets/photos/cyclisme/thumbnails/thumb-411A5441_city=Montréal_place=Julian, Matthews, Pogacar, De Lie, Girmay_region=null_pays=Canada.jpg',
    date: new Date('2024-09-15'),
  },
  {
    identifier: 'bretagne',
    name: 'Bretagne',
    jsonPath: 'assets/jsonExif/bretagne.json',
    blockThumbnail: 'assets/photos/bretagne/thumbnails/thumb-411A2002.jpg',
    date: new Date('2023-05-01'),
  },
  {
    identifier: 'pyrenees',
    name: 'Pyrénées',
    jsonPath: 'assets/jsonExif/pyrenees.json',
    blockThumbnail: 'assets/photos/pyrenees/thumbnails/thumb-411A1874_city=null_place=Gavarnie, Pyrénées_region=null_pays=France.jpg',
    date: new Date('2023-04-01'),
  },
  {
    identifier: 'newfoundland23',
    name: 'Terre-Neuve et les Maritimes',
    jsonPath: 'assets/jsonExif/newfoundland23.json',
    blockThumbnail: 'assets/photos/newfoundland23/thumbnails/thumb-13092023-411A3310_Bonavista, NL.jpg',
    date: new Date('2023-09-01'),
  },
  {
    identifier: 'vestlandet',
    name: 'Vestlandet Fjørds',
    jsonPath: 'assets/jsonExif/vestlandet.json',
    blockThumbnail: 'assets/photos/vestlandet/thumbnails/thumb-03122023-411A4796-HDR_city=null_place=Ålesund Islands_region=null_pays=Norvège.jpg',
    date: new Date('2023-12-01'),
  },
];
