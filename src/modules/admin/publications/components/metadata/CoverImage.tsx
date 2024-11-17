import React, { ReactElement } from 'react';

import Image from 'next/image';

import { List, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import usePublicationStore from '@admin/publications/store/usePublicationStore';
import useCoverImage from '@admin/publications/hooks/useCoverImage';
import usePublication from '@admin/publications/hooks/usePublication';
import { ContentWithMetadata } from '@/types';

function FileContainer({ item }: { item: ContentWithMetadata }): ReactElement {
  const { fileList, customRequest, onChange, onPreview, coverImageUrl } =
    useCoverImage(item);

  const fileName = item.location.split('\\').pop() || '';

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
        {coverImageUrl ? (
          <ImgCrop rotationSlider>
            <Upload
              multiple={false}
              listType="picture-card"
              fileList={fileList}
              customRequest={customRequest}
              onChange={onChange}
              onPreview={onPreview}
            >
              <Image
                className="w-[100px] h-[100px] rounded-xl"
                src={coverImageUrl}
                width={200}
                height={200}
                alt="Cover Image"
              />
            </Upload>
          </ImgCrop>
        ) : (
          <ImgCrop rotationSlider>
            <Upload
              multiple={false}
              listType="picture-card"
              fileList={fileList}
              customRequest={customRequest}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        )}
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
