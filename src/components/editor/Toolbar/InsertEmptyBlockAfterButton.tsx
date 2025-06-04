"use client";

import { Editor, Element as SlateElement, Path, Transforms } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import type { CustomElement } from "@/types/slate";
import { Button } from "@/components/ui/button";
import { CornerDownLeftIcon } from "lucide-react";

export const InsertEmptyBlockAfterButton = () => {
  const editor = useSlate();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const { selection } = editor;

    if (!selection) return;

    const [match] = Editor.nodes(editor, {
      match: (n): n is CustomElement =>
        SlateElement.isElement(n) && Editor.isBlock(editor, n),
    });

    if (!match) return;

    const [_, path] = match;
    const nextPath = Path.next(path);

    Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
      { at: nextPath },
    );

    Transforms.select(editor, {
      anchor: { path: [...nextPath, 0], offset: 0 },
      focus: { path: [...nextPath, 0], offset: 0 },
    });

    ReactEditor.focus(editor);
  };

  return (
    <Button
      onMouseDown={handleMouseDown}
      variant="ghost"
      size="icon"
      className="rounded-xs"
    >
      <CornerDownLeftIcon />
    </Button>
  );
};
