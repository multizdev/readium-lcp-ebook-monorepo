'use client';

import React, { ReactElement } from 'react';

import localFont from 'next/font/local';

import { AntdRegistry } from '@ant-design/nextjs-registry';

import { SWRConfig } from 'swr';

import '@/app/globals.css';
import MainNavigation from '@marketplace/components/navigation/MainNavigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactElement;
}>): ReactElement {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <SWRConfig
            value={{
              refreshInterval: 3000,
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <MainNavigation content={children} />
            {/*children*/}
          </SWRConfig>
        </AntdRegistry>
      </body>
    </html>
  );
}
