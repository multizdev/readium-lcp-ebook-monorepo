'use client';

import React, { ReactElement } from 'react';

import HomePage from '@marketplace/pages/HomePage';
import ReadiumReader from '@modules/readium/reader/ReadiumReader';

export default function Home(): ReactElement {
  return (
    <>
      {/*<HomePage />*/}
      <ReadiumReader manifestUrl={''} />
    </>
  );
}
