import { useState } from 'react';

import { message, UploadProps } from 'antd';

import axios from 'axios';

import usePublication from '@admin/publications/hooks/usePublication';
import usePublicationStore from '@admin/publications/store/usePublicationStore';

function useUpload() {
  const { getAllPublications } = usePublication();
  const { setMetaDataForm } = usePublicationStore();

  const [uploading, setUploading] = useState<boolean>(false);

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post('/api/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMetaDataForm(data.contentId);

      console.log('UPLOAD DATA', data);

      if (onSuccess) onSuccess(data);
      message.success(`Customer Request file uploaded successfully.`);
      await getAllPublications();
    } catch (error) {
      if (error instanceof Error && onError) {
        console.error(error);
        onError(error);
        message.error(`Customer Request file upload failed.`);
      }
    } finally {
      setUploading(false);
    }
  };

  const props: UploadProps = {
    className: 'w-full',
    name: 'file',
    multiple: false,
    action: '/api/admin/upload',
    showUploadList: false,
    customRequest,
  };

  return { props, uploading };
}

export default useUpload;
