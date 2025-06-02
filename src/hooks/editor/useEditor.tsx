"use client";

import { useMemo, useCallback } from "react";
import { createEditor } from "slate";
import {
  type RenderElementProps,
  type RenderLeafProps,
  withReact,
} from "slate-react";
import { withHistory } from "slate-history";
import { withImages } from "@/lib/editor/withImages";
import { Element } from "@/components/editor/Element";
import { Leaf } from "@/components/editor/Leaf";

export const useEditor = () => {
  const editor = useMemo(
    () => withHistory(withImages(withReact(createEditor()))),
    [],
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );

  return { editor, renderElement, renderLeaf };
};
