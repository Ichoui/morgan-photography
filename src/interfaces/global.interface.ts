export interface ExposureTriangle {
  ISO: number;
  exposureTime: number;
  fValue: number;
}

export interface Exif {
  localUrl: string;
  author: string;
  apn: string;
  lensModel: string;
  focale: number;
  date: Date;
  width: number;
  height: number;
  triangle: ExposureTriangle;
}
