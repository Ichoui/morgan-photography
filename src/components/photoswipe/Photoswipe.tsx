import React from 'react';

export function Photoswipe(prop: { test: string }): React.JSX.Element {
  const param = prop.test;
  return (
    <div>
      Mon Photoswipe ! {param}
      <div></div>
    </div>
  );
}
