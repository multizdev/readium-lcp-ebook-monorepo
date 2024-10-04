import React, { ReactElement } from 'react';

import { Spin, Upload } from 'antd';

import { FiUploadCloud } from 'react-icons/fi';

import useUpload from '@admin/publications/hooks/useUpload';
import { COLOR_PRIMARY } from '@admin/common/constants';

const { Dragger } = Upload;

function UploadPublication(): ReactElement {
  const { props, uploading } = useUpload();

  return (
    <Dragger {...props}>
      <div className="w-full flex justify-center items-center ant-upload-drag-icon">
        <FiUploadCloud color={COLOR_PRIMARY} size={40} />
      </div>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
      {uploading && <Spin />}
    </Dragger>
  );
}

export default UploadPublication;
