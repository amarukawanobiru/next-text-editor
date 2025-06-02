import { Editor, Range, Element as SlateElement, Transforms } from "slate";
import type {
  CustomEditor,
  CustomTextKey,
  ImageElement,
  ParagraphElement,
} from "@/types/slate";
import {
  type CustomElementFormat,
  BLOCK_TYPES,
  MARK_TYPES,
  ALIGN_TYPES,
} from "@/lib/editor/constants";
import { isAlignType, isListType, isAlignElement } from "@/lib/editor/utils";

export const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: "type" | "align" = "type",
) => {
  const { selection } = editor;

  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === "align" && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    }),
  );

  return !!match;
};

export const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleBlock = (
  editor: CustomEditor,
  format: CustomElementFormat,
) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? "align" : "type",
  );

  const isList = isListType(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });

  const newProperties: Partial<SlateElement> = isAlignType(format)
    ? { align: isActive ? undefined : format }
    : { type: isActive ? "paragraph" : isList ? "list-item" : format };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const insertImage = (
  editor: CustomEditor,
  url: string,
  caption: string,
) => {
  const text = { text: "" };
  const image: ImageElement = { type: "image", url, caption, children: [text] };
  Transforms.insertNodes(editor, image);
  const paragraph: ParagraphElement = {
    type: "paragraph",
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, paragraph);
};
