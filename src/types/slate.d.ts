import type { Descendant, BaseEditor, BaseRange, Range, Element } from "slate";
import type { ReactEditor, RenderElementProps } from "slate-react";
import type { HistoryEditor } from "slate-history";

export type BulletedListElement = {
  type: "bulleted-list";
  align?: string;
  children: Descendant[];
};

export type NumberedListElement = {
  type: "numbered-list";
  align?: string;
  children: Descendant[];
};

export type ListItemElement = {
  type: "list-item";
  children: Descendant[];
};

export type ParagraphElement = {
  type: "paragraph";
  align?: string;
  children: Descendant[];
};

export type ImageElement = {
  type: "image";
  url: string;
  caption: string;
  children: EmptyText[];
};

export type CustomElementWithAlign =
  | HeadingTwoElement
  | HeadingThreeElement
  | BulletedListElement
  | NumberedListElement
  | ParagraphElement;

export type CustomElement =
  | HeadingTwoElement
  | HeadingThreeElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | ImageElement
  | ParagraphElement;

export type CustomElementType = CustomElement["type"];

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  text: string;
};

export type CustomTextKey = keyof Omit<CustomText, "text">;

export type EmptyText = {
  text: string;
};

export type RenderElementPropsFor<T> = RenderElementProps & {
  element: T;
};

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
  };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}
