'use client';

import React, { ReactElement } from 'react';

import HomePage from '@marketplace/pages/HomePage';
// import ReadiumReader from '@modules/readium/reader/ReadiumReader';
import dynamic from 'next/dynamic';

const ReadiumReader = dynamic(
  () => import('@modules/readium/reader/ReadiumReader'),
  {
    ssr: false,
  },
);

export default function Home(): ReactElement {
  return (
    <>
      {/*<HomePage />*/}
      <ReadiumReader />
    </>
  );
}
