import { type FormType, STORAGE_CONFIG } from "@/lib/conform/constants";

type StorageKeys = {
  idKey?: string;
  titleKey: string;
  bodyKey: string;
};

export const getDraftStorageKeys = () => ({
  titleKey: STORAGE_CONFIG.draft.title,
  bodyKey: STORAGE_CONFIG.draft.body,
});

export const getEditStorageKeys = () => ({
  idKey: STORAGE_CONFIG.edit.id,
  titleKey: STORAGE_CONFIG.edit.title,
  bodyKey: STORAGE_CONFIG.edit.body,
});

export const getStorageKeys = (formType: FormType): StorageKeys => {
  switch (formType) {
    case "draft":
      return getDraftStorageKeys();
    case "edit":
      return getEditStorageKeys();
    default: {
      const _exhaustiveCheck: never = formType;
      throw new Error(`Unsupported form type: ${_exhaustiveCheck}`);
    }
  }
};
