export interface ExposureTriangle {
  ISO: number;
  exposureTime: string;
  fValue: number;
}

export interface Exif {
  identifier: string;
  localUrl: string;
  thumbUrl: string;
  author: string;
  apn: string;
  lensModel: string;
  focale: number;
  date: Date;
  width: number | undefined;
  height: number | undefined;
  triangle: ExposureTriangle;
}
