"use client";

import { useState, useMemo, useEffect } from "react";
import type { Descendant } from "slate";
import { isDescendantArray } from "@/lib/editor/utils";
import { useDebounce } from "@/hooks/useDebounce";
import {
  LOCAL_STORAGE_KEY_EDITING_ID,
  LOCAL_STORAGE_KEY_EDITING_TITLE,
  LOCAL_STORAGE_KEY_EDITING_BODY,
} from "@/lib/conform/constants";

type UseEditFormProps = {
  documentId: string;
  documentTitle: string;
  documentBody: string;
};

export const useEditForm = ({
  documentId,
  documentTitle,
  documentBody,
}: UseEditFormProps) => {
  const [savedId, setSavedId] = useState<string>("");
  const [idValue, setIdValue] = useState<string | null>(null);
  const [titleValue, setTitleValue] = useState<string | null>(null);
  const [initialValue, setInitialValue] = useState<Descendant[] | null>(null);
  const [editorValue, setEditorValue] = useState<Descendant[]>();
  const { debounceValue } = useDebounce(editorValue, 1000);
  const serializedEditorValue = useMemo(() => {
    return editorValue ? JSON.stringify(editorValue) : "";
  }, [editorValue]);

  useEffect(() => {
    const editingId = localStorage.getItem(LOCAL_STORAGE_KEY_EDITING_ID);

    if (!editingId) return;

    setSavedId(editingId);
  }, []);

  useEffect(() => {
    if (idValue !== null) return;

    if (!savedId) {
      setIdValue(documentId);
      localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_ID, documentId);
      console.log("!savedId");
      return;
    }

    if (savedId === documentId) {
      setIdValue(savedId);
      localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_ID, savedId);
      console.log("同じ記事にアクセスしました！");
      return;
    }

    setIdValue(documentId);
    localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_ID, documentId);
  }, [idValue, savedId, documentId]);

  // useEffect(() => {
  //   if (titleValue !== null) return;

  //   const editingId = localStorage.getItem(LOCAL_STORAGE_KEY_EDITING_ID);

  //   if (!editingId) {
  //     setTitleValue(documentTitle);
  //     localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_TITLE, documentTitle);
  //     return;
  //   }

  //   const editingTitle = localStorage.getItem(LOCAL_STORAGE_KEY_EDITING_TITLE);

  //   if (editingId === documentId && editingTitle) {
  //     setTitleValue(editingTitle);
  //     localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_TITLE, editingTitle);
  //     return;
  //   }

  //   setTitleValue(documentTitle);
  //   localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_TITLE, documentTitle);
  // }, [titleValue, documentId, documentTitle]);

  // useEffect(() => {
  //   if (initialValue !== null) return;

  //   const editingId = localStorage.getItem(LOCAL_STORAGE_KEY_EDITING_ID);

  //   const parsedBody = JSON.parse(documentBody);

  //   if (!editingId) {
  //     setInitialValue(parsedBody);
  //     setEditorValue(parsedBody);
  //     localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_BODY, documentBody);
  //     return;
  //   }

  //   const editingBody = localStorage.getItem(LOCAL_STORAGE_KEY_EDITING_BODY);

  //   if (!editingBody) {
  //     setInitialValue(parsedBody);
  //     setEditorValue(parsedBody);
  //     localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_BODY, documentBody);
  //     return;
  //   }

  //   const parsedEditingBody = JSON.parse(editingBody);

  //   if (!isDescendantArray(parsedEditingBody)) {
  //     setInitialValue(parsedBody);
  //     setEditorValue(parsedBody);
  //     localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_BODY, parsedEditingBody);
  //     return;
  //   }

  //   if (editingId === documentId && editingBody) {
  //     setInitialValue(parsedEditingBody);
  //     setEditorValue(parsedEditingBody);
  //     localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_BODY, editingBody);
  //     return;
  //   }

  //   setInitialValue(parsedBody);
  //   setEditorValue(parsedBody);
  //   localStorage.setItem(LOCAL_STORAGE_KEY_EDITING_BODY, parsedBody);
  // }, [initialValue, documentId, documentBody]);

  // useEffect(() => {
  //   if (debounceValue) {
  //     localStorage.setItem(
  //       LOCAL_STORAGE_KEY_EDITING_BODY,
  //       JSON.stringify(debounceValue),
  //     );
  //   }
  // }, [debounceValue]);

  return {
    idValue,
    titleValue,
    initialValue,
    setEditorValue,
    serializedEditorValue,
  };
};
