import React, { ReactElement } from 'react';

import { Button, List, Spin, Upload } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import usePublicationStore, {
  ContentWithMetadata,
} from '@admin/publications/store/usePublicationStore';
import usePublication from '@admin/publications/hooks/usePublication';
import useUpload from '@admin/publications/hooks/useUpload';

const { Dragger } = Upload;

function UploadedFile({ item }: { item: ContentWithMetadata }): ReactElement {
  const { metaDataFormInstance, setMetaDataForm } = usePublicationStore();

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
                  setMetaDataForm(item.id);
                  metaDataFormInstance.setFieldsValue(item.metadata[0]);
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

function ContentUpload(): ReactElement {
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
      renderItem={(item) => <UploadedFile item={item} />}
    />
  );
}

export default ContentUpload;