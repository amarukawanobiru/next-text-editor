export type FormType = "draft" | "edit";

export const LOCAL_STORAGE_KEY_DRAFT_TITLE = "draft-title";
export const LOCAL_STORAGE_KEY_DRAFT_BODY = "draft-body";

export const LOCAL_STORAGE_KEY_EDITING_ID = "editing-id";
export const LOCAL_STORAGE_KEY_EDITING_TITLE = "editing-title";
export const LOCAL_STORAGE_KEY_EDITING_BODY = "editing-body";

export const STORAGE_CONFIG = {
  draft: {
    title: LOCAL_STORAGE_KEY_DRAFT_TITLE,
    body: LOCAL_STORAGE_KEY_DRAFT_BODY,
  },
  edit: {
    id: LOCAL_STORAGE_KEY_EDITING_ID,
    title: LOCAL_STORAGE_KEY_EDITING_TITLE,
    body: LOCAL_STORAGE_KEY_EDITING_BODY,
  },
} as const;
