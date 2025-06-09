"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { Descendant } from "slate";
import { isDescendantArray } from "@/lib/editor/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { getStorageKeys } from "@/lib/conform/utils";

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
  const storageKeys = getStorageKeys("edit");
  const [idValue, setIdValue] = useState<string | null>(null);
  const [titleValue, setTitleValue] = useState<string | null>(null);
  const [initialValue, setInitialValue] = useState<Descendant[] | null>(null);
  const [editorValue, setEditorValue] = useState<Descendant[]>();
  const { debounceValue } = useDebounce(editorValue, 1000);
  const serializedEditorValue = useMemo(() => {
    return editorValue ? JSON.stringify(editorValue) : "";
  }, [editorValue]);

  const setItemToLocalStorage = useCallback(
    (values: string[]) => {
      Object.values(storageKeys).forEach((el, i) =>
        localStorage.setItem(el, values[i]),
      );
    },
    [storageKeys],
  );

  const setEditingValues = useCallback(
    ({ id, title, body }: { id: string; title: string; body: string }) => {
      const parsedBody = JSON.parse(body);

      setIdValue(id);
      setTitleValue(title);
      setInitialValue(parsedBody);
      setEditorValue(parsedBody);
      setItemToLocalStorage([id, title, body]);
    },
    [setItemToLocalStorage],
  );

  useEffect(() => {
    if (idValue) return;

    const editingId = localStorage.getItem(storageKeys.idKey as string);
    const editingTitle = localStorage.getItem(storageKeys.titleKey);
    const editingBody = localStorage.getItem(storageKeys.bodyKey);

    if (!editingId || !editingTitle || !editingBody) {
      setEditingValues({
        id: documentId,
        title: documentTitle,
        body: documentBody,
      });
      return;
    }

    if (!isDescendantArray(JSON.parse(editingBody))) {
      setEditingValues({
        id: documentId,
        title: documentTitle,
        body: documentBody,
      });
      return;
    }

    if (editingId === documentId) {
      setEditingValues({
        id: editingId,
        title: editingTitle,
        body: editingBody,
      });
      return;
    }

    setEditingValues({
      id: documentId,
      title: documentTitle,
      body: documentBody,
    });
  }, [
    idValue,
    storageKeys,
    documentId,
    documentTitle,
    documentBody,
    setEditingValues,
  ]);

  useEffect(() => {
    if (debounceValue) {
      localStorage.setItem(storageKeys.bodyKey, JSON.stringify(debounceValue));
    }
  }, [debounceValue, storageKeys.bodyKey]);

  return {
    idValue,
    titleValue,
    initialValue,
    setEditorValue,
    serializedEditorValue,
  };
};
