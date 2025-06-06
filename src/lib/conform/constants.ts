export type FormType = "draft" | "edit";

export const LOCAL_STORAGE_KEY_DRAFT_TITLE = "draft-title";
export const LOCAL_STORAGE_KEY_DRAFT_BODY = "draft-body";

export const LOCAL_STORAGE_KEY_EDIT_ID = "edit-id";
export const LOCAL_STORAGE_KEY_EDIT_TITLE = "edit-title";
export const LOCAL_STORAGE_KEY_EDIT_BODY = "edit-body";

export const STORAGE_CONFIG = {
  draft: {
    title: LOCAL_STORAGE_KEY_DRAFT_TITLE,
    body: LOCAL_STORAGE_KEY_DRAFT_BODY,
  },
  edit: {
    id: LOCAL_STORAGE_KEY_EDIT_ID,
    title: LOCAL_STORAGE_KEY_EDIT_TITLE,
    body: LOCAL_STORAGE_KEY_EDIT_BODY,
  },
} as const;
