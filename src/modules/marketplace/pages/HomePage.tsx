'use client';

import MainContent from '@marketplace/components/content/MainContent';
import MainNavigation from '@marketplace/components/navigation/MainNavigation';

function HomePage() {
  return <MainNavigation content={<MainContent />} />;
}

export default HomePage;
