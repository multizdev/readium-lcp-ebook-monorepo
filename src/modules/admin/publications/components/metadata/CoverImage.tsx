import React, { ReactElement } from 'react';

import { List, Upload, UploadFile } from 'antd';
import ImgCrop from 'antd-img-crop';

import usePublicationStore from '@admin/publications/store/usePublicationStore';
import useCoverImage from '@admin/publications/hooks/useCoverImage';
import usePublication from '@admin/publications/hooks/usePublication';
import { ContentWithMetadata } from '@/types';

function FileContainer({ item }: { item: ContentWithMetadata }): ReactElement {
  const { fileList, customRequest, onChange, onPreview, coverImageUrl } =
    useCoverImage(item);

  const fileName = item.location.split('\\').pop() || '';

  // Define the formatted file list with the correct type
  const formattedFileList: UploadFile[] = coverImageUrl
    ? [
        {
          uid: '-1',
          name: 'Cover Image',
          status: 'done', // Ensure this matches the `UploadFileStatus` type
          url: coverImageUrl,
        } as UploadFile,
      ]
    : fileList;

  return (
    <List.Item>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold">FileName:</span>
          <span>
            {fileName.length > 35
              ? `${fileName.slice(0, 25)}...${fileName.slice(-8)}`
              : fileName}
          </span>
        </div>
        <ImgCrop rotationSlider>
          <Upload
            multiple={false}
            listType="picture-card"
            fileList={formattedFileList}
            customRequest={customRequest}
            onChange={onChange}
            onPreview={onPreview}
          >
            {'+ Upload'}
          </Upload>
        </ImgCrop>
      </div>
    </List.Item>
  );
}

function CoverImage(): ReactElement {
  const { contentFiles } = usePublicationStore();
  const { loading } = usePublication();

  return (
    <List
      loading={loading}
      className="w-full bg-white"
      header={
        <span className="h-[60px] flex justify-center items-center font-bold text-xl">
          Cover Image
        </span>
      }
      bordered
      dataSource={contentFiles}
      pagination={{ pageSize: 50 }}
      renderItem={(item) => <FileContainer item={item} />}
    />
  );
}

export default CoverImage;
