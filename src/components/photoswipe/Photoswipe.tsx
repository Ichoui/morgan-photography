import React from 'react';

export function Photoswipe(prop: { test: string }): React.JSX.Element {
  const av = prop.test;
  return <div>Test pour photoswipe! {av}</div>;
}
