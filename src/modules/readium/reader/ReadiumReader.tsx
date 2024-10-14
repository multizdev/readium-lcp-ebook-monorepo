// components/ReaderComponent.js
'use client';

import React, { useState, useEffect, ReactElement, useRef } from 'react';

import { EpubNavigatorListeners, EpubNavigator } from '@readium/navigator';
import {
  Fetcher,
  HttpFetcher,
  Link,
  Manifest,
  Publication,
} from '@readium/shared';
// import dynamic from 'next/dynamic';

function ReadiumReader(): ReactElement {
  const [publication, setPublication] = useState<typeof Publication | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublication = async () => {
      try {
        const publicationURL =
          'http://localhost:8989/contents/5c86d480-5510-4232-a644-9ebc9b044d8c';
        const fetcher: Fetcher = new HttpFetcher(undefined, publicationURL);

        const manifestLink = new Link({
          href: 'http://localhost:3000/manifest.json',
        });
        const fetched = fetcher.get(manifestLink);
        const selfLink = (await fetched.link()).toURL(publicationURL)!;

        const manifest = (await fetched.readAsJSON()) as unknown;
        const deserializedManifest = Manifest.deserialize(manifest as string);
        deserializedManifest?.setSelfLink(selfLink);

        const pub = new Publication({
          manifest: deserializedManifest!,
          fetcher: fetcher,
        });
        setPublication(pub);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load the manifest', error);
      }
    };

    loadPublication();
  }, []);

  useEffect(() => {
    if (publication && containerRef.current) {
      const listeners: EpubNavigatorListeners = {
        frameLoaded: (_wnd: Window) => {
          console.log('Frame loaded');
        },
        positionChanged: (_locator) => {
          console.log('Position changed');
        },
      };

      const navigator = new EpubNavigator(
        containerRef.current,
        publication,
        listeners,
      );
      navigator.load().then(() => {
        console.log('Navigator loaded');
      });
    }
  }, [publication]);

  return (
    <div>
      {loading ? (
        <p>Loading publication...</p>
      ) : (
        <div>
          <header>
            <h3>
              {publication?.manifest.metadata.title.getTranslation('en') ||
                'Untitled'}
            </h3>
          </header>
          <div
            ref={containerRef}
            id="reader-container"
            style={{ width: '100%', height: '100vh' }}
          >
            {/* This is where the publication will be rendered */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadiumReader;
