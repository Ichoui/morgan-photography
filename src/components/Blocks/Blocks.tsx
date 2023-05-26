import React from 'react';
import {Exif} from "interfaces/global.interface";

export const Blocks = (props: {identifier: string, images: Exif[]}): React.JSX.Element => {
  return <div className='Blocks'>
      {props.identifier}
  </div>;
};
