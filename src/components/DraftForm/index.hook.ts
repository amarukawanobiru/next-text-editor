"use client";

import { useState, useEffect } from "react";
import type { Descendant } from "slate";
import { isDescendantArray } from "@/lib/editor/utils";
import { useDebounce } from "@/hooks/useDebounce";
import {
  LOCAL_STORAGE_KEY_DRAFT_TITLE,
  LOCAL_STORAGE_KEY_DRAFT_BODY,
} from "@/lib/editor/constants";

const defaultValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

export const useDraftForm = () => {
  const [titleField, setTitleField] = useState<string | null>(null);
  const [initialValue, setInitialValue] = useState<Descendant[] | null>(null);
  const [editorValue, setEditorValue] = useState<Descendant[]>();
  const { debounceValue } = useDebounce(editorValue, 1000);

  useEffect(() => {
    if (titleField !== null) return;

    const draftTitle = localStorage.getItem(LOCAL_STORAGE_KEY_DRAFT_TITLE);

    if (!draftTitle) {
      setTitleField("");
      return;
    }

    setTitleField(draftTitle);
  }, [titleField]);

  useEffect(() => {
    if (initialValue) return;

    const draftBody = localStorage.getItem(LOCAL_STORAGE_KEY_DRAFT_BODY);

    if (!draftBody) {
      setInitialValue(defaultValue);
      return;
    }

    const parsedBody = JSON.parse(draftBody);

    if (!isDescendantArray(parsedBody)) {
      localStorage.removeItem(LOCAL_STORAGE_KEY_DRAFT_BODY);
      setInitialValue(defaultValue);
      setEditorValue(defaultValue);
      return;
    }

    setInitialValue(parsedBody);
    setEditorValue(parsedBody);
  }, [initialValue]);

  useEffect(() => {
    if (debounceValue) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_DRAFT_BODY,
        JSON.stringify(debounceValue),
      );
    }
  }, [debounceValue]);

  return { titleField, initialValue, setEditorValue };
};
