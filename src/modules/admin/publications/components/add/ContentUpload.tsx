import React, { ReactElement } from 'react';

import { Button, List, Spin, Upload } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import usePublication from '@admin/publications/hooks/usePublication';
import useUpload from '@admin/publications/hooks/useUpload';
import usePublicationStore from '@admin/publications/store/usePublicationStore';
import { ContentWithMetadata } from '@/types';

const { Dragger } = Upload;

function UploadedFile({
  item,
  onScrollToTop,
}: {
  item: ContentWithMetadata;
  onScrollToTop: () => void;
}): ReactElement {
  const { metaDataFormInstance, setMetaDataForm, setMetaDataFormId } =
    usePublicationStore();

  return (
    <List.Item>
      <div className="w-full h-[100px] flex flex-col justify-center rounded-xl overflow-hidden gap-2">
        <div className="w-full h-[40px] flex items-center gap-2">
          <span className="h-full py-4 px-4 flex items-center font-bold bg-primary border border-gray-200 rounded-xl shadow-sm text-white">
            FileName
          </span>
          <div className="w-full h-full py-4 px-4 flex justify-between items-center border border-gray-200 rounded-xl shadow-sm">
            <span>{item.location.split('\\').pop()}</span>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                if (metaDataFormInstance) {
                  if (item.metadata[0]) {
                    setMetaDataForm(item.id);
                    setMetaDataFormId(item.metadata[0].id);
                    metaDataFormInstance.setFieldsValue(item.metadata[0]);
                  }
                  if (!item.metadata[0]) {
                    setMetaDataForm(item.id);
                    metaDataFormInstance.resetFields();
                  }
                  onScrollToTop(); // Scroll to top on button click
                }
              }}
            />
          </div>
        </div>
        {item.metadata[0] && (
          <div className="w-full h-[40px] flex items-center justify-between py-6 px-4 border border-gray-200 rounded-xl shadow-sm">
            <div className="flex flex-col">
              <span className="font-bold">Title</span>
              <span>{item.metadata[0].title}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Authors</span>
              <span>{item.metadata[0].authors.join(', ')}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Categories</span>
              <span>{item.metadata[0].categories.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    </List.Item>
  );
}

function ContentUpload({
  onScrollToTop,
}: {
  onScrollToTop: () => void;
}): ReactElement {
  const { contentFiles } = usePublicationStore();
  const { loading } = usePublication();
  const { props, uploading } = useUpload();

  return (
    <List
      loading={loading}
      className="w-full bg-white"
      header={
        <Dragger {...props} className="w-full h-full">
          <span className="font-bold text-xl">Content File</span>
          {uploading && <Spin />}
        </Dragger>
      }
      bordered
      dataSource={contentFiles}
      pagination={{ pageSize: 50 }}
      renderItem={(item) => (
        <UploadedFile item={item} onScrollToTop={onScrollToTop} />
      )}
    />
  );
}

export default ContentUpload;
