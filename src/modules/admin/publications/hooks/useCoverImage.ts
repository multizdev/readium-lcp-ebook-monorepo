import { useEffect, useState } from 'react';

import axios from 'axios';
import { type GetProp, message, UploadFile, type UploadProps } from 'antd';

import { ContentWithMetadata } from '@/types';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function useCoverImage(item: ContentWithMetadata) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  // Function to check if cover image exists
  const checkCoverImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_IMAGE_HOST}/publications/cover-images/${item.id}.png?timestamp=${new Date().getTime()}`,
      );

      if (response.status === 200) {
        setCoverImageUrl(
          `${process.env.NEXT_PUBLIC_IMAGE_HOST}/publications/cover-images/${item.id}.png?timestamp=${new Date().getTime()}`,
        );
      }
    } catch (error) {
      // If the image does not exist, proceed with showing the upload component
      setCoverImageUrl(null);
    }
  };

  useEffect(() => {
    (async () => checkCoverImage())();
  }, [item]);

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', item.id + '');

    try {
      const { data } = await axios.post(
        '/api/admin/publications/cover-image/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            if (event.total) {
              onProgress({ percent: (event.loaded / event.total) * 100 });
            }
          },
        },
      );

      onSuccess(data);
      message.success(`File uploaded successfully.`);
    } catch (error) {
      console.error(error);
      onError(error);
      message.error(`File upload failed.`);
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return { onPreview, onChange, customRequest, fileList, coverImageUrl };
}

export default useCoverImage;
