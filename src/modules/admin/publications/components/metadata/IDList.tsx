import React from 'react';

import { List } from 'antd';

import usePublicationStore from '@admin/publications/store/usePublicationStore';
import usePublication from '@admin/publications/hooks/usePublication';

function IDList() {
  const { contentFiles } = usePublicationStore();
  const { loading } = usePublication();

  return (
    <List
      loading={loading}
      className="w-full bg-white"
      header={
        <div className="h-[60px] flex justify-center items-center font-bold text-xl">
          eNova ID
        </div>
      }
      bordered
      dataSource={contentFiles}
      pagination={{ pageSize: 50 }}
      renderItem={(item) => (
        <List.Item>
          <div className="w-full h-[100px] flex flex-col justify-center">
            <div>
              <span className="font-bold">Name: </span>
              <span>{item.location.split('\\').pop()}</span>
            </div>
            <div>
              <span className="font-bold">ID: </span>
              <span>{item.id}</span>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
}

export default IDList;
