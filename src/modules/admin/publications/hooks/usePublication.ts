import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';

import usePublicationStore from '@admin/publications/store/usePublicationStore';
import { ContentWithMetadata } from '@/types';

function usePublication() {
  const { setContentFiles } = usePublicationStore();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllPublications = async () => {
    setLoading(true);
    const { data }: AxiosResponse<ContentWithMetadata[]> = await axios.post(
      '/api/admin/publications/content/all',
      { withCredentials: true },
    );

    if (data) {
      setContentFiles(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getAllPublications();
      setLoading(false);
    })();
  }, []);

  return { getAllPublications, loading };
}

export default usePublication;
