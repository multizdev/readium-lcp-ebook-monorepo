import { create } from 'zustand';

import { Prisma } from '@prisma/client';
import { FormInstance } from 'antd';

export type ContentWithMetadata = Prisma.contentGetPayload<{
  include: { metadata: true };
}>;

type State = {
  metaDataFormInstance: FormInstance | null;
  contentFiles: ContentWithMetadata[];
  metaDataForm: string | null;
};

type Actions = {
  setMetaDataFormInstance: (metaDataFormInstance: FormInstance | null) => void;
  setContentFiles: (contentFiles: ContentWithMetadata[]) => void;
  setMetaDataForm: (metaDataForm: string | null) => void;
};

const defaultState: State = {
  metaDataFormInstance: null,
  contentFiles: [],
  metaDataForm: null,
};

const usePublicationStore = create<State & Actions>()((set) => ({
  ...defaultState,
  setMetaDataFormInstance: (metaDataFormInstance: FormInstance | null) =>
    set(() => ({ metaDataFormInstance })),
  setContentFiles: (contentFiles: ContentWithMetadata[]) =>
    set(() => ({ contentFiles: [...contentFiles] })),
  setMetaDataForm: (metaDataForm: string | null) =>
    set(() => ({ metaDataForm })),
}));

export default usePublicationStore;
