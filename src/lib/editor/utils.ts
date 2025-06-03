import type { Descendant, Text } from "slate";
import type { CustomElement, CustomElementWithAlign } from "@/types/slate";
import {
  type AlignType,
  type ListType,
  type CustomElementFormat,
  TEXT_ALIGN_TYPES,
  LIST_TYPES,
} from "@/lib/editor/constants";
import isUrl from "is-url";
import imageExtensions from "image-extensions";

export const isAlignType = (
  format: CustomElementFormat,
): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

export const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};

export const isAlignElement = (
  element: CustomElement,
): element is CustomElementWithAlign => {
  return "align" in element;
};

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;

  const ext = new URL(url).pathname.split(".").pop();

  if (!ext) return false;
  return imageExtensions.includes(ext);
};

const isText = (node: unknown): node is Text => {
  return (
    typeof node === "object" &&
    node !== null &&
    "text" in node &&
    typeof (node as { text: unknown }).text === "string"
  );
};

const isDescendant = (node: unknown): node is Descendant => {
  return (
    typeof node === "object" &&
    node !== null &&
    "children" in node &&
    Array.isArray((node as { children: unknown }).children) &&
    (node as { children: unknown[] }).children.every(
      (child: unknown) => isText(child) || isDescendant(child),
    )
  );
};

export const isDescendantArray = (value: unknown): value is Descendant[] => {
  return (
    Array.isArray(value) && value.every((node: unknown) => isDescendant(node))
  );
};
