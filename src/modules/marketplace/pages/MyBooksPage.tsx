import React, { ReactElement } from 'react';
import MainContent from '@marketplace/components/content/MainContent';

function MyBooksPage(): ReactElement {
  return <MainContent url="/api/user/books/purchased" />;
}

export default MyBooksPage;
