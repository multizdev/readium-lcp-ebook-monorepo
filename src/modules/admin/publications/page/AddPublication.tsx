import React, { ReactElement, useRef } from 'react';

import { Divider } from 'antd';

import UploadPublication from '@admin/publications/components/add/UploadPublication';
import MetaDataForm from '@admin/publications/components/metadata/MetaDataForm';
import ContentUpload from '@admin/publications/components/add/ContentUpload';
import CoverImage from '@admin/publications/components/metadata/CoverImage';
import IDList from '@admin/publications/components/metadata/IDList';

function AddPublication(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col gap-8 p-4 lg:p-12 overflow-y-auto"
    >
      <div className="w-full">
        <span className="font-bold text-3xl">ADD PUBLICATIONS</span>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full">
          <UploadPublication />
        </div>
        <div className="w-full flex flex-col gap-4 pl-12">
          <MetaDataForm />
        </div>
      </div>
      <Divider orientation="left">Upload Files</Divider>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <ContentUpload onScrollToTop={scrollToTop} />
        <CoverImage />
        <IDList />
      </div>
    </div>
  );
}

export default AddPublication;
